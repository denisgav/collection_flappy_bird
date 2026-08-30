#!/usr/bin/env python3
import pygame

from settings import *

class Pipe(pygame.sprite.Sprite):
    # =========================================================
    def __init__(self, x, y, image, is_top:bool = False):
        pygame.sprite.Sprite.__init__(self)
        # print(f"Pipe created!!!. x={x}, y={y}")
        pygame.sprite.Sprite.__init__(self)
        self.image = image
        self.rect = self.image.get_rect()
        self.rect.x, self.rect.y = x, y
        # print(f"Pipe rect = {self.rect}")
        self.is_top = is_top

        # Score system
        self.bird_enter = False
        self.bird_exit = False
        self.bird_passed = False
        self.score_listener = None

    # =========================================================
    def update(self):
        self.rect.x -= BASE_SCROLL_SPEED
        if self.rect.x < -RESOURSE_PIPE_WIDTH:
            self.kill()
        if self.score_listener != None and self.is_top == False:
            if BIRD_START_POS[0] > self.rect.topleft[0] and not self.bird_passed:
                self.bird_enter = True
            if BIRD_START_POS[0] > self.rect.topright[0] and not self.bird_passed:
                self.bird_exit = True
            if self.bird_enter and self.bird_exit and not self.bird_passed:
                self.bird_passed = True
                self.score_listener()
