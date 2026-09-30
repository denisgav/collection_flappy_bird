local Object = require("classic")
local Button = require("Button")

local GameOverScreen = Object:extend()

function GameOverScreen:new(font, imagePath)

    self.font = font

    self.img =
        love.graphics.newImage(
            imagePath
        )

    self.score = 0
    self.highScore = 0

    self.screenWidth = 0
    self.screenHeight = 0

    self.button =
        Button(
            0,
            0,
            0,
            0,
            font,
            "RST",
            {0, 0.78, 0.39},
            {0, 1.0, 0.59},
            {1, 1, 1}
        )
end

function GameOverScreen:setScore(
        score,
        highScore)

    self.score = score
    self.highScore = highScore
end

function GameOverScreen:draw()

    local screenWidth =
        love.graphics.getWidth()

    local screenHeight =
        love.graphics.getHeight()

    local imgWidth =
        self.img:getWidth()

    local imgHeight =
        self.img:getHeight()

    local posX =
        (screenWidth - imgWidth) / 2

    local posY =
        (screenHeight - imgHeight * 4) / 2

    ----------------------------------------------------
    -- Image
    ----------------------------------------------------

    love.graphics.draw(
        self.img,
        posX,
        posY
    )

    ----------------------------------------------------
    -- Score
    ----------------------------------------------------

    love.graphics.setFont(self.font)

    posY = posY + imgHeight

    love.graphics.print(
        "SCORE: " .. tostring(self.score),
        posX,
        posY
    )

    ----------------------------------------------------
    -- High Score
    ----------------------------------------------------

    posY = posY + imgHeight

    love.graphics.print(
        "BEST: " .. tostring(self.highScore),
        posX,
        posY
    )

    ----------------------------------------------------
    -- Button
    ----------------------------------------------------

    if self.screenWidth ~= screenWidth
       or self.screenHeight ~= screenHeight then

        self.screenWidth = screenWidth
        self.screenHeight = screenHeight

        posY = posY + imgHeight

        self.button.x = posX
        self.button.y = posY
        self.button.width = imgWidth
        self.button.height = imgHeight
    end

    self.button:draw()
end

function GameOverScreen:isRestartBtnClicked(
        x,
        y)

    return self.button:isClicked(x, y)
end

return GameOverScreen