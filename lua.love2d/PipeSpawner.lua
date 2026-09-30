local Object = require("classic")
local Pipe = require("Pipe")

local Collision = require("Collision")
local PipeSpawner = Object:extend()

local RESOURCE_PIPE_WIDTH = 52
local RESOURCE_PIPE_HEIGHT = 320
local PIPE_SPAWNER_POS_X = 950
local PIPE_SPAWNER_TIMEOUT = 2
local PIPE_SPAWNER_POSY_RAND_RANGE_MIN = -RESOURCE_PIPE_HEIGHT + 25
local PIPE_SPAWNER_POSY_RAND_RANGE_MAX = -RESOURCE_PIPE_HEIGHT + 275
local PIPE_SPAWNER_POSY_GAP = 100

function PipeSpawner:new(imagePath)

    self.pipeImgBottom =
        love.graphics.newImage(
            imagePath
        )

    self.pipes = {}

    self.isStarted = false

    self.pipeTimer = 0

    self.scoreListener = nil
end

function PipeSpawner:update(dt)

    ----------------------------------------------------------------
    -- Spawn new pipes
    ----------------------------------------------------------------

    if self.isStarted then

        if self.pipeTimer <= 0 then

            local xTop = PIPE_SPAWNER_POS_X
            local xBottom = PIPE_SPAWNER_POS_X

            local yTop =
                love.math.random(
                    PIPE_SPAWNER_POSY_RAND_RANGE_MIN,
                    PIPE_SPAWNER_POSY_RAND_RANGE_MAX
                )

            local yBottom =
                yTop
                + PIPE_SPAWNER_POSY_GAP
                + RESOURCE_PIPE_HEIGHT

            local pipeTop =
                Pipe(
                    xTop,
                    yTop,
                    self.pipeImgBottom,
                    true
                )

            local pipeBottom =
                Pipe(
                    xBottom,
                    yBottom,
                    self.pipeImgBottom,
                    false
                )

            pipeBottom.scoreListener =
                self.scoreListener

            table.insert(
                self.pipes,
                pipeTop
            )

            table.insert(
                self.pipes,
                pipeBottom
            )

            self.pipeTimer =
                PIPE_SPAWNER_TIMEOUT
        end

        self.pipeTimer =
            self.pipeTimer - dt
    end

    ----------------------------------------------------------------
    -- Update pipes
    ----------------------------------------------------------------

    if self.isStarted then
        for i = #self.pipes, 1, -1 do

            local pipe = self.pipes[i]

            pipe:update(dt)

            if pipe.isDead then
                table.remove(
                    self.pipes,
                    i
                )
            end
        end
    end
end

function PipeSpawner:draw()

    for _, pipe in ipairs(self.pipes) do
        pipe:draw()
    end
end

function PipeSpawner:onStart()
    self.isStarted = true
end

function PipeSpawner:onGameOver()
    self.isStarted = false
end

function PipeSpawner:checkCollision(playerRect)

    for _, pipe in ipairs(self.pipes) do

        local pipeRect = pipe:getRect()

        if Collision.rectsOverlap(
                playerRect,
                pipeRect) then

            return true
        end
    end

    return false
end

return PipeSpawner