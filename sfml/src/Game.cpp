#include "Game.h"

Game :: Game() : 
    window(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), WINDOW_CAPTION, sf::Style::Titlebar | sf::Style::Close),
    background() {

}

void Game :: init(){
}

void Game :: update(){
    background.update(window);
}

void Game :: draw(){
    background.draw(window);
}

int Game :: main(){
    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
            if (event.type == sf::Event::Resized)
            {
                sf::FloatRect visibleArea(
                    0.f,
                    0.f,
                    static_cast<float>(event.size.width),
                    static_cast<float>(event.size.height));

                window.setView(sf::View(visibleArea));
            }
        }

        this->update();

        window.clear();

        this->draw();

        window.display();
    }
    return 0;
}