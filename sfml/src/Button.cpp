#include "Button.h"

Button :: Button(
    float x,
    float y,
    float width,
    float height,
    const sf::Font& font,
    const std::string& text,
    const sf::Color& color,
    const sf::Color& hoverColor,
    const sf::Color& textColor)
    : m_color(color),
        m_hoverColor(hoverColor)
{
    m_rect.setPosition(x, y);
    m_rect.setSize({width, height});

    m_text.setFont(font);
    m_text.setString(text);
    m_text.setCharacterSize(32);
    m_text.setFillColor(textColor);

    centerText();
}

void Button :: setRect(float x, float y, float width, float height)
{
    m_rect.setPosition(x, y);
    m_rect.setSize({width, height});
    centerText();
}

void Button :: draw(sf::RenderWindow& window)
{
    auto mouse = sf::Mouse::getPosition(window);

    if (m_rect.getGlobalBounds().contains(
            static_cast<float>(mouse.x),
            static_cast<float>(mouse.y)))
    {
        m_rect.setFillColor(m_hoverColor);
    }
    else
    {
        m_rect.setFillColor(m_color);
    }

    window.draw(m_rect);
    window.draw(m_text);
}

bool Button :: isClicked(const sf::Event& event,
                const sf::RenderWindow& window) const
{
    if (event.type != sf::Event::MouseButtonPressed)
        return false;

    if (event.mouseButton.button != sf::Mouse::Left)
        return false;

    auto mouse = sf::Mouse::getPosition(window);

    return m_rect.getGlobalBounds().contains(
        static_cast<float>(mouse.x),
        static_cast<float>(mouse.y));
}

void Button :: centerText()
{
    auto bounds = m_text.getLocalBounds();

    m_text.setOrigin(
        bounds.left + bounds.width / 2.f,
        bounds.top + bounds.height / 2.f);

    auto rect = m_rect.getGlobalBounds();

    m_text.setPosition(
        rect.left + rect.width / 2.f,
        rect.top + rect.height / 2.f);
}