#include <iostream>
#include "Base.h"

#include "settings.h"

Base :: Base(): m_texture(), m_sprite(),
    m_screenWidth(0), m_screenHeight(0),
    m_tileWidth(0), m_tileHeight(0),
    m_offsetLeft(0.0f), m_baseAspectRatio(0.0f),
    m_started(false)
{
    if (!m_texture.loadFromFile(RESOURCE_BASE_PATH))
    {
        throw std::runtime_error("Failed to load base texture");
    }

    m_sprite.setTexture(m_texture);

    auto size = m_texture.getSize();

    m_baseAspectRatio =
        static_cast<float>(size.x) /
        static_cast<float>(size.y);
}

void Base :: update(const sf::RenderWindow& window)
{
    auto screenSize = window.getSize();

    unsigned int currentWidth  = screenSize.x;
    unsigned int currentHeight = screenSize.y;

    if (currentWidth != m_screenWidth ||
        currentHeight != m_screenHeight)
    {
        m_screenWidth  = currentWidth;
        m_screenHeight = currentHeight;

        m_tileHeight = static_cast<unsigned int>(
            currentHeight * baseToBackgroundHeightRatio);

        m_tileWidth = static_cast<unsigned int>(
            m_tileHeight * m_baseAspectRatio);

        float scaleX =
            static_cast<float>(m_tileWidth) /
            m_texture.getSize().x;

        float scaleY =
            static_cast<float>(m_tileHeight) /
            m_texture.getSize().y;

        m_sprite.setScale(scaleX, scaleY);
    }

    if (m_started)
    {
        m_offsetLeft += SCROLL_SPEED;

        if (m_offsetLeft >= m_tileWidth)
        {
            m_offsetLeft = 0.f;
        }
    }
}

void Base :: draw(sf::RenderWindow& window)
{
    float yOffset =
        static_cast<float>(m_screenHeight - m_tileHeight);

    int tileCount =
        static_cast<int>(
            (m_offsetLeft + m_screenWidth) /
            m_tileWidth) + 1;

    for (int i = 0; i < tileCount; ++i)
    {
        m_sprite.setPosition(
            static_cast<float>(i * m_tileWidth) - m_offsetLeft,
            yOffset
        );

        window.draw(m_sprite);
    }
}

void Base :: onStart()
{
    m_offsetLeft = 0.f;
    m_started = true;
}

void Base :: onRestart()
{
    m_offsetLeft = 0.f;
    m_started = false;
}

void Base :: onGameOver()
{
    m_started = false;
}

sf::FloatRect Base::getBounds() const
{
    float yOffset =
        static_cast<float>(m_screenHeight - m_tileHeight);
    return sf::FloatRect(0.0f, yOffset, static_cast<float>(m_screenWidth), static_cast<float>(m_tileHeight));
}