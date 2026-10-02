#include <iostream>
#include "Game.h"

#include "settings.h"

Game :: Game() : 
    window(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), WINDOW_CAPTION, sf::Style::Titlebar | sf::Style::Close),
    background(),
    base(),
    player(),
    pipe_spawner(),
    messageScreen(),
    gameOverScreen(),
    font(), scoreText(),
    is_started(false), is_died(false),
    score(0), high_score(0)
{
    window.setFramerateLimit(WINDOW_FPS);
    pipe_spawner.scoreListener = std::bind(&Game::onScore, this);

    if(!font.loadFromFile(RESOURCE_FONT_PATH))
    {
         throw std::runtime_error(
            "Failed to load game font");
    }

    scoreText.setFont(font);
    scoreText.setCharacterSize(45);
    scoreText.setFillColor(sf::Color::White);
    scoreText.setPosition(20.f, 20.f);
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
                        if(is_died)
                        {
                            if(gameOverScreen.isRestartClicked(event, window))
                                onRestart();
                        }
                        else
                        {
                            onFlapAction();
                        }
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

    if(is_started)
    {
        scoreText.setString(std::to_string(score));
        window.draw(scoreText);
    }
    else
    {
        if(is_died == false)
        {
            messageScreen.draw(window);
        }
        else
        {
            gameOverScreen.setScore(score, high_score);
            gameOverScreen.draw(window);
        }
    }
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
    base.onRestart();
    player.onRestart();
    pipe_spawner.onRestart();
    is_died = false;
    is_started = false;
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
    std :: cout << "Soce: " << score << std :: endl;
}