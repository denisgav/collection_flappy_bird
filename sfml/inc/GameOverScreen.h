#pragma once

#include <SFML/Graphics.hpp>
#include <string>
#include <stdexcept>

#include "Button.h"

class GameOverScreen
{
public:
    explicit GameOverScreen();

    void setScore(int score, int highScore);

    void draw(sf::RenderWindow& window);

    bool isRestartClicked(
        const sf::Event& event,
        const sf::RenderWindow& window) const;

private:
    sf::Texture m_texture;
    sf::Sprite m_sprite;

    sf::Font m_font;

    int m_score = 0;
    int m_highScore = 0;

    Button m_button;
};