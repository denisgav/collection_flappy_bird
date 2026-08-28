#!/usr/bin/env python3
import pygame

from settings import *

class Background(pygame.Rect):
    # =========================================================
    def __init__(self):
        pygame.Rect.__init__(self, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
        self.img =  pygame.image.load(RESOURSE_BACGROUND_PATH)

    # =========================================================
    def draw(self, window):
        window.blit(self.img, self)