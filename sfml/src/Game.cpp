#include <iostream>
#include "Game.h"

#include "settings.h"

Game :: Game() : 
    window(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), WINDOW_CAPTION, sf::Style::Titlebar | sf::Style::Close),
    background(),
    base(),
    player(),
    pipe_spawner(),
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
    pipe_spawner.update();
    player.update(window);

    bool collision = collisionDetect();
    if(collision)
        onGameOver();
}

void Game :: draw()
{
    background.draw(window);
    pipe_spawner.draw(window);
    base.draw(window);
    player.draw(window);
}

bool Game :: collisionDetect() const
{
    sf::FloatRect playerRect = player.getBounds();
    sf::FloatRect baseRect = base.getBounds();
    bool collideWithGround = baseRect.intersects(playerRect);
    if(collideWithGround)
        return true;

    bool collideWithPipe = pipe_spawner.pipeCollideWithRect(playerRect);
    return collideWithPipe;
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
    pipe_spawner.onStart();
    player.onStart();
}

void Game :: onRestart()
{
}

void Game :: onGameOver()
{
    is_died = true;
    is_started = false;
    if(score > high_score)
        high_score = score;
    // game_over_screen.set_score(score, high_score)
    base.onGameOver();
    pipe_spawner.onGameOver();
    player.onGameOver();
}

void Game :: onScore()
{
    score++;
}