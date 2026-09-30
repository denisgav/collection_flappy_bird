local Object = require("classic")

local MessageScreen = Object:extend()

function MessageScreen:new(imagePath)

    self.img =
        love.graphics.newImage(
            imagePath
        )
end

function MessageScreen:draw()

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
        (screenHeight - imgHeight) / 2

    love.graphics.draw(
        self.img,
        posX,
        posY
    )
end

return MessageScreen