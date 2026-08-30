#!/usr/bin/env python3
import random
import pygame

from settings import *

from pipe import Pipe

class PipeSpawner:
    # =========================================================
    def __init__(self):
        self.pipe_img_bottom =  pygame.image.load(RESOURSE_PIPE_GREEN_PATH)
        self.pipe_img_top = pygame.transform.flip(self.pipe_img_bottom , False, True)
        self.pipes = pygame.sprite.Group()
        self.is_started = False
        self.pipe_timer = 0
        self.score_listener = None

    # =========================================================
    def update(self, window):
        # Pipe spawner
        if self.is_started:
            if self.pipe_timer <= 0:
                x_top, x_bottom = PIPE_SPAWNER_POS_X, PIPE_SPAWNER_POS_X
                y_top = random.randint(PIPE_SPAWNER_POSY_RAND_RANGE_MIN, PIPE_SPAWNER_POSY_RAND_RANGE_MAX)
                y_bottom = y_top + PIPE_SPAWNER_POSY_GAP + RESOURSE_PIPE_HEIGHT

                pipe_top: Pipe = Pipe(x_top, y_top, self.pipe_img_top, True)
                pipe_bottom: Pipe = Pipe(x_bottom, y_bottom, self.pipe_img_bottom, False)
                pipe_bottom.score_listener = self.score_listener 

                self.pipes.add(pipe_top)
                self.pipes.add(pipe_bottom)

                self.pipe_timer = PIPE_SPAWNER_TIMEOUT
            self.pipe_timer -= 1

        # Update pipe positions
        if self.is_started:
            self.pipes.update()

    # =========================================================
    def draw(self, window):
        self.pipes.draw(window)

    # =========================================================
    def on_start(self):
        self.is_started = True

    # =========================================================
    def on_game_over(self):
        self.is_started = False