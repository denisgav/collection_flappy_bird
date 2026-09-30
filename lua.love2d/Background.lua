local Object = require("classic")

local Background = Object:extend()

function Background:new(imagePath)
    self.img = love.graphics.newImage(imagePath)

    self.widthHeightRatio =
        self.img:getWidth() / self.img:getHeight()

    self.imgScale = 1
    self.tileWidth = 0

    self.screenWidth = 0
    self.screenHeight = 0
end

function Background:update()
    local w, h = love.graphics.getDimensions()

    if h ~= self.screenHeight then
        self.screenWidth = w
        self.screenHeight = h

        self.tileWidth =
            math.floor(h * self.widthHeightRatio)

        self.imgScale =
            h / self.img:getHeight()
    end
end

function Background:draw()
    local tiles =
        math.floor(self.screenWidth / self.tileWidth) + 1

    for i = 0, tiles do
        love.graphics.draw(
            self.img,
            i * self.tileWidth,
            0,
            0,
            self.imgScale,
            self.imgScale
        )
    end
end

return Background