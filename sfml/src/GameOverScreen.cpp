#include "GameOverScreen.h"

#include "settings.h"

GameOverScreen :: GameOverScreen()
    : m_font(),
    m_button(
        0.f,
        0.f,
        0.f,
        0.f,
        m_font,
        "RST",
        sf::Color(0, 200, 100),
        sf::Color(0, 255, 150),
        sf::Color::White)
{
    if(!m_font.loadFromFile(RESOURCE_FONT_PATH))
    {
         throw std::runtime_error(
            "Failed to load game font");
    }

    if (!m_texture.loadFromFile(RESOURCE_GAMEOVER_PATH))
    {
        throw std::runtime_error(
            "Failed to load game over image");
    }

    m_sprite.setTexture(m_texture);
}

void GameOverScreen :: setScore(int score, int highScore)
{
    m_score = score;
    m_highScore = highScore;
}

void GameOverScreen :: draw(sf::RenderWindow& window)
{
    sf::Vector2u windowSize = window.getSize();
    sf::Vector2u textureSize = m_texture.getSize();

    float posX =
        (windowSize.x - textureSize.x) / 2.f;

    float posY =
        (windowSize.y - textureSize.y * 4.f) / 2.f;

    m_sprite.setPosition(posX, posY);
    window.draw(m_sprite);

    sf::Text scoreText;
    scoreText.setFont(m_font);
    scoreText.setCharacterSize(45);
    scoreText.setFillColor(sf::Color::White);

    posY += textureSize.y;
    scoreText.setString(
        "SCORE: " + std::to_string(m_score));
    scoreText.setPosition(posX, posY);

    window.draw(scoreText);

    posY += textureSize.y;
    scoreText.setString(
        "BEST: " + std::to_string(m_highScore));
    scoreText.setPosition(posX, posY);

    window.draw(scoreText);

    posY += textureSize.y;

    m_button.setRect(
        posX,
        posY,
        static_cast<float>(textureSize.x),
        static_cast<float>(textureSize.y));

    m_button.draw(window);
}

bool GameOverScreen :: isRestartClicked(
    const sf::Event& event,
    const sf::RenderWindow& window) const
{
    return m_button.isClicked(event, window);
}