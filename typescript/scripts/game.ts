import {
    RESOURCE_BACKGROUND_DAY_PATH,
    RESOURCE_BASE_PATH,
    RESOURCE_BLUEBIRD_DOWNFLAP_PATH,
    RESOURCE_BLUEBIRD_MIDFLAP_PATH,
    RESOURCE_BLUEBIRD_UPFLAP_PATH,
    RESOURCE_PIPE_GREEN_PATH,
    RESOURCE_MESSAGE_PATH,
    RESOURCE_GAMEOVER_PATH,
    FRAME_TIME,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    RESOURCE_MESSAGE_WIDTH,
    RESOURCE_MESSAGE_HEIGHT,
    RESOURCE_GAMEOVER_WIDTH,
    RESOURCE_GAMEOVER_HEIGHT
} from "./settings.js";

import { Background } from "./background.js";
import { Base } from "./base.js";
import { Player } from "./player.js";
import { PipeSpawner } from "./pipe_spawner.js";

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    restartButton: HTMLButtonElement;

    gameStarted = false;
    gameOver = false;

    score = 0;
    highScore = 0;

    background: Background;
    base: Base;
    player: Player;
    pipeSpawner: PipeSpawner;

    messageImage: HTMLImageElement;
    gameOverImage: HTMLImageElement;

    previousTime = 0;

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        restartButton: HTMLButtonElement
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.restartButton = restartButton;

        this.background =
            new Background(
                RESOURCE_BACKGROUND_DAY_PATH
            );

        this.base =
            new Base(
                RESOURCE_BASE_PATH
            );

        this.player =
            new Player(
                RESOURCE_BLUEBIRD_DOWNFLAP_PATH,
                RESOURCE_BLUEBIRD_MIDFLAP_PATH,
                RESOURCE_BLUEBIRD_UPFLAP_PATH
            );

        this.pipeSpawner =
            new PipeSpawner(
                RESOURCE_PIPE_GREEN_PATH
            );

        this.pipeSpawner.scoreListener =
            () => this.onScore();

        this.messageImage = new Image();
        this.messageImage.src =
            RESOURCE_MESSAGE_PATH;

        this.gameOverImage = new Image();
        this.gameOverImage.src =
            RESOURCE_GAMEOVER_PATH;

        this.gameLoop =
            this.gameLoop.bind(this);

        this.restartButton.hidden = true;
    }

    gameLoop(currentTime: number): void {
        if (
            currentTime - this.previousTime >=
            FRAME_TIME
        ) {
            this.previousTime = currentTime;

            this.update();
            this.draw();
        }

        requestAnimationFrame(
            this.gameLoop
        );
    }

    update(): void {
        this.background.update(this.canvas);
        this.base.update(this.canvas);
        this.pipeSpawner.update(this.canvas);
        this.player.update(this.canvas);

        if (!this.gameOver) {
            if (this.hasCollision()) {
                this.onGameOver();
            }
        }
    }

    draw(): void {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.background.draw(
            this.canvas,
            this.ctx
        );

        this.pipeSpawner.draw(
            this.canvas,
            this.ctx
        );

        this.base.draw(
            this.canvas,
            this.ctx
        );

        this.player.draw(
            this.canvas,
            this.ctx
        );

        if (this.gameOver) {
            this.drawGameOver(
                this.canvas,
                this.ctx
            );
        } else if (this.gameStarted) {
            this.drawScore(
                this.canvas,
                this.ctx
            );
        } else {
            this.drawMessage(
                this.canvas,
                this.ctx
            );
        }
    }

    onFlapAction(): void {
        if (!this.gameOver) {
            if (!this.gameStarted) {
                this.gameStarted = true;
                this.onStart();
            }

            this.onFlap();
        }
    }

    onFlap(): void {
        this.player.onFlap();
    }

    onStart(): void {
        this.score = 0;

        this.base.onStart();
        this.player.onStart();
        this.pipeSpawner.onStart();
    }

    onScore(): void {
        this.score++;
    }

    onGameOver(): void {
        this.gameOver = true;
        this.gameStarted = false;

        if (this.score > this.highScore) {
            this.highScore = this.score;
        }

        this.player.onGameOver();
        this.pipeSpawner.onGameOver();
        this.base.onGameOver();

        this.restartButton.hidden = false;
    }

    onRestart(): void {
        this.gameOver = false;
        this.gameStarted = false;

        this.restartButton.hidden = true;

        this.player.onRestart();
        this.pipeSpawner.onRestart();
    }

    hasCollision(): boolean {
        const birdRect =
            this.player.getRect();

        const baseRect =
            this.base.getRect();

        if (
            birdRect.intersects(baseRect)
        ) {
            return true;
        }

        return this.pipeSpawner.pipes.some(
            pipe =>
                birdRect.intersects(
                    pipe.getRect()
                )
        );
    }

    drawScore(
        _canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ): void {
        ctx.font = '48px "FlappyFont"';
        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        ctx.strokeText(
            this.score.toString(),
            50,
            75
        );

        ctx.fillText(
            this.score.toString(),
            50,
            75
        );
    }

    drawMessage(
        _canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ): void {
        const x =
            (CANVAS_WIDTH -
                RESOURCE_MESSAGE_WIDTH) / 2;

        const y =
            (CANVAS_HEIGHT -
                RESOURCE_MESSAGE_HEIGHT) / 2;

        ctx.drawImage(
            this.messageImage,
            x,
            y,
            RESOURCE_MESSAGE_WIDTH,
            RESOURCE_MESSAGE_HEIGHT
        );
    }

    drawGameOver(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ): void {
        const imageX =
            (CANVAS_WIDTH -
                RESOURCE_GAMEOVER_WIDTH) / 2;

        const imageY =
            CANVAS_HEIGHT * 0.2;

        ctx.drawImage(
            this.gameOverImage,
            imageX,
            imageY,
            RESOURCE_GAMEOVER_WIDTH,
            RESOURCE_GAMEOVER_HEIGHT
        );

        ctx.font = '32px "FlappyFont"';
        ctx.textAlign = "center";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";

        ctx.strokeText(
            `SCORE: ${this.score}`,
            canvas.width / 2,
            imageY + 100
        );

        ctx.fillText(
            `SCORE: ${this.score}`,
            canvas.width / 2,
            imageY + 100
        );

        ctx.strokeText(
            `BEST: ${this.highScore}`,
            canvas.width / 2,
            imageY + 150
        );

        ctx.fillText(
            `BEST: ${this.highScore}`,
            canvas.width / 2,
            imageY + 150
        );
    }
}