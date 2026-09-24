use crate::constants::*;

use bevy::{prelude::*, sprite::Anchor};

pub struct BackgroundPlugin;

impl Plugin for BackgroundPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, spawn_background);
    }
}

#[derive(Component)]
struct BackgroundTile;

fn spawn_background(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
    windows: Query<&Window>,
) {
    let texture: Handle<Image> =
        asset_server.load(RESOURCE_BACKGROUND_DAY_PATH);

    // Original image size.
    // Replace with your actual image size if known.
    let image_width = RESOURCE_BACKGROUND_WIDTH as f32;
    let image_height = RESOURCE_BACKGROUND_HEIGHT as f32;

    let window_width = WINDOW_WIDTH as f32;
    let window_height = WINDOW_HEIGHT as f32;

    let scale = window_height / image_height;

    let tile_width = image_width * scale;
    let tile_height = window_height;

    let tile_count =
        (window_width / tile_width).ceil() as i32 + 1;

    let start_x = -(WINDOW_WIDTH as f32 /2.0);
    let start_y = WINDOW_HEIGHT as f32 /2.0;

    for i in 0..tile_count {
        commands.spawn((
            Sprite {
                image: texture.clone(),
                anchor: Anchor::TopLeft,
                custom_size: Some(
                    Vec2::new(
                        tile_width, 
                        tile_height
                    )
                ),
                ..default()
            },
            Transform::from_xyz(
                start_x + (i as f32 * tile_width),
                start_y,
                -10.0
            ),
            BackgroundTile,
        ));
    }
}