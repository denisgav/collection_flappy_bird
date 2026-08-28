#!/usr/bin/env python3
import pygame

from settings import *

class Background(pygame.Rect):
    # =========================================================
    def __init__(self):
        pygame.Rect.__init__(self, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
        self.img =  pygame.image.load(RESOURSE_BACGROUND_DAY_PATH)
        self.WIDTH_HEIGHT_RATIO = WINDOW_WIDTH/WINDOW_HEIGHT
        self.img_scaled = None
        self.SCREEN_WIDTH = None
        self.TILE_WIDTH  = None
        self.SCREEN_HEIGHT = None
        

    # =========================================================
    def draw(self, window):
        cur_screen_width, cur_screen_height = window.get_size()
        # If widdow size was changed, need to recalculate tile width and store new screen size
        if self.img_scaled == None or cur_screen_height != self.SCREEN_HEIGHT:
            self.TILE_WIDTH = int(cur_screen_height*self.WIDTH_HEIGHT_RATIO)
            self.SCREEN_WIDTH = cur_screen_width
            self.SCREEN_HEIGHT = cur_screen_height
            self.img_scaled = pygame.transform.scale(self.img, (self.TILE_WIDTH, cur_screen_height))
        
        # Repeat single image multiple times to fill all background space 
        for tile_idx in range(0, int(cur_screen_width/self.TILE_WIDTH) + 1):
            window.blit(self.img_scaled, (tile_idx*self.TILE_WIDTH, 0))