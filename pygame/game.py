#!/usr/bin/env python3

import pygame
from sys import exit

from settings import *
from background import Background

class Game:
    # =========================================================
    def __init__(self):
        self.clock = None
        self.window = None
        self.background = None
        
    # =========================================================
    def init(self) -> None:
        pygame.init()

        self.clock = pygame.time.Clock()
        self.window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT), pygame.RESIZABLE)
        self.background:Background = Background()

        pygame.display.set_caption(WINDOW_CAPTION)

    # =========================================================
    def main(self) -> None:
        running:bool = True
        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                    pygame.quit()
                    exit()
            
            self.draw()
            pygame.display.update()
            self.clock.tick(WINDOW_FPS)

    # =========================================================
    def draw(self) -> None:
        self.background.draw(self.window)