#pragma once

#include <SFML/Graphics.hpp>
#include <vector>
#include <memory>
#include <functional>
#include <random>

#include "Pipe.h"

class PipeSpawner
{
public:
    PipeSpawner();
    void update();
    void draw(sf::RenderWindow& window);
    void onStart();
    void onRestart();
    void onGameOver();
    bool pipeCollideWithRect(const sf::FloatRect & rect) const;

public:
    std::function<void()> scoreListener;

private:
    void spawnPipePair();

private:
    sf::Texture m_pipeTextureBottom;
    std::vector<std::unique_ptr<Pipe>> m_pipes;

    bool m_started = false;
    int m_pipeTimer = 0;

    std::mt19937 m_rng;
};