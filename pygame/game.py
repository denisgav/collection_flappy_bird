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
        self.is_started = False
        
    # =========================================================
    def init(self) -> None:
        pygame.init()

        self.clock = pygame.time.Clock()
        self.window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))

        self.background:Background = Background()

        self.base:Base = Base()

        self.player:Player = Player()
        self.player_group = pygame.sprite.GroupSingle()
        self.player_group.add(self.player)

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
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    if event.button == 1:
                        # 1 = Left, 2 = Middle, 3 = Right, 4 = Scroll Up, 5 = Scroll Down
                        self.on_flap_action()
                elif event.type == pygame.KEYDOWN:
                    # Check if that specific key was the Spacebar
                    if event.key == pygame.K_SPACE:
                        self.on_flap_action()
            
            self.update(self.window)
            self.draw(self.window)
            pygame.display.update()
            self.clock.tick(WINDOW_FPS)

    # =========================================================
    def update(self, window) -> None:
        self.background.update(window)
        self.base.update(window)
        self.player_group.update(window)

    # =========================================================
    def draw(self, window) -> None:
        self.background.draw(window)
        self.base.draw(window)
        self.player_group.draw(window)

    # =========================================================
    def on_flap_action(self):
        if self.is_started == False:
            self.is_started = True
            self.on_start()
        self.on_flap()

    # =========================================================
    def on_flap(self):
        self.player.on_flap()

    # =========================================================
    def on_start(self):
        self.base.on_start()
        self.player.on_start()

    # =========================================================
    def on_game_over(self):
        self.is_started = False
        self.base.on_game_over()
        self.player.on_game_over()
        

