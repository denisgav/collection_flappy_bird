pub const WINDOW_CAPTION: &str = "Flappy Bird";
pub const WINDOW_WIDTH: u32 = 910;
pub const WINDOW_HEIGHT: u32 = 512;

// Background
pub const RESOURCE_BACKGROUND_DAY_PATH: &str =
    "sprites/background-day.png";

pub const RESOURCE_BACKGROUND_WIDTH: u32 = 288;
pub const RESOURCE_BACKGROUND_HEIGHT: u32 = 512;

// Base
pub const RESOURCE_BASE_PATH: &str =
    "sprites/base.png";

pub const RESOURCE_BASE_WIDTH: u32 = 336;
pub const RESOURCE_BASE_HEIGHT: u32 = 112;

pub const BASE_TO_BACKGROUND_HEIGHT_RATIO: f32 = 0.22;
pub const BASE_SCROLL_SPEED: f32 = 120.0; // pixels per second

// Bird
pub const BIRD_START_X: f32 = 0.0;
pub const BIRD_START_Y: f32 = 0.0;

pub const BIRD_ACCELERATION: f32 = 900.0; // Num of pixels per second
pub const BIRD_MAX_VELOCITY: f32 = 400.0;
pub const BIRD_FLAP_VELOCITY: f32 = 300.0;
pub const BIRD_ANGULAR_SPEED: f32 = 0.12;

pub const RESOURCE_BIRD_WIDTH: u32 = 34;
pub const RESOURCE_BIRD_HEIGHT: u32 = 24;

pub const RESOURCE_BLUEBIRD_DOWNFLAP_PATH: &str =
    "sprites/bluebird-downflap.png";
pub const RESOURCE_BLUEBIRD_MIDFLAP_PATH: &str =
    "sprites/bluebird-midflap.png";
pub const RESOURCE_BLUEBIRD_UPFLAP_PATH: &str =
    "sprites/bluebird-upflap.png";

// Pipes
pub const RESOURCE_PIPE_WIDTH: u32 = 52;
pub const RESOURCE_PIPE_HEIGHT: u32 = 320;

pub const RESOURCE_PIPE_GREEN_PATH: &str =
    "sprites/pipe-green.png";

pub const PIPE_SPAWNER_TIMEOUT: u32 = 180;

pub const PIPE_VISIBLE_TOP_MARGIN: f32 = 50.0;
pub const PIPE_VISIBLE_BOTTOM_MARGIN: f32 = 
    RESOURCE_BASE_HEIGHT as f32 + 200.0;

pub const PIPE_SPAWNER_POSY_GAP: i32 = 150;
pub const PIPE_SPAWNER_POS_X: f32 = 950.0;

// UI
pub const RESOURCE_MESSAGE_PATH: &str =
    "sprites/message.png";

pub const RESOURCE_GAMEOVER_PATH: &str =
    "sprites/gameover.png";

pub const RESOURCE_FONT_PATH: &str =
    "font/04B_19__.TTF";
