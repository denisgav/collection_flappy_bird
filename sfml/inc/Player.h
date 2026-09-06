#pragma once

#include <SFML/Graphics.hpp>
#include <array>
#include <stdexcept>
#include <algorithm>

class Player
{
public:
    explicit Player();
    void update(const sf::RenderWindow& window);
    void draw(sf::RenderWindow& window);
    void onFlap();
    void onStart();
    void onRestart();
    void onGameOver();
    sf::FloatRect getBounds() const;

private:
    void animate();
    void move(const sf::RenderWindow& window);

private:
    std::array<sf::Texture, 3> m_textures;
    sf::Sprite m_sprite;
    int m_animationCounter;
    bool m_started;
    float m_velocity;
};