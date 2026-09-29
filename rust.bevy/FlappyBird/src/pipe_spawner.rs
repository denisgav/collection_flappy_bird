use bevy::prelude::*;
use rand::Rng;

use crate::constants::*;
use crate::pipe::*;
pub struct PipeSpawnerPlugin;

impl Plugin for PipeSpawnerPlugin {
    fn build(&self, app: &mut App) {
        app.insert_resource(PipeAssets::default());
        app.insert_resource(PipeSpawnerState::default());

        app.add_systems(Startup, load_pipe_assets);
        app.add_systems(Update, (
            spawn_pipe_system,
            update_pipes_system,
        ));
    }
}

#[derive(Resource, Default)]
pub struct PipeAssets {
    pub pipe_bottom: Handle<Image>,
}

#[derive(Resource, Default)]
pub struct PipeSpawnerState {
    pub started: bool,
    pub pipe_timer: u32,
}

fn load_pipe_assets(
    mut assets: ResMut<PipeAssets>,
    asset_server: Res<AssetServer>,
) {
    assets.pipe_bottom =
        asset_server.load(RESOURCE_PIPE_GREEN_PATH);
}

fn spawn_pipe_pair(
    commands: &mut Commands,
    assets: &PipeAssets,
) {
    let top_limit =
        WINDOW_HEIGHT as f32 / 2.0
        - PIPE_VISIBLE_TOP_MARGIN;

    let bottom_limit =
        -(WINDOW_HEIGHT as f32) / 2.0
        + PIPE_VISIBLE_BOTTOM_MARGIN;

    let top_pipe_bottom_size_y_offset =
        rand::rng().random_range(
            bottom_limit..top_limit
        );
    
    let y_top = top_pipe_bottom_size_y_offset 
        + RESOURCE_PIPE_HEIGHT as f32 / 2.0; 

    let y_bottom =
        y_top
        - PIPE_SPAWNER_POSY_GAP as f32
        - RESOURCE_PIPE_HEIGHT as f32;

    let x =
        PIPE_SPAWNER_POS_X;

    //
    // top pipe
    //
    commands.spawn((
        Sprite {
            image: assets.pipe_bottom.clone(),
            custom_size: Some(Vec2::new(
                RESOURCE_PIPE_WIDTH as f32,
                RESOURCE_PIPE_HEIGHT as f32,
            )),
            ..default()
        },
        Transform {
            translation: Vec3::new(
                x,
                y_top,
                -9.0,
            ),
            rotation: Quat::from_rotation_z(
                std::f32::consts::PI,
            ),
            ..default()
        },
        Pipe {
            is_top: true,
            bird_enter: false,
            bird_exit: false,
            bird_passed: false,
        },
        PipeTop,
    ));

    //
    // bottom pipe
    //
    commands.spawn((
        Sprite {
            image: assets.pipe_bottom.clone(),
            custom_size: Some(Vec2::new(
                RESOURCE_PIPE_WIDTH as f32,
                RESOURCE_PIPE_HEIGHT as f32,
            )),
            ..default()
        },
        Transform::from_xyz(
            x,
            y_bottom,
            -9.0,
        ),
        Pipe {
            is_top: false,
            bird_enter: false,
            bird_exit: false,
            bird_passed: false,
        },
        PipeBottom,
    ));
}

fn spawn_pipe_system(
    mut commands: Commands,
    mut state: ResMut<PipeSpawnerState>,
    assets: Res<PipeAssets>,
) {
    if !state.started {
        return;
    }

    if state.pipe_timer == 0 {
        spawn_pipe_pair(
            &mut commands,
            &assets,
        );

        state.pipe_timer =
            PIPE_SPAWNER_TIMEOUT;
    }

    state.pipe_timer -= 1;
}

fn update_pipes_system(
    mut commands: Commands,
    mut state: ResMut<PipeSpawnerState>,
    time: Res<Time>,
    mut query: Query<
        (Entity, &mut Transform, &mut Pipe)
    >,
) {
    if !state.started {
        return;
    }
    
    for (entity, mut transform, _) in &mut query {

        transform.translation.x -=
            BASE_SCROLL_SPEED
            * time.delta_secs();

        if transform.translation.x <
            -(WINDOW_WIDTH as f32)
        {
            commands.entity(entity).despawn();
        }
    }
}

impl PipeSpawnerState {
    pub fn on_start(&mut self) {
        self.started = true;
    }

    pub fn on_game_over(&mut self) {
        self.started = false;
    }

    pub fn on_restart(&mut self) {
        self.started = false;
        self.pipe_timer = 0;
    }
}