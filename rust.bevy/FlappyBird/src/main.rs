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
}

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
    app.add_systems(Startup, setup_camera);
    app.add_systems(Update, 
        (
            handle_input,
            score_system,
            pipe_collision_system,
            base_collision_system,
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

    game_state.died = false;
    game_state.started = false;

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
    
    // gameOverScreen.setScore(score, high_score);
    // gameOverScreen.onShow();
    
    if(game_state.score > game_state.high_score) {
        game_state.high_score = game_state.score;
    }
}

fn on_score(
    game_state: &mut GameState,
){
    println!("Score +1");
    game_state.score += 1;
}