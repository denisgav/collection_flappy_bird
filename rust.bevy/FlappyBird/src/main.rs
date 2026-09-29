mod constants;
mod fbrect;
mod background;
mod base;
mod player;
mod pipe;
mod pipe_spawner;

use std::time::Duration;
use rand::{rngs::ThreadRng, rng, Rng};
use bevy::{prelude::*, window::PrimaryWindow};

use constants::*;
use background::BackgroundPlugin;
use base::{BasePlugin, BaseState};
use player::{PlayerPlugin, PlayerState};
use pipe::{get_pipe_rect};
use pipe_spawner::{PipeSpawnerPlugin, PipeSpawnerState};

use crate::pipe::Pipe;

#[derive(Resource, Default)]
pub struct GameState {
    pub started: bool,
    pub died: bool,
    pub score: u32,
    pub high_score: u32,
    pub restart_cooldown: bool,
}

#[derive(Component)]
struct MessageScreenUI;

#[derive(Component)]
struct GameOverScreenUI;

#[derive(Component)]
struct ScoreUI;

#[derive(Component)]
struct ScoreText;

#[derive(Component)]
struct GameOverScoreText;

#[derive(Component)]
struct GameOverBestText;

#[derive(Component)]
struct RestartButton;


fn main() {
    println!("Hello, world!");
    let mut app:App = App::new();
    app.add_plugins(
        DefaultPlugins
            .set(WindowPlugin {
                primary_window: Some(Window {
                    title: String::from(WINDOW_CAPTION),
                    position: WindowPosition::Centered(MonitorSelection::Primary),
                    resolution: Vec2::new(WINDOW_WIDTH as f32, WINDOW_HEIGHT as f32).into(),
                    resizable:false,
                    ..Default::default()
                }),
                ..Default::default()
            })
    );
    app.insert_resource(GameState::default());
    app.add_systems(Startup,
         (
            setup_camera,
            spawn_message_screen,
            spawn_score_ui,
            spawn_game_over_ui
        )
    );
    app.add_systems(Update, 
        (
            handle_input,
            score_system,
            pipe_collision_system,
            base_collision_system,
            restart_button_system,
            update_ui_visibility,
            update_score_ui,
            update_game_over_ui,
        )
    );
    app.add_plugins(BackgroundPlugin);
    app.add_plugins(BasePlugin);
    app.add_plugins(PlayerPlugin);
    app.add_plugins(PipeSpawnerPlugin);
    app.run();
}

fn setup_camera(mut commands: Commands) {
    commands.spawn((
        Camera2d,
        Transform::from_xyz(
            0.0,
            0.0,
            0.0,
        ),
    ));
}

fn handle_input(
    keyboard: Res<ButtonInput<KeyCode>>,
    mouse: Res<ButtonInput<MouseButton>>,
    mut game_state: ResMut<GameState>,
    mut base_state: ResMut<BaseState>,
    mut pipe_spawner_state: ResMut<PipeSpawnerState>,
    mut player_state: ResMut<PlayerState>,
) {
    if game_state.restart_cooldown {
        game_state.restart_cooldown = false;
        return;
    }

    if keyboard.just_pressed(KeyCode::Space)
        || mouse.just_pressed(MouseButton::Left)
    {
        on_flap_action(
            game_state.as_mut(),
            base_state.as_mut(),
            pipe_spawner_state.as_mut(),
            player_state.as_mut(),
        );
    }
}

fn spawn_message_screen(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    commands.spawn((
        Node {
            width: Val::Percent(100.0),
            height: Val::Percent(100.0),
            justify_content: JustifyContent::Center,
            align_items: AlignItems::Center,
            ..default()
        },
        MessageScreenUI,
    ))
    .with_children(|parent| {
        parent.spawn(
            ImageNode::new(
                asset_server.load(
                    RESOURCE_MESSAGE_PATH
                )
            )
        );
    });
}

fn spawn_score_ui(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    commands.spawn((
        Text::new("0"),
        TextFont {
            font: asset_server.load(RESOURCE_FONT_PATH),
            font_size: 45.0,
            ..default()
        },
        TextColor(Color::WHITE),
        Node {
            position_type: PositionType::Absolute,
            left: Val::Px(20.0),
            top: Val::Px(20.0),
            ..default()
        },
        Visibility::Hidden,
        ScoreUI,
        ScoreText,
    ));
}

fn spawn_game_over_ui(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    commands.spawn((
        Node {
            align_items: AlignItems::Center,
            justify_content: JustifyContent::Center,
            flex_direction: FlexDirection::Column,
            width: Val::Percent(100.0),
            height: Val::Percent(100.0),
            ..default()
        },
        Visibility::Hidden,
        GameOverScreenUI,
    ))
    .with_children(|parent| {

        parent.spawn(
            ImageNode::new(
                asset_server.load(
                    RESOURCE_GAMEOVER_PATH
                )
            )
        );

        parent.spawn((
            Text::new("Score: 0"),
            TextFont {
                font: asset_server.load(RESOURCE_FONT_PATH),
                font_size: 45.0,
                ..default()
            },
            TextColor(Color::WHITE),
            GameOverScoreText,
        ));

        parent.spawn((
            Text::new("Best: 0"),
            TextFont {
                font: asset_server.load(RESOURCE_FONT_PATH),
                font_size: 45.0,
                ..default()
            },
            TextColor(Color::WHITE),
            GameOverBestText,
        ));

        parent.spawn((
            Button,
            Node {
                width: Val::Px(180.0),
                height: Val::Px(60.0),
                justify_content: JustifyContent::Center,
                align_items: AlignItems::Center,
                margin: UiRect::all(Val::Px(10.0)),
                ..default()
            },
            BackgroundColor(Color::srgb(0.2, 0.2, 0.2)),
            RestartButton,
        ))
        .with_child((
            Text::new("RST"),
            TextFont {
                font: asset_server.load(RESOURCE_FONT_PATH),
                font_size: 32.0,
                ..default()
            },
            TextColor(Color::WHITE),
        ));
    });
}

fn restart_button_system(
    mut commands: Commands,
    mut interaction_query: Query<
        &Interaction,
        (
            Changed<Interaction>,
            With<RestartButton>,
        ),
    >,
    pipes: Query<Entity, With<Pipe>>,
    mut game_state: ResMut<GameState>,
    mut base_state: ResMut<BaseState>,
    mut pipe_spawner_state: ResMut<PipeSpawnerState>,
    mut player_state: ResMut<PlayerState>,
) {
    for interaction in &mut interaction_query {

        if *interaction == Interaction::Pressed {
            for entity in &pipes {
                commands.entity(entity).despawn();
            }

            on_restart(
                game_state.as_mut(),
                base_state.as_mut(),
                pipe_spawner_state.as_mut(),
                player_state.as_mut()
            );
        }
    }
}

fn update_ui_visibility(
    game_state: Res<GameState>,
    mut vis: ParamSet<(
        Query<&mut Visibility, With<MessageScreenUI>>,
        Query<&mut Visibility, With<ScoreUI>>,
        Query<&mut Visibility, With<GameOverScreenUI>>,
    )>,
) {
    if let Ok(mut v) = vis.p0().single_mut() {
        *v = if !game_state.started && !game_state.died {
            Visibility::Visible
        } else {
            Visibility::Hidden
        };
    }

    if let Ok(mut v) = vis.p1().single_mut() {
        *v = if game_state.started && !game_state.died {
            Visibility::Visible
        } else {
            Visibility::Hidden
        };
    }

    if let Ok(mut v) = vis.p2().single_mut() {
        *v = if game_state.died {
            Visibility::Visible
        } else {
            Visibility::Hidden
        };
    }
}

fn update_score_ui(
    game_state: Res<GameState>,
    mut query: Query<&mut Text, With<ScoreText>>,
) {
    if let Ok(mut text) = query.single_mut() {
        text.0 = game_state.score.to_string();
    }
}

fn update_game_over_ui(
    game_state: Res<GameState>,
    mut texts: ParamSet<(
        Query<&mut Text, With<GameOverScoreText>>,
        Query<&mut Text, With<GameOverBestText>>,
    )>,
) {
    if let Ok(mut text) = texts.p0().single_mut() {
        text.0 = format!("Score: {}", game_state.score);
    }

    if let Ok(mut text) = texts.p1().single_mut() {
        text.0 = format!("Best: {}", game_state.high_score);
    }
}


fn score_system(
    mut game_state: ResMut<GameState>,
    mut query: Query<(
        &Transform,
        &mut Pipe,
    )>,
) {
    for (transform, mut pipe) in &mut query {

        if pipe.is_top {
            continue;
        }

        let left =
            transform.translation.x
            - RESOURCE_PIPE_WIDTH as f32 / 2.0;

        let right =
            transform.translation.x
            + RESOURCE_PIPE_WIDTH as f32 / 2.0;

        if BIRD_START_X as f32 > left {
            pipe.bird_enter = true;
        }

        if BIRD_START_X as f32 > right {
            pipe.bird_exit = true;
        }

        if pipe.bird_enter
            && pipe.bird_exit
            && !pipe.bird_passed
        {
            pipe.bird_passed = true;

            on_score(game_state.as_mut());
            
        }
    }
}

fn pipe_collision_system(
    pipes: Query<&Transform, With<Pipe>>,
    mut game_state: ResMut<GameState>,
    mut base_state: ResMut<BaseState>,
    mut pipe_spawner_state: ResMut<PipeSpawnerState>,
    mut player_state: ResMut<PlayerState>,
) {
    if !game_state.started || game_state.died {
        return;
    }

    let bird_r = player_state.get_rect();

    for transform in &pipes {
        let pipe_r = get_pipe_rect(
            &transform.translation.x,
            &transform.translation.y
        );

        if bird_r.intersects(&pipe_r) {
            println!("[App] PIPE HIT");
            on_game_over(
                game_state.as_mut(),
                base_state.as_mut(),
                pipe_spawner_state.as_mut(),
                player_state.as_mut()
            );
            return;
        }
    }
}

fn base_collision_system(
    mut game_state: ResMut<GameState>,
    mut base_state: ResMut<BaseState>,
    mut pipe_spawner_state: ResMut<PipeSpawnerState>,
    mut player_state: ResMut<PlayerState>,
) {
    if !game_state.started || game_state.died {
        return;
    }

    let bird_r = player_state.get_rect();
    let base_r = base_state.get_rect();

    if bird_r.intersects(&base_r) {
        println!("[App] Base HIT");
        on_game_over(
            game_state.as_mut(),
            base_state.as_mut(),
            pipe_spawner_state.as_mut(),
            player_state.as_mut()
        );
        return;
    }
}

fn on_flap_action(
    game_state: &mut GameState,
    base_state: &mut BaseState,
    pipe_spawner_state: &mut PipeSpawnerState,
    player_state: &mut PlayerState,
) {
    if !game_state.died {
        if !game_state.started {
            on_start(game_state, base_state, pipe_spawner_state, player_state);
        }

        on_flap(player_state);
    }
}

fn on_flap(
    player_state: &mut PlayerState,
) {
    println!("[App] Flap");
    player_state.on_flap();
}

fn on_start(
    game_state: &mut GameState,
    base_state: &mut BaseState,
    pipe_spawner_state: &mut PipeSpawnerState,
    player_state: &mut PlayerState,
) {
    println!("[App] Start");
    game_state.started = true;
    base_state.on_start();
    pipe_spawner_state.on_start();
    player_state.on_start();
}

fn on_restart(
    game_state: &mut GameState,
    base_state: &mut BaseState,
    pipe_spawner_state: &mut PipeSpawnerState,
    player_state: &mut PlayerState,
) {
    println!("[App] ReStart");

    game_state.score = 0;
    game_state.died = false;
    game_state.started = false;
    game_state.restart_cooldown = true;

    base_state.on_restart();
    pipe_spawner_state.on_restart();
    player_state.on_restart();
}

fn on_game_over(
    game_state: &mut GameState,
    base_state: &mut BaseState,
    pipe_spawner_state: &mut PipeSpawnerState,
    player_state: &mut PlayerState,
){
    println!("[App] Game over");
    game_state.died = true;
    game_state.started = false;

    base_state.on_game_over();
    player_state.on_game_over();
    pipe_spawner_state.on_game_over();
    
    if game_state.score > game_state.high_score {
        game_state.high_score = game_state.score;
    }
}

fn on_score(
    game_state: &mut GameState,
){
    println!("Score +1");
    game_state.score += 1;
}