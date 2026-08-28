#!/usr/bin/env python3
import os
from pathlib import Path

#Game variables
WINDOW_CAPTION = "Flappy Bird"
WINDOW_WIDTH = 288
WINDOW_HEIGHT = 512
WINDOW_FPS = 30 

current_file_path = Path(__file__).resolve()
current_dir = current_file_path.parent

RESOURSE_SPRITES_PATH = os.path.join(current_dir, "assets", "sprites")

RESOURSE_BACGROUND_DAY_PATH     = os.path.join(RESOURSE_SPRITES_PATH, "background-day.png")
RESOURSE_BLUEBIRD_DOWNFLAP_PATH = os.path.join(RESOURSE_SPRITES_PATH, "bluebird-downflap.png")
RESOURSE_BLUEBIRD_MIDFLAP_PATH  = os.path.join(RESOURSE_SPRITES_PATH, "bluebird-midflap.png")
RESOURSE_BLUEBIRD_UPFLAP_PATH   = os.path.join(RESOURSE_SPRITES_PATH, "bluebird-upflap.png")