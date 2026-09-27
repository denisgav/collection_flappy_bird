use bevy::{prelude::*, sprite::Anchor};

use crate::constants::*;

pub struct PlayerPlugin;

impl Plugin for PlayerPlugin{
    fn build(&self, app: &mut App) {
        app.insert_resource(BirdAssets::default());
        app.insert_resource(PlayerState::default());
        app.add_systems(Startup, spawn_player);
        app.add_systems(Update, update_player);
    }
}

#[derive(Resource, Default)]
pub struct BirdAssets {
    pub downflap: Handle<Image>,
    pub midflap: Handle<Image>,
    pub upflap: Handle<Image>,
}

#[derive(Resource, Default)]
pub struct PlayerState{
    pub center_x: f32,
    pub center_y: f32,
    pub velocity: f32,
    pub animation_index: u32,
    pub started: bool,
}

#[derive(Component)]
pub struct PlayerTile;

pub fn spawn_player(
    mut player_state: ResMut<PlayerState>,
    mut bird_assets: ResMut<BirdAssets>,
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    bird_assets.downflap =
        asset_server.load(RESOURCE_BLUEBIRD_DOWNFLAP_PATH);

    bird_assets.midflap =
        asset_server.load(RESOURCE_BLUEBIRD_MIDFLAP_PATH);

    bird_assets.upflap =
        asset_server.load(RESOURCE_BLUEBIRD_UPFLAP_PATH);

    player_state.center_x = BIRD_START_X;
    player_state.center_y = BIRD_START_Y;
    player_state.velocity = 0.0;
    player_state.animation_index = 0;
    player_state.started = false;

    commands.spawn((
        Sprite {
            image: bird_assets.downflap.clone(),
            custom_size: Some(Vec2::new(
                RESOURCE_BIRD_WIDTH as f32,
                RESOURCE_BIRD_HEIGHT as f32,
            )),
            ..default()
        },
        Transform::from_xyz(
            BIRD_START_X,
            BIRD_START_Y,
            0.0,
        ),
        PlayerTile,
    ));
}

pub fn update_player(
    time: Res<Time>,
    mut player_state: ResMut<PlayerState>,
    bird_assets: ResMut<BirdAssets>,
    mut query: Query<
        (
            &mut Transform,
            &mut Sprite
        ),
        With<PlayerTile>
     >,
) {
    //
    // Animation
    //
    player_state.animation_index += 1;

    if player_state.animation_index >= 20 {
        player_state.animation_index = 0;
    }

    //
    // Physics
    //
    if player_state.started {

        player_state.velocity -=
            BIRD_ACCELERATION * time.delta_secs();

        if player_state.velocity > BIRD_MAX_VELOCITY {
            player_state.velocity =
                BIRD_MAX_VELOCITY;
        }

        player_state.center_y += 
            player_state.velocity * time.delta_secs();

        let min_y =
            -(WINDOW_HEIGHT as f32) / 2.0
            + RESOURCE_BIRD_HEIGHT as f32 / 2.0;

        let max_y =
            (WINDOW_HEIGHT as f32) / 2.0
            - RESOURCE_BIRD_HEIGHT as f32 / 2.0;

        player_state.center_y =
            player_state.center_y.clamp(min_y, max_y);

    }

    for (mut transform, mut sprite) in &mut query {

        //
        // Image
        //
        let frame = player_state.animation_index / 5;
        sprite.image = match frame {
            0 => bird_assets.downflap.clone(),
            1 => bird_assets.midflap.clone(),
            2 => bird_assets.upflap.clone(),
            _ => bird_assets.midflap.clone(),
        };

        //
        // Position
        //
        transform.translation.x =
            player_state.center_x;

        transform.translation.y =
            player_state.center_y;

        //
        // Rotation
        //
        let angle_deg =
            player_state.velocity * BIRD_ANGULAR_SPEED;

        transform.rotation =
            Quat::from_rotation_z(
                angle_deg.to_radians()
            );
    }
}

impl PlayerState {
    pub fn on_flap(&mut self) {
        self.velocity = BIRD_FLAP_VELOCITY;
    }

    pub fn on_start(&mut self) {
        self.started = true;
        self.velocity = 0.0;
    }

    pub fn on_game_over(&mut self) {
        self.started = false;
        self.velocity = 0.0;
    }

    pub fn on_restart(&mut self) {
        self.center_x = BIRD_START_X;
        self.center_y = BIRD_START_Y;

        self.velocity = 0.0;
        self.started = false;
        self.animation_index = 0;
    }
}