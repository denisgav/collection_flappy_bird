#include <iostream>
#include "Pipe.h"

#include "settings.h"

Pipe :: Pipe(
    float x,
    float y,
    const sf::Texture& textureBottom,
    bool isTop)
    : m_isTop(isTop),
    m_birdEnter(false),
    m_birdExit(false),
    m_birdPassed(false)
{
    m_sprite.setTexture(textureBottom);
    // Need to flip texture
    if (isTop)
    {
        m_sprite.setOrigin(
            0.f,
            static_cast<float>(textureBottom.getSize().y)
        );
        m_sprite.setScale(1.f, -1.f);
    }

    m_sprite.setPosition(x, y);
}

void Pipe :: update()
{
    if(outOfWindow())
        return;

    m_sprite.move(-SCROLL_SPEED, 0.f);

    if (scoreListener && !m_isTop)
    {
        float left =
            m_sprite.getGlobalBounds().left;

        float right =
            left +
            RESOURCE_PIPE_WIDTH;

        if (BIRD_START_X > left &&
            !m_birdPassed)
        {
            m_birdEnter = true;
        }

        if (BIRD_START_X > right &&
            !m_birdPassed)
        {
            m_birdExit = true;
        }

        if (m_birdEnter &&
            m_birdExit &&
            !m_birdPassed)
        {
            m_birdPassed = true;
            scoreListener();
        }
    }
}

void Pipe :: draw(sf::RenderWindow& window)
{
    window.draw(m_sprite);
}

const sf::FloatRect Pipe :: getBounds() const
{
    return m_sprite.getGlobalBounds();
}

bool Pipe :: outOfWindow() const
{
    float left = m_sprite.getGlobalBounds().left;
    float left_min_pos = -(static_cast<float>(RESOURCE_PIPE_WIDTH));
    return left < left_min_pos;
}