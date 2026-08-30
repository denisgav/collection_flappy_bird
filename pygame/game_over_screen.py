#!/usr/bin/env python3
import pygame

from button import Button
from settings import *

class GameOverScreen:
    # =========================================================
    def __init__(self, font):
        self.font = font
        self.img =  pygame.image.load(RESOURSE_GAMEOVER_PATH).convert_alpha()
        self.score = None
        self.high_score = None
        self.SCREEN_WIDTH = None
        self.SCREEN_HEIGHT = None
        self.button:Button = Button(0, 0, 0, 0, font, "RST",
                                    color=(0, 200, 100),
                                    hover_color=(0, 255, 150),
                                    text_color=(255, 255, 255)
                                    )

    # =========================================================
    def set_score(self, score:int, high_score:int):
        self.score = score
        self.high_score = high_score

    # =========================================================
    def draw(self, window):
        cur_screen_width, cur_screen_height = window.get_size()
        pos_x = (cur_screen_width - RESOURCE_GAMEOVER_WIDTH) / 2
        pos_y = (cur_screen_height - RESOURCE_GAMEOVER_HEIGHT*4) / 2

        # game over image:
        window.blit(self.img, (pos_x, pos_y))

        # score text:
        pos_y += RESOURCE_GAMEOVER_HEIGHT
        score_text = self.font.render("SCORE: " + str(self.score), True, pygame.Color(255, 255, 255))
        window.blit(score_text, (pos_x, pos_y))

        # high score text:
        pos_y += RESOURCE_GAMEOVER_HEIGHT
        high_score_text = self.font.render("BEST: " + str(self.high_score), True, pygame.Color(255, 255, 255))
        window.blit(high_score_text, (pos_x, pos_y))

        # Button
        if self.SCREEN_WIDTH == None or self.SCREEN_WIDTH != cur_screen_width or self.SCREEN_HEIGHT != None or self.SCREEN_HEIGHT != cur_screen_height:
            self.SCREEN_WIDTH = cur_screen_width
            self.SCREEN_HEIGHT = cur_screen_height
            pos_y += RESOURCE_GAMEOVER_HEIGHT
            self.button.rect = pygame.Rect(pos_x, pos_y, RESOURCE_GAMEOVER_WIDTH, RESOURCE_GAMEOVER_HEIGHT)
            self.button.text_rect = self.button.text_surf.get_rect(center=self.button.rect.center)
        self.button.draw(window)

    # =========================================================
    def is_restart_btn_clicked(self, event):
        return self.button.is_clicked(event)