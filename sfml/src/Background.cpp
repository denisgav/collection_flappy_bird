#include <iostream>
#include "Background.h"

#include "settings.h"

Background :: Background(): 
    m_texture(), m_sprite(), 
    m_screenWidth(0), m_screenHeight(0), 
    m_widthHeightRatio(0.0f), m_tileWidth(0)
{
    if (!m_texture.loadFromFile(RESOURSE_BACGROUND_DAY_PATH))
    {
        throw std::runtime_error("Failed to load background texture");
    }

    m_sprite.setTexture(m_texture);

    sf::Vector2u size = m_texture.getSize();
    m_widthHeightRatio =
        static_cast<float>(size.x) / static_cast<float>(size.y);
}

void Background::update(const sf::RenderWindow& window)
{
    sf::Vector2u screen_size = window.getSize();
    unsigned int currentWidth  = screen_size.x;
    unsigned int currentHeight = screen_size.y;

    // Recalculate only when window height changes
    if ((currentHeight != m_screenHeight) || (currentWidth != m_screenWidth))
    {
        sf::Vector2u texture_size = m_texture.getSize();
        m_tileWidth =
            static_cast<unsigned int>(currentHeight * m_widthHeightRatio);

        m_screenWidth  = currentWidth;
        m_screenHeight = currentHeight;

        float scaleX =
            static_cast<float>(m_tileWidth) /
            static_cast<float>(texture_size.x);

        float scaleY =
            static_cast<float>(currentHeight) /
            static_cast<float>(texture_size.y);

        m_sprite.setScale(scaleX, scaleY);

        // std::cout
        //     << "Window: " << currentWidth << " x " << currentHeight
        //     << "\nTexture: " << m_texture.getSize().x
        //     << " x " << m_texture.getSize().y
        //     << "\nm_widthHeightRatio: " << m_widthHeightRatio
        //     << "\nm_tileWidth: " << m_tileWidth
        //     << "\nScale: " << scaleX
        //     << ", " << scaleY
        //     << "\n\n";
    }
}

void Background::draw(sf::RenderWindow& window)
{
    for (unsigned int x = 0;
            x < m_screenWidth + m_tileWidth;
            x += m_tileWidth)
    {
        m_sprite.setPosition(
            static_cast<float>(x),
            0.f
        );

        // std::cout << "Srawind sprite with offset " << x << std :: endl;

        window.draw(m_sprite);
    }
}