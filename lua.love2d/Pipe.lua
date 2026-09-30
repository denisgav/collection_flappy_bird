local Object = require("classic")

local Pipe = Object:extend()

local BIRD_START_POS_X = 150
local BASE_SCROLL_SPEED = 180

function Pipe:new(x, y, pipeImgBottom, isTop)

    self.pipeImgBottom = pipeImgBottom

    self.x = x
    self.y = y

    self.width = pipeImgBottom:getWidth()
    self.height = pipeImgBottom:getHeight()

    self.isTop = isTop or false

    -- Score system
    self.birdEnter = false
    self.birdExit = false
    self.birdPassed = false

    self.scoreListener = nil
    self.isDead = false
end

function Pipe:update(dt)

    self.x =
        self.x -
        BASE_SCROLL_SPEED * dt

    if self.x < -self.width then
        self.isDead = true
        return
    end

    if self.scoreListener
       and not self.isTop then

        if BIRD_START_POS_X > self.x
           and not self.birdPassed then
            self.birdEnter = true
        end

        if BIRD_START_POS_X >
           (self.x + self.width)
           and not self.birdPassed then
            self.birdExit = true
        end

        if self.birdEnter
           and self.birdExit
           and not self.birdPassed then

            self.birdPassed = true
            self.scoreListener()
        end
    end
end

function Pipe:draw()

    if self.isTop == false then
        love.graphics.draw(
            self.pipeImgBottom,
            self.x,
            self.y
        )
    else 
        love.graphics.draw(
            self.pipeImgBottom,
            self.x,
            self.y + self.height,
            0,
            1,
            -1
        )
    end
end

return Pipe