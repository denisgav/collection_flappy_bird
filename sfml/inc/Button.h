#pragma once

#include <SFML/Graphics.hpp>
#include <string>

class Button
{
public:
    explicit Button(
        float x,
        float y,
        float width,
        float height,
        const sf::Font& font,
        const std::string& text,
        const sf::Color& color,
        const sf::Color& hoverColor,
        const sf::Color& textColor);

    void setRect(float x, float y, float width, float height);

    void draw(sf::RenderWindow& window);

    bool isClicked(const sf::Event& event,
                   const sf::RenderWindow& window) const;

private:
    void centerText();

private:
    sf::RectangleShape m_rect;
    sf::Text m_text;

    sf::Color m_color;
    sf::Color m_hoverColor;
};