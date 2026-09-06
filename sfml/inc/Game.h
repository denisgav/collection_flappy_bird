#pragma once
#include <SFML/Graphics.hpp>

#include "Background.h"
#include "settings.h"

class Game{
private:
    sf::RenderWindow window;
    Background background;
    void update();
    void draw();
public:
    Game();
    void init();
    int main();
};