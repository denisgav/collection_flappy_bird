use bevy::{prelude::*, sprite::Anchor};

use crate::constants::*;

pub struct BasePlugin;

impl Plugin for BasePlugin {
    fn build(&self, app: &mut App) {
        app.insert_resource(BaseState::default());
        app.add_systems(Startup, spawn_base);
        app.add_systems(Update, update_base);
    }
}

#[derive(Resource, Default)]
pub struct BaseState {
    pub started: bool,
    pub offset_left: f32,
}

#[derive(Component)]
pub struct BaseTile;

fn spawn_base(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    let texture: Handle<Image> = 
        asset_server.load(RESOURCE_BASE_PATH);

    // Original base.png dimensions
    let image_width = RESOURCE_BASE_WIDTH as f32;
    let image_height = RESOURCE_BASE_HEIGHT as f32;

    let window_width = WINDOW_WIDTH as f32;
    let window_height = WINDOW_HEIGHT as f32;

    let aspect_ratio = image_width / image_height;

    let tile_height = window_height * BASE_TO_BACKGROUND_HEIGHT_RATIO;
    let tile_width = tile_height * aspect_ratio;
    let tile_count = (window_width / tile_width).ceil() as i32 + 1;

    let start_x = -(window_width /2.0);
    let start_y = -(window_height /2.0) + tile_height;

    for i in 0..tile_count {
        commands.spawn((
            Sprite {
                image: texture.clone(),
                anchor: Anchor::TopLeft,
                custom_size: Some(Vec2::new(
                    tile_width,
                    tile_height,
                )),
                ..default()
            },
            Transform::from_xyz(
                start_x + (i as f32) * tile_width,
                start_y,
                -9.0,
            ),
            BaseTile,
        ));
    }
}

fn update_base(
    mut base: ResMut<BaseState>,
    mut query: Query<&mut Transform, With<BaseTile>>,
    time: Res<Time>,
) {
    if !base.started {
        return;
    }

    let speed = BASE_SCROLL_SPEED * 60.0;

    for mut transform in &mut query {
        transform.translation.x -=
            speed * time.delta_secs();
    }

    let image_width = 336.0;
    let image_height = 112.0;

    let tile_height =
        WINDOW_HEIGHT as f32 * BASE_TO_BACKGROUND_HEIGHT_RATIO;

    let tile_width =
        tile_height * (image_width / image_height);

    let right_limit =
        WINDOW_WIDTH as f32 + tile_width / 2.0;

    for mut transform in &mut query {
        if transform.translation.x < -tile_width / 2.0 {
            transform.translation.x +=
                right_limit + tile_width;
        }
    }
}

impl BaseState {
    pub fn on_start(&mut self) {
        self.offset_left = 0.0;
        self.started = true;
    }

    pub fn on_restart(&mut self) {
        self.offset_left = 0.0;
        self.started = false;
    }

    pub fn on_game_over(&mut self) {
        self.started = false;
    }
}