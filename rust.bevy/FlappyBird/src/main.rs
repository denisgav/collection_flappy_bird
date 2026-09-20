mod constants;
mod background;

use std::time::Duration;
use rand::{rngs::ThreadRng, rng, Rng};
use bevy::{prelude::*, window::PrimaryWindow};


use constants::*;
use background::BackgroundPlugin;

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
    app.add_plugins(BackgroundPlugin);

    app.insert_resource(Time::<Fixed>::from_duration(
        Duration::from_secs_f64(1.0 / WINDOW_FPS as f64),
    ));
    app.add_systems(FixedUpdate, update_game);

    app.run();
}

fn setup_camera(mut commands: Commands) {
    // commands.spawn(Camera2d);
    commands.spawn((
        Camera2d,
        Transform::from_xyz(
            WINDOW_WIDTH as f32 / 2.0,
            0.0,
            0.0,
        ),
    ));
}

fn update_game() {
    // Runs exactly 30 times per second
}