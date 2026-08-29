#!/usr/bin/env python3
import pygame

from settings import *

class Player(pygame.sprite.Sprite):
    # =========================================================
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)
        self.bird_images =  [
            pygame.image.load(RESOURSE_BLUEBIRD_DOWNFLAP_PATH),
            pygame.image.load(RESOURSE_BLUEBIRD_MIDFLAP_PATH),
            pygame.image.load(RESOURSE_BLUEBIRD_UPFLAP_PATH)
        ]
        self.image = self.bird_images[0]
        self.rect = self.image.get_rect()
        self.rect.center = BIRD_START_POS
        self.image_animation_index = 0
        self.is_started = False
        self.velocity = 0.0
        self.MAX_CENTER_Y_VAL = WINDOW_HEIGHT - RESOURCE_BIRD_HEIGHT
    
    # =========================================================
    def update(self, window):
        # Animate bird
        self.image_animation_index += 1
        if self.image_animation_index >= 20:
            self.image_animation_index = 0
        animation_index = self.image_animation_index // 5
        if(animation_index in [0, 1, 2]):
            self.image = self.bird_images[animation_index]
        else:
            self.image = self.bird_images[1]

        if self.is_started == True:
            self.move(window)

    # =========================================================
    def move(self, window):
        self.velocity += BIRD_ACCELERATION 
        if self.velocity >= BIRD_MAX_VELOCITY:
            self.velocity = BIRD_MAX_VELOCITY
        self.rect.centery += self.velocity

        if self.rect.centery <= 0:
            self.rect.centery = 0

        if self.rect.centery >= self.MAX_CENTER_Y_VAL:
            self.rect.centery = self.MAX_CENTER_Y_VAL


    # =========================================================
    def on_flap(self):
        self.velocity = BIRD_FLAP_VELOCITY

    # =========================================================
    def on_start(self):
        self.is_started = True
        self.velocity = 0.0

    # =========================================================
    def on_game_over(self):
        self.is_started = False
        self.velocity = 0.0
