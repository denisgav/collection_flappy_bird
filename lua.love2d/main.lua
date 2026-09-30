local Background = require("Background")
local Base = require("Base")
local Player = require("Player")

local isStarted = false
local isDied = false
local score = 0
local high_score = 0

function love.load()

    background =
        Background("assets/sprites/background-day.png")

    base =
        Base(
            "assets/sprites/base.png",
            180,      -- px/sec
            0.22
        )

    player =
        Player(
            150,
            300,
            "assets/sprites/bluebird-downflap.png",
            "assets/sprites/bluebird-midflap.png",
            "assets/sprites/bluebird-upflap.png"
        )
end

local function onFlap()
    player:onFlap()
end

local function onStart()
    base:onStart()
    player:onStart()
end

local function handleFlap()
    if isDied == false then
        if isStarted == false then
            isStarted = true
            onStart()
        end
        onFlap()
    end
end

function love.keypressed(key)
    if key == "space" then
        handleFlap()
    end
end

function love.mousepressed(x, y, button)
    if button == 1 then
        handleFlap()
    end
end

function love.touchpressed(id, x, y, dx, dy, pressure)
    handleFlap()
end

function love.update(dt)
    background:update()
    base:update(dt)
    player:update(dt)
end

function love.draw()
    background:draw()
    base:draw()
    player:draw()
end

