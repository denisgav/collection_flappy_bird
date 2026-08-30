#!/usr/bin/env python3
import pygame

from settings import *

class MessageScreen:
    # =========================================================
    def __init__(self):
        self.img =  pygame.image.load(RESOURSE_MESSAGE_PATH).convert_alpha()

    # =========================================================
    def draw(self, window):
        cur_screen_width, cur_screen_height = window.get_size()
        pos_x = (cur_screen_width - RESOURCE_MESSAGE_WIDTH) / 2
        pos_y = (cur_screen_height - RESOURCE_MESSAGE_HEIGHT) / 2
        window.blit(self.img, (pos_x, pos_y))