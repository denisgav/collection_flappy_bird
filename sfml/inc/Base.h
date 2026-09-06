#pragma once

#include <SFML/Graphics.hpp>
#include <stdexcept>

class Base
{
public:
    explicit Base();
    void update(const sf::RenderWindow& window);
    void draw(sf::RenderWindow& window);
    void onStart();
    void onGameOver();
    sf::FloatRect getBounds() const;

private:
    sf::Texture m_texture;
    sf::Sprite  m_sprite;

    unsigned int m_screenWidth;
    unsigned int m_screenHeight;

    unsigned int m_tileWidth;
    unsigned int m_tileHeight;

    float m_offsetLeft;
    float m_baseAspectRatio;

    bool  m_started;
};