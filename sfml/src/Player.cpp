#include "Player.h"

#include "settings.h"

Player :: Player() : m_textures(), m_sprite(),
    m_animationCounter(0), m_started(false), m_velocity(0.0f)
{
    if (!m_textures[0].loadFromFile(RESOURSE_BLUEBIRD_DOWNFLAP_PATH) ||
        !m_textures[1].loadFromFile(RESOURSE_BLUEBIRD_MIDFLAP_PATH) ||
        !m_textures[2].loadFromFile(RESOURSE_BLUEBIRD_UPFLAP_PATH))
    {
        throw std::runtime_error("Failed to load bird textures");
    }

    m_sprite.setTexture(m_textures[0]);

    auto bounds = m_sprite.getLocalBounds();
    m_sprite.setOrigin(
        bounds.width / 2.f,
        bounds.height / 2.f);

    m_sprite.setPosition(BIRD_START_X, BIRD_START_Y);
}

void Player :: update(const sf::RenderWindow& window)
{
    animate();

    if (m_started)
    {
        move(window);
    }
}

void Player :: draw(sf::RenderWindow& window)
{
    window.draw(m_sprite);
}

void Player :: onFlap()
{
    m_velocity = BIRD_FLAP_VELOCITY;
}

void Player :: onStart()
{
    m_started = true;
    m_velocity = 0.0f;
}

void Player :: onGameOver()
{
    m_started = false;
    m_velocity = 0.0f;
}

void Player :: animate()
{
    ++m_animationCounter;

    if (m_animationCounter >= 20)
    {
        m_animationCounter = 0;
    }

    int animationIndex = m_animationCounter / 5;

    if (animationIndex <= 2)
    {
        m_sprite.setTexture(m_textures[animationIndex], true);
    }
    else
    {
        m_sprite.setTexture(m_textures[1], true);
    }
}

void Player :: move(const sf::RenderWindow& window)
{
    m_velocity += BIRD_ACCELERATION;

    if (m_velocity > BIRD_MAX_VELOCITY)
    {
        m_velocity = BIRD_MAX_VELOCITY;
    }

    m_sprite.move(0.f, m_velocity);

    float y = m_sprite.getPosition().y;

    float maxY =
        static_cast<float>(window.getSize().y)
        - RESOURCE_BIRD_HEIGHT;

    y = std::clamp(y, 0.f, maxY);

    m_sprite.setPosition(
        m_sprite.getPosition().x,
        y);

    m_sprite.setRotation(
        m_velocity * BIRD_ANGULAR_SPEED);
}