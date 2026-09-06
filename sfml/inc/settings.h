#pragma once
#include <stdint.h>

const char WINDOW_CAPTION[] = "Flappy Bird";
const uint32_t WINDOW_WIDTH = 910;
const uint32_t WINDOW_HEIGHT = 512;
const uint32_t WINDOW_FPS = 30;

const float SCROLL_SPEED = 2.0f;

const float BIRD_START_X = 100.f;
const float BIRD_START_Y = 300.f;

const float BIRD_ACCELERATION = 0.25f;
const float BIRD_MAX_VELOCITY = 8.f;
const float BIRD_FLAP_VELOCITY = -7.f;
const float BIRD_ANGULAR_SPEED = 7.f;

const char RESOURCE_FONT_PATH[] = "assets/font/04B_19__.TTF";

const char RESOURCE_BACGROUND_DAY_PATH[] = "assets/sprites/background-day.png";
const char RESOURCE_BASE_PATH[] = "assets/sprites/base.png";
const float baseToBackgroundHeightRatio = 0.22f;

const char RESOURCE_BLUEBIRD_DOWNFLAP_PATH[] = "assets/sprites/bluebird-downflap.png";
const char RESOURCE_BLUEBIRD_MIDFLAP_PATH[]  = "assets/sprites/bluebird-midflap.png";
const char RESOURCE_BLUEBIRD_UPFLAP_PATH[]   = "assets/sprites/bluebird-upflap.png";
const float RESOURCE_BIRD_HEIGHT = 24.f;

const uint32_t RESOURCE_PIPE_WIDTH = 52;
const uint32_t RESOURCE_PIPE_HEIGHT = 320;
const char RESOURCE_PIPE_GREEN_PATH[] = "assets/sprites/pipe-green.png";

const int PIPE_SPAWNER_TIMEOUT = 180;
const int PIPE_SPAWNER_POSY_RAND_RANGE_MIN = -RESOURCE_PIPE_HEIGHT + 25;
const int PIPE_SPAWNER_POSY_RAND_RANGE_MAX = -RESOURCE_PIPE_HEIGHT + 275;
const int PIPE_SPAWNER_POSY_GAP = 150;
const int PIPE_SPAWNER_POS_X = 950;

const char RESOURCE_MESSAGE_PATH[] = "assets/sprites/message.png";
const char RESOURCE_GAMEOVER_PATH[] = "assets/sprites/gameover.png";