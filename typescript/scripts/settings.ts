// Game variables
export const CANVAS_WIDTH: number = 910;
export const CANVAS_HEIGHT: number = 512;

export const GAME_FPS: number = 30;
export const FRAME_TIME: number = 1000 / GAME_FPS;

export const BIRD_START_POS = {
    x: 200,
    y: 300
};

export const BIRD_FLAP_VELOCITY: number = -7;
export const BIRD_ACCELERATION: number = 0.5;
export const BIRD_ANGULAR_SPEED: number = 4;
export const BIRD_MAX_VELOCITY: number = 18;

export const BASE_SCROLL_SPEED: number = 4;

// Resource paths
export const RESOURCE_SPRITES_PATH = "assets/sprites";

export const RESOURCE_BACKGROUND_WIDTH: number = 288;
export const RESOURCE_BACKGROUND_HEIGHT: number = 512;

export const RESOURCE_BACKGROUND_WIDTH_HEIGHT_RATIO: number =
    RESOURCE_BACKGROUND_WIDTH / RESOURCE_BACKGROUND_HEIGHT;

export const RESOURCE_BACKGROUND_DAY_PATH =
    `${RESOURCE_SPRITES_PATH}/background-day.png`;

export const RESOURCE_BIRD_WIDTH: number = 34;
export const RESOURCE_BIRD_HEIGHT: number = 24;

export const RESOURCE_BLUEBIRD_DOWNFLAP_PATH =
    `${RESOURCE_SPRITES_PATH}/bluebird-downflap.png`;

export const RESOURCE_BLUEBIRD_MIDFLAP_PATH =
    `${RESOURCE_SPRITES_PATH}/bluebird-midflap.png`;

export const RESOURCE_BLUEBIRD_UPFLAP_PATH =
    `${RESOURCE_SPRITES_PATH}/bluebird-upflap.png`;

export const RESOURCE_BASE_WIDTH: number = 336;
export const RESOURCE_BASE_HEIGHT: number = 112;

export const RESOURCE_BASE_PATH =
    `${RESOURCE_SPRITES_PATH}/base.png`;

export const BASE_TO_BACKGROUND_HEIGHT_RATIO: number =
    RESOURCE_BASE_HEIGHT / RESOURCE_BACKGROUND_HEIGHT;

export const BASE_ASPECT_RATIO: number =
    RESOURCE_BASE_WIDTH / RESOURCE_BASE_HEIGHT;

export const RESOURCE_PIPE_WIDTH: number = 52;
export const RESOURCE_PIPE_HEIGHT: number = 320;

export const RESOURCE_PIPE_GREEN_PATH =
    `${RESOURCE_SPRITES_PATH}/pipe-green.png`;

export const RESOURCE_FONT_PATH =
    "assets/font/04B_19__.TTF";

// Pipe spawner
export const PIPE_SPAWNER_POS_X: number = 950;
export const PIPE_SPAWNER_TIMEOUT: number = 60;

export const PIPE_SPAWNER_POSY_RAND_RANGE_MIN: number =
    -RESOURCE_PIPE_HEIGHT + 25;

export const PIPE_SPAWNER_POSY_RAND_RANGE_MAX: number =
    -RESOURCE_PIPE_HEIGHT + 275;

export const PIPE_SPAWNER_POSY_GAP: number = 120;

// Message sprite
export const RESOURCE_MESSAGE_WIDTH: number = 184;
export const RESOURCE_MESSAGE_HEIGHT: number = 267;

export const RESOURCE_MESSAGE_PATH =
    `${RESOURCE_SPRITES_PATH}/message.png`;

// Game over sprite
export const RESOURCE_GAMEOVER_WIDTH: number = 192;
export const RESOURCE_GAMEOVER_HEIGHT: number = 42;

export const RESOURCE_GAMEOVER_PATH =
    `${RESOURCE_SPRITES_PATH}/gameover.png`;