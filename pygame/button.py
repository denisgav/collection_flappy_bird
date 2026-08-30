#!/usr/bin/env python3
import pygame

class Button:
    # =========================================================
    def __init__(self, x, y, width, height, font, text, color, hover_color, text_color):
        self.rect = pygame.Rect(x, y, width, height)
        self.text = text
        self.color = color
        self.hover_color = hover_color
        self.text_color = text_color

        # Initialize the font and render the text
        self.font = font
        self.text_surf = self.font.render(self.text, True, self.text_color)
        # Center the text inside the button rectangle
        self.text_rect = self.text_surf.get_rect(center=self.rect.center)

    # =========================================================
    def draw(self, window):
        # Get the current mouse position
        mouse_pos = pygame.mouse.get_pos()

        # Change color if the mouse is hovering over the button
        if self.rect.collidepoint(mouse_pos):
            pygame.draw.rect(window, self.hover_color, self.rect)
        else:
            pygame.draw.rect(window, self.color, self.rect)

        # Draw the text surface on top of the button
        window.blit(self.text_surf, self.text_rect)

    # =========================================================
    def is_clicked(self, event):
        # Check if a mouse click event happened inside the button
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            if self.rect.collidepoint(event.pos):
                return True
        return False