#include <iostream>
#include "Game.h"

#include "settings.h"

Game :: Game() : 
    window(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), WINDOW_CAPTION, sf::Style::Titlebar | sf::Style::Close),
    background(),
    base(),
    player(),
    is_started(false), is_died(false),
    score(0), high_score(0)
{
    window.setFramerateLimit(WINDOW_FPS);
}

void Game :: init()
{
}

int Game :: main(){
    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            switch(event.type)
            {
                case sf::Event::Closed:
                {
                    window.close();
                    break;
                }
                case sf::Event::Resized:
                {
                    sf::FloatRect visibleArea(
                    0.f,
                    0.f,
                    static_cast<float>(event.size.width),
                    static_cast<float>(event.size.height));

                    window.setView(sf::View(visibleArea));
                    break;
                }
                case sf::Event::MouseButtonPressed:
                {
                    if (event.mouseButton.button == sf::Mouse::Left)
                    {
                        onFlapAction();
                    }
                    break;
                }
                case sf::Event::KeyPressed:
                {
                    if (event.key.code == sf::Keyboard::Space)
                    {
                        onFlapAction();
                    }
                    break;
                }
                default:
                {
                    break;
                }
            }
        }

        this->update();

        window.clear();

        this->draw();

        window.display();
    }
    return 0;
}

void Game :: update()
{
    background.update(window);
    base.update(window);
    player.update(window);
}

void Game :: draw()
{
    background.draw(window);
    base.draw(window);
    player.draw(window);
}

void Game :: onFlapAction()
{
    if(is_died == false)
    {
        if(is_started == false)
        {
            is_started = true;
            onStart();
        }
        onFlap();
    }
}

void Game :: onFlap()
{
    player.onFlap();
}

void Game :: onStart()
{
    score = 0;
    base.onStart();
    //pipe_spawner.on_start();
    player.onStart();
}

void Game :: onRestart()
{

}

void Game :: onGameOver()
{

}

void Game :: onScore()
{
    score++;
}