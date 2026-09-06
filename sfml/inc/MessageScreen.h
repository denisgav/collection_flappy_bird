#pragma once

#include <SFML/Graphics.hpp>
#include <stdexcept>

class MessageScreen
{
public:
    explicit MessageScreen();
    void draw(sf::RenderWindow& window);

private:
    sf::Texture m_texture;
    sf::Sprite m_sprite;
};