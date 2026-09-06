#pragma once
#include <SFML/Graphics.hpp>

#include "settings.h"

#pragma once

#include <SFML/Graphics.hpp>
#include <string>
#include <stdexcept>

class Background
{
private:
    sf::Texture m_texture;
    sf::Sprite m_sprite;
    int unsigned m_screenWidth, m_screenHeight;
    float m_widthHeightRatio;
    int unsigned m_tileWidth;

public:
    explicit Background();

    void update(const sf::RenderWindow& window);

    void draw(sf::RenderWindow& window);
};