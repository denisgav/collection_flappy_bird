local Object = require("classic")

local Button = Object:extend()

function Button:new(
    x,
    y,
    width,
    height,
    font,
    text,
    color,
    hoverColor,
    textColor)

    self.x = x
    self.y = y
    self.width = width
    self.height = height

    self.font = font
    self.text = text

    self.color = color
    self.hoverColor = hoverColor
    self.textColor = textColor
end

function Button:isHovered()

    local mouseX, mouseY =
        love.mouse.getPosition()

    return
        mouseX >= self.x and
        mouseX <= self.x + self.width and
        mouseY >= self.y and
        mouseY <= self.y + self.height
end

function Button:draw()

    local color = self.color

    if self:isHovered() then
        color = self.hoverColor
    end

    love.graphics.setColor(color)

    love.graphics.rectangle(
        "fill",
        self.x,
        self.y,
        self.width,
        self.height
    )

    love.graphics.setColor(self.textColor)
    love.graphics.setFont(self.font)

    local textWidth =
        self.font:getWidth(self.text)

    local textHeight =
        self.font:getHeight()

    love.graphics.print(
        self.text,
        self.x + (self.width - textWidth) / 2,
        self.y + (self.height - textHeight) / 2
    )

    love.graphics.setColor(1, 1, 1)
end

function Button:isClicked(x, y)

    return
        x >= self.x and
        x <= self.x + self.width and
        y >= self.y and
        y <= self.y + self.height
end

return Button