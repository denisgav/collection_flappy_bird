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

    # =========================================================
    def update(self):
        self.rect.x -= BASE_SCROLL_SPEED
        if self.rect.x < -RESOURSE_PIPE_WIDTH:
            self.kill()
