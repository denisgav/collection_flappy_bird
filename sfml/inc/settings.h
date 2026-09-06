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

const char RESOURSE_BACGROUND_DAY_PATH[] = "assets/sprites/background-day.png";
const char RESOURSE_BASE_PATH[] = "assets/sprites/base.png";
const float baseToBackgroundHeightRatio = 0.22f;

const char RESOURSE_BLUEBIRD_DOWNFLAP_PATH[] = "assets/sprites/bluebird-downflap.png";
const char RESOURSE_BLUEBIRD_MIDFLAP_PATH[]  = "assets/sprites/bluebird-midflap.png";
const char RESOURSE_BLUEBIRD_UPFLAP_PATH[]   = "assets/sprites/bluebird-upflap.png";
const float RESOURCE_BIRD_HEIGHT = 24.f;



