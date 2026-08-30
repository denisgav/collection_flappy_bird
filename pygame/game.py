#!/usr/bin/env python3

import pygame
from sys import exit

from settings import *
from background import Background
from player import Player
from base import Base
from pipe_spawner import PipeSpawner

from message_screen import MessageScreen
from game_over_screen import GameOverScreen

class Game:
    # =========================================================
    def __init__(self):
        self.clock = None
        self.window = None
        self.background = None
        self.is_started = False
        self.is_died = False
        self.score = 0
        self.high_score = 0
        
    # =========================================================
    def init(self) -> None:
        pygame.init()
        self.font = pygame.font.Font(RESOURSE_FONT_PATH, 45)

        self.clock = pygame.time.Clock()
        self.window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))

        pygame.display.set_caption(WINDOW_CAPTION)

        self.message_screen:MessageScreen = MessageScreen()
        self.game_over_screen:GameOverScreen = GameOverScreen(self.font)

        self.on_restart()

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
                    if self.is_died == True:
                        if self.game_over_screen.is_restart_btn_clicked(event):
                            self.on_restart()
                    else:
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
        self.pipe_spawner.update(window)
        self.player_group.update(window)

        # Collision detection
        collision_pipes = pygame.sprite.spritecollide(self.player_group.sprites()[0], self.pipe_spawner.pipes, False)
        collision_ground = self.player_group.sprites()[0].rect.colliderect(self.base.rect)
        collision = collision_pipes or collision_ground
        if collision:
            self.on_game_over()

    # =========================================================
    def draw(self, window) -> None:
        self.background.draw(window)
        self.pipe_spawner.draw(window)
        self.base.draw(window)
        self.player_group.draw(window)

        if self.is_started == True:
            # Draw score text
            score_text = self.font.render(str(self.score), True, pygame.Color(255, 255, 255))
            window.blit(score_text, (20, 20))
        else:
            if self.is_died == False:
                self.message_screen.draw(window)
            else:
                self.game_over_screen.draw(window)
                

    # =========================================================
    def on_flap_action(self):
        if self.is_died == False:
            if self.is_started == False:
                self.is_started = True
                self.on_start()
            self.on_flap()

    # =========================================================
    def on_flap(self):
        self.player.on_flap()

    # =========================================================
    def on_start(self):
        self.score = 0
        self.base.on_start()
        self.pipe_spawner.on_start()
        self.player.on_start()

    # =========================================================
    def on_restart(self):
        self.background:Background = Background()
        
        self.base:Base = Base()

        self.player:Player = Player()
        self.player_group = pygame.sprite.GroupSingle()
        self.player_group.add(self.player)

        self.pipe_spawner:PipeSpawner = PipeSpawner()
        self.pipe_spawner.score_listener = self.on_score

        self.is_died = False
        self.is_started = False

    # =========================================================
    def on_game_over(self):
        self.is_died = True
        self.is_started = False
        if self.score > self.high_score:
            self.high_score = self.score
        self.game_over_screen.set_score(self.score, self.high_score)
        self.base.on_game_over()
        self.pipe_spawner.on_game_over()
        self.player.on_game_over()

    # =========================================================
    def on_score(self):
        # print("Score!")
        self.score += 1

