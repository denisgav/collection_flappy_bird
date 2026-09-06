#pragma once

#include <SFML/Graphics.hpp>
#include <functional>

class Pipe
{
public:
    Pipe(
        float x,
        float y,
        const sf::Texture& textureBottom,
        bool isTop = false);

    void update();
    void draw(sf::RenderWindow& window);
    
    const sf::FloatRect getBounds() const;
    bool outOfWindow() const;

public:
    std::function<void()> scoreListener;

private:
    sf::Sprite m_sprite;
    bool m_isTop;
    bool m_birdEnter, m_birdExit, m_birdPassed;
};