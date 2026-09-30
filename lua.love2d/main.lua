local Background = require("Background")
local Base = require("Base")
local Player = require("Player")
local PipeSpawner = require("PipeSpawner")

local BIRD_START_POS_X = 150
local BIRD_START_POS_Y = 300
local BASE_SCROLL_SPEED = 180

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
            BASE_SCROLL_SPEED,      -- px/sec
            0.22
        )

    player =
        Player(
            BIRD_START_POS_X,
            BIRD_START_POS_Y,
            "assets/sprites/bluebird-downflap.png",
            "assets/sprites/bluebird-midflap.png",
            "assets/sprites/bluebird-upflap.png"
        )

    pipe_spawner = 
        PipeSpawner("assets/sprites/pipe-green.png")
end

local function onFlap()
    player:onFlap()
end

local function onStart()
    base:onStart()
    pipe_spawner:onStart()
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
    pipe_spawner:update(dt)
    player:update(dt)
end

function love.draw()
    background:draw()
    pipe_spawner:draw()
    base:draw()
    player:draw()
end

