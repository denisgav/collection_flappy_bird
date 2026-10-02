#include "MessageScreen.h"

#include "settings.h"

MessageScreen :: MessageScreen()
{
    if (!m_texture.loadFromFile(RESOURCE_MESSAGE_PATH))
    {
        throw std::runtime_error(
            "Failed to load message image");
    }

    m_sprite.setTexture(m_texture);
}

void MessageScreen :: draw(sf::RenderWindow& window)
{
    sf::Vector2u windowSize = window.getSize();
    sf::Vector2u textureSize = m_texture.getSize();

    float posX =
        (windowSize.x - textureSize.x) / 2.f;

    float posY =
        (windowSize.y - textureSize.y) / 2.f;

    m_sprite.setPosition(posX, posY);

    window.draw(m_sprite);
}