local Object = require("classic")

local Base = Object:extend()

function Base:new(imagePath, scrollSpeed, heightRatio)
    self.img = love.graphics.newImage(imagePath)

    self.scrollSpeed = scrollSpeed
    self.heightRatio = heightRatio

    self.baseAspectRatio =
        self.img:getWidth() / self.img:getHeight()

    self.screenWidth = 0
    self.screenHeight = 0

    self.tileWidth = 0
    self.tileHeight = 0

    self.offsetLeft = 0
    self.isStarted = false

    self.scaleX = 1
    self.scaleY = 1
end

function Base:update(dt)
    local w, h = love.graphics.getDimensions()

    if w ~= self.screenWidth
       or h ~= self.screenHeight then

        self.screenWidth = w
        self.screenHeight = h

        self.tileHeight =
            math.floor(h * self.heightRatio)

        self.tileWidth =
            math.floor(
                self.tileHeight * self.baseAspectRatio
            )

        self.scaleX =
            self.tileWidth / self.img:getWidth()

        self.scaleY =
            self.tileHeight / self.img:getHeight()
    end

    if self.isStarted then
        self.offsetLeft =
            self.offsetLeft + self.scrollSpeed * dt

        if self.offsetLeft >= self.tileWidth then
            self.offsetLeft =
                self.offsetLeft - self.tileWidth
        end
    end
end

function Base:draw()
    local y =
        self.screenHeight - self.tileHeight

    local tiles =
        math.floor(
            (self.offsetLeft + self.screenWidth)
            / self.tileWidth
        ) + 1

    for i = 0, tiles do
        love.graphics.draw(
            self.img,
            i * self.tileWidth - self.offsetLeft,
            y,
            0,
            self.scaleX,
            self.scaleY
        )
    end
end

function Base:onStart()
    self.offsetLeft = 0
    self.isStarted = true
end

function Base:onGameOver()
    self.isStarted = false
end

return Base