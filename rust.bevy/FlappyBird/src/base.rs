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
    pub tile_width: f32,
    pub tile_height: f32,
    pub tile_count: i32,
    pub start_x: f32,
    pub start_y: f32,
}

#[derive(Component)]
pub struct BaseTile;

fn spawn_base(
    mut base: ResMut<BaseState>,
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

    base.tile_height = window_height * BASE_TO_BACKGROUND_HEIGHT_RATIO;
    base.tile_width = base.tile_height * aspect_ratio;
    base.tile_count = (window_width / base.tile_width).ceil() as i32 + 1;

    base.start_x = -(window_width /2.0);
    base.start_y = -(window_height /2.0) + base.tile_height;

    for i in 0.. base.tile_count {
        commands.spawn((
            Sprite {
                image: texture.clone(),
                anchor: Anchor::TopLeft,
                custom_size: Some(Vec2::new(
                    base.tile_width,
                    base.tile_height,
                )),
                ..default()
            },
            Transform::from_xyz(
                base.start_x + (i as f32) * base.tile_width,
                base.start_y,
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

    let speed = BASE_SCROLL_SPEED * time.delta_secs();
    base.offset_left -= speed;

    for  (idx, mut transform) in query.iter_mut().enumerate() {
        transform.translation.x = base.start_x + (idx as f32) * base.tile_width + base.offset_left;
    }

    if base.offset_left < -base.tile_width {
        base.offset_left = 0.0;
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