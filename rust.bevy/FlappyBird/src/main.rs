mod constants;
mod background;
mod base;

use std::time::Duration;
use rand::{rngs::ThreadRng, rng, Rng};
use bevy::{prelude::*, window::PrimaryWindow};

use constants::*;
use background::BackgroundPlugin;

use base::{BasePlugin, BaseState};

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
    app.add_systems(Update, handle_input);
    app.add_plugins(BackgroundPlugin);
    app.add_plugins(BasePlugin);
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
) {
    if keyboard.just_pressed(KeyCode::Space)
        || mouse.just_pressed(MouseButton::Left)
    {
        on_flap_action(
            game_state.as_mut(),
            base_state.as_mut(),
        );
    }
}

fn on_flap_action(
    game_state: &mut GameState,
    base_state: &mut BaseState,
) {
    if !game_state.died {
        if !game_state.started {
            on_start(game_state, base_state);
        }

        on_flap(game_state, base_state);
    }
}

fn on_flap(
    game_state: &mut GameState,
    base_state: &mut BaseState,
) {
    println!("[App] Flap");
}

fn on_start(
    game_state: &mut GameState,
    base_state: &mut BaseState,
) {
    println!("[App] Start");
    game_state.started = true;
    base_state.on_start();
}