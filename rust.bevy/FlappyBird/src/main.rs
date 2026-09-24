mod constants;
mod background;
mod base;

use std::time::Duration;
use rand::{rngs::ThreadRng, rng, Rng};
use bevy::{prelude::*, window::PrimaryWindow};

use constants::*;
use background::BackgroundPlugin;

use base::{BasePlugin, BaseState};

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
    mut base_state: ResMut<BaseState>,
) {
    if keyboard.just_pressed(KeyCode::Space)
        || mouse.just_pressed(MouseButton::Left)
    {
        on_flap(base_state);
    }
}

fn on_flap(mut base_state: ResMut<BaseState>){
    base_state.on_start();
}