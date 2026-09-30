local Background = require("Background")
local Base = require("Base")
local Player = require("Player")
local PipeSpawner = require("PipeSpawner")
local MessageScreen = require("MessageScreen")
local GameOverScreen = require("GameOverScreen")


local BIRD_START_POS_X = 150
local BIRD_START_POS_Y = 300
local BASE_SCROLL_SPEED = 180

local isStarted = false
local isDied = false
local score = 0
local high_score = 0

local function onScore()
    score = score + 1
end

function love.load()

    scoreFont =
        love.graphics.newFont(
            "assets/font/04B_19__.TTF",
            48
        )

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
    pipe_spawner.scoreListener = onScore

    message_screen = 
        MessageScreen("assets/sprites/message.png")

    game_over_screen = 
        GameOverScreen(scoreFont, "assets/sprites/gameover.png")
end

local function onFlap()
    player:onFlap()
end

local function onStart()
    base:onStart()
    pipe_spawner:onStart()
    player:onStart()
end

local function onGameOver()
    isDied = true

    player:onGameOver()
    pipe_spawner:onGameOver()
    base:onGameOver()

    if score > high_score then
        high_score = score
    end

    game_over_screen:setScore(score, high_score)
end

local function onReStart()
    isDied = false
    isStarted = false
    score = 0

    pipe_spawner:onReStart()
    player:onReStart()
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
        if isDied then
            if game_over_screen:isRestartBtnClicked(x, y) then
                onReStart()
            end
            return
        end

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

    if not isDied then

        local birdRect = player:getRect()

        if pipe_spawner:checkCollision(birdRect) then
            onGameOver()
        end

        if birdRect.y + birdRect.h >=
            base:getTopY() then
            onGameOver()
        end
    end
end

local function drawScore()
    local text = tostring(score)

    love.graphics.setFont(scoreFont)

    local y = 50

    -- outline
    love.graphics.setColor(0.85, 0.55, 0.15)

    for dx = -2, 2 do
        for dy = -2, 2 do
            if dx ~= 0 or dy ~= 0 then
                love.graphics.printf(
                    text,
                    50+dx,
                    y + dy,
                    love.graphics.getWidth(),
                    "left"
                )
            end
        end
    end

    -- foreground
    love.graphics.setColor(1, 1, 1)

    love.graphics.printf(
        text,
        50,
        y,
        love.graphics.getWidth(),
        "left"
    )

    love.graphics.setColor(1, 1, 1)
end

function love.draw()
    background:draw()
    pipe_spawner:draw()
    base:draw()
    player:draw()

    if isDied then
        game_over_screen:draw()
    else
        if isStarted == false then
            message_screen:draw()
        else
            drawScore()
        end
    end
end