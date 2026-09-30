local Object = require("classic")

local Player = Object:extend()

local BIRD_FLAP_VELOCITY = -320      -- px/sec
local BIRD_ACCELERATION = 900        -- px/sec^2
local BIRD_MAX_VELOCITY = 400        -- px/sec
local BIRD_ANGULAR_SPEED = 0.15      -- deg per (px/sec)

function Player:new(
        x,
        y,
        downPath,
        midPath,
        upPath)

    self.frames = {
        love.graphics.newImage(downPath),
        love.graphics.newImage(midPath),
        love.graphics.newImage(upPath)
    }

    self.image = self.frames[1]

    self.x = x
    self.y = y

    self.velocity = 0
    self.rotation = 0

    self.animationCounter = 0

    self.isStarted = false
end

function Player:update(dt)

    -- Animation

    self.animationCounter =
        (self.animationCounter + 1) % 20

    local frame =
        math.floor(self.animationCounter / 5)

    if frame <= 2 then
        self.image = self.frames[frame + 1]
    else
        self.image = self.frames[2]
    end

    if self.isStarted then
        self:move(dt)
    end
end

function Player:move(dt)

    self.velocity =
        self.velocity +
        BIRD_ACCELERATION * dt

    if self.velocity > BIRD_MAX_VELOCITY then
        self.velocity = BIRD_MAX_VELOCITY
    end

    self.y =
        self.y + self.velocity * dt

    local screenHeight =
        love.graphics.getHeight()

    local maxY =
        screenHeight - self.image:getHeight()

    if self.y < 0 then
        self.y = 0
    end

    if self.y > maxY then
        self.y = maxY
    end

    self.rotation =
        math.rad(
            self.velocity *
            BIRD_ANGULAR_SPEED
        )
end

function Player:draw()
    local w = self.image:getWidth()
    local h = self.image:getHeight()

    love.graphics.draw(
        self.image,
        self.x,
        self.y,
        self.rotation,
        1,
        1,
        w / 2,
        h / 2
    )
end

function Player:onFlap()
    self.velocity = BIRD_FLAP_VELOCITY
end

function Player:onStart()
    self.isStarted = true
    self.velocity = 0
end

function Player:onGameOver()
    self.isStarted = false
    self.velocity = 0
end

return Player