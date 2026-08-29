#!/usr/bin/env python3
import os
from pathlib import Path

#Game variables
WINDOW_CAPTION = "Flappy Bird"
WINDOW_WIDTH = 910
WINDOW_HEIGHT = 512
WINDOW_FPS = 30 

BIRD_START_POS = (100, 250)
BIRD_FLAP_VELOCITY = -7
BIRD_ACCELERATION = 0.5
BIRD_MAX_VELOCITY = 7
BASE_SCROLL_SPEED = 1

current_file_path = Path(__file__).resolve()
current_dir = current_file_path.parent

RESOURSE_SPRITES_PATH = os.path.join(current_dir, "assets", "sprites")

RESOURSE_BACGROUND_WIDTH = 288
RESOURSE_BACGROUND_HEIGHT = 512
RESOURSE_BACGROUND_DAY_PATH     = os.path.join(RESOURSE_SPRITES_PATH, "background-day.png")

RESOURCE_BIRD_WIDTH = 34
RESOURCE_BIRD_HEIGHT = 24
RESOURSE_BLUEBIRD_DOWNFLAP_PATH = os.path.join(RESOURSE_SPRITES_PATH, "bluebird-downflap.png")
RESOURSE_BLUEBIRD_MIDFLAP_PATH  = os.path.join(RESOURSE_SPRITES_PATH, "bluebird-midflap.png")
RESOURSE_BLUEBIRD_UPFLAP_PATH   = os.path.join(RESOURSE_SPRITES_PATH, "bluebird-upflap.png")

RESOURCE_BASE_WIDTH = 336
RESOURCE_BASE_HEIGHT = 112
RESOURSE_BASE_PATH = os.path.join(RESOURSE_SPRITES_PATH, "base.png")