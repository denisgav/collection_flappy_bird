// Game variables
export const CANVAS_WIDTH = 910;
export const CANVAS_HEIGHT = 512;
export const GAME_FPS = 30;
export const FRAME_TIME = 1000 / GAME_FPS; // 33.33 ms

export const BIRD_START_POS = {
    x: 200,
    y: 300
};

export const BIRD_FLAP_VELOCITY = -7;
export const BIRD_ACCELERATION = 0.5;
export const BIRD_ANGULAR_SPEED = 4;
export const BIRD_MAX_VELOCITY = 18;

export const BASE_SCROLL_SPEED = 4;

// Resource paths
export const RESOURCE_SPRITES_PATH = "assets/sprites";

export const RESOURCE_BACKGROUND_WIDTH = 288;
export const RESOURCE_BACKGROUND_HEIGHT = 512;
export const RESOURCE_BACKGROUND_WIDTH_HEIGHT_RATIO =
            RESOURCE_BACKGROUND_WIDTH / RESOURCE_BACKGROUND_HEIGHT;
export const RESOURCE_BACKGROUND_DAY_PATH =
    `${RESOURCE_SPRITES_PATH}/background-day.png`;

export const RESOURCE_BIRD_WIDTH = 34;
export const RESOURCE_BIRD_HEIGHT = 24;

export const RESOURCE_BLUEBIRD_DOWNFLAP_PATH =
    `${RESOURCE_SPRITES_PATH}/bluebird-downflap.png`;

export const RESOURCE_BLUEBIRD_MIDFLAP_PATH =
    `${RESOURCE_SPRITES_PATH}/bluebird-midflap.png`;

export const RESOURCE_BLUEBIRD_UPFLAP_PATH =
    `${RESOURCE_SPRITES_PATH}/bluebird-upflap.png`;

export const RESOURCE_BASE_WIDTH = 336;
export const RESOURCE_BASE_HEIGHT = 112;
export const RESOURCE_BASE_PATH =
    `${RESOURCE_SPRITES_PATH}/base.png`;

export const BASE_TO_BACKGROUND_HEIGHT_RATIO =
    RESOURCE_BASE_HEIGHT / RESOURCE_BACKGROUND_HEIGHT;

export const BASE_ASPECT_RATIO =
    RESOURCE_BASE_WIDTH / RESOURCE_BASE_HEIGHT;

export const RESOURCE_PIPE_WIDTH = 52;
export const RESOURCE_PIPE_HEIGHT = 320;
export const RESOURCE_PIPE_GREEN_PATH =
    `${RESOURCE_SPRITES_PATH}/pipe-green.png`;

export const RESOURCE_FONT_PATH =
    "assets/font/04B_19__.TTF";

// Pipe spawner
export const PIPE_SPAWNER_POS_X = 950;
export const PIPE_SPAWNER_TIMEOUT = 60;

export const PIPE_SPAWNER_POSY_RAND_RANGE_MIN =
    -RESOURCE_PIPE_HEIGHT + 25;

export const PIPE_SPAWNER_POSY_RAND_RANGE_MAX =
    -RESOURCE_PIPE_HEIGHT + 275;

export const PIPE_SPAWNER_POSY_GAP = 120;

// Message sprite
export const RESOURCE_MESSAGE_WIDTH = 184;
export const RESOURCE_MESSAGE_HEIGHT = 267;
export const RESOURCE_MESSAGE_PATH =
    `${RESOURCE_SPRITES_PATH}/message.png`;

// Game over sprite
export const RESOURCE_GAMEOVER_WIDTH = 192;
export const RESOURCE_GAMEOVER_HEIGHT = 42;
export const RESOURCE_GAMEOVER_PATH =
    `${RESOURCE_SPRITES_PATH}/gameover.png`;