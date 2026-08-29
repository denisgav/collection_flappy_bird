#!/usr/bin/env python3

import pygame
from sys import exit

from settings import *
from background import Background
from player import Player
from base import Base

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
        self.window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))

        self.background:Background = Background()

        self.base:Base = Base()

        self.player = pygame.sprite.GroupSingle()
        self.player.add(Player())

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
            
            self.update(self.window)
            self.draw(self.window)
            pygame.display.update()
            self.clock.tick(WINDOW_FPS)

    # =========================================================
    def update(self, window) -> None:
        self.background.update(window)
        self.base.update(window)
        self.player.update(window)

    # =========================================================
    def draw(self, window) -> None:
        self.background.draw(window)
        self.base.draw(window)
        self.player.draw(window)