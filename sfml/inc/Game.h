#pragma once
#include <SFML/Graphics.hpp>

#include "Background.h"
#include "Base.h"
#include "Player.h"

class Game{
private:
    sf::RenderWindow window;
    Background background;
    Base base;
    Player player;
    bool is_started;
    bool is_died;
    int unsigned score;
    int unsigned high_score;
    void update();
    void draw();
    void onFlapAction();
    void onFlap();
    void onStart();
    void onRestart();
    void onGameOver();
    void onScore();
public:
    Game();
    void init();
    int main();
};