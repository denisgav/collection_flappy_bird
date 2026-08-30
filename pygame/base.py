#!/usr/bin/env python3
import pygame

from settings import *

class Base:
    # =========================================================
    def __init__(self):
        self.img =  pygame.image.load(RESOURSE_BASE_PATH).convert_alpha()
        self.img_scaled = None
        self.BASE_TO_BACKGROUND_HEIGHT_RATIO = RESOURCE_BASE_HEIGHT / RESOURSE_BACGROUND_HEIGHT
        self.BASE_ASPECT_RATIO = RESOURCE_BASE_WIDTH / RESOURCE_BASE_HEIGHT
        self.SCREEN_WIDTH = None
        self.SCREEN_HEIGHT = None
        self.TILE_WIDTH  = None
        self.TILE_HEIGHT  = None
        self.offset_left = 0
        self.is_started = False
        
    # =========================================================
    def update(self, window):
        cur_screen_width, cur_screen_height = window.get_size()
        # If widdow size was changed, need to recalculate tile width and store new screen size
        if self.img_scaled == None or cur_screen_height != self.SCREEN_HEIGHT or cur_screen_width != self.SCREEN_WIDTH:
            self.SCREEN_WIDTH = cur_screen_width
            self.SCREEN_HEIGHT = cur_screen_height
            self.TILE_HEIGHT = int(cur_screen_height*self.BASE_TO_BACKGROUND_HEIGHT_RATIO)
            self.TILE_WIDTH = int(self.TILE_HEIGHT*self.BASE_ASPECT_RATIO)
            self.img_scaled = pygame.transform.scale(self.img, (self.TILE_WIDTH, self.TILE_HEIGHT))
            # print(f"Base TILE_HEIGHT = {self.TILE_HEIGHT} TILE_WIDTH = {self.TILE_WIDTH}")

        if self.is_started == True:
            self.offset_left += BASE_SCROLL_SPEED
            if self.offset_left >= self.TILE_WIDTH:
                self.offset_left = 0

    # =========================================================
    def draw(self, window):
        cur_screen_width, cur_screen_height = window.get_size()
        y_offset = cur_screen_height - self.TILE_HEIGHT
        # Repeat single image multiple times to fill all background space 
        for tile_idx in range(0, int((self.offset_left + cur_screen_width)/self.TILE_WIDTH) + 1):
            window.blit(self.img_scaled, (tile_idx*self.TILE_WIDTH - self.offset_left, y_offset))

    # =========================================================
    def on_start(self):
        self.offset_left = 0
        self.is_started = True

    # =========================================================
    def on_game_over(self):
        self.is_started = False