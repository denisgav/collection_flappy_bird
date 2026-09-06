#pragma once
#include <SFML/Graphics.hpp>

#include "Background.h"
#include "Base.h"
#include "Player.h"
#include "Pipe.h"
#include "PipeSpawner.h"
#include "MessageScreen.h"
#include "GameOverScreen.h"

class Game{
private:
    sf::RenderWindow window;
    Background background;
    Base base;
    Player player;
    PipeSpawner pipe_spawner;
    MessageScreen messageScreen;
    GameOverScreen gameOverScreen;

    sf::Font font;
    sf::Text scoreText;
    
    bool is_started;
    bool is_died;
    int unsigned score;
    int unsigned high_score;

private:
    void update();
    void draw();
    bool collisionDetect() const;
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