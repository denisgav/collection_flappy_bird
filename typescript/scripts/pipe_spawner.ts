import {
    PIPE_SPAWNER_POSY_RAND_RANGE_MAX,
    PIPE_SPAWNER_POSY_RAND_RANGE_MIN,
    PIPE_SPAWNER_POS_X,
    PIPE_SPAWNER_POSY_GAP,
    PIPE_SPAWNER_TIMEOUT,
    RESOURCE_PIPE_HEIGHT
} from "./settings.js";

import { Pipe } from "./pipe.js";

export class PipeSpawner {
    pipeImgBottom: HTMLImageElement;
    pipes: Pipe[] = [];

    isStarted = false;
    pipeTimer = 0;

    scoreListener: (() => void) | null = null;

    constructor(imagePipePath: string) {
        this.pipeImgBottom = new Image();
        this.pipeImgBottom.src = imagePipePath;
    }

    update(canvas: HTMLCanvasElement): void {
        if (this.isStarted) {
            if (this.pipeTimer <= 0) {
                const yTop =
                    Math.floor(
                        Math.random() *
                            (
                                PIPE_SPAWNER_POSY_RAND_RANGE_MAX -
                                PIPE_SPAWNER_POSY_RAND_RANGE_MIN +
                                1
                            )
                    ) +
                    PIPE_SPAWNER_POSY_RAND_RANGE_MIN;

                const yBottom =
                    yTop +
                    PIPE_SPAWNER_POSY_GAP +
                    RESOURCE_PIPE_HEIGHT;

                const pipeTop = new Pipe(
                    PIPE_SPAWNER_POS_X,
                    yTop,
                    this.pipeImgBottom,
                    true
                );

                const pipeBottom = new Pipe(
                    PIPE_SPAWNER_POS_X,
                    yBottom,
                    this.pipeImgBottom
                );

                pipeBottom.scoreListener =
                    this.scoreListener;

                this.pipes.push(pipeTop);
                this.pipes.push(pipeBottom);

                this.pipeTimer = PIPE_SPAWNER_TIMEOUT;
            }

            this.pipeTimer--;
        }

        if (this.isStarted) {
            this.pipes.forEach(pipe =>
                pipe.update(canvas)
            );

            this.pipes =
                this.pipes.filter(
                    pipe => pipe.isAlive
                );
        }
    }

    draw(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ): void {
        this.pipes.forEach(pipe => {
            pipe.draw(canvas, ctx);
        });
    }

    onStart(): void {
        this.isStarted = true;
    }

    onGameOver(): void {
        this.isStarted = false;
    }

    onRestart(): void {
        this.pipes = [];
        this.pipeTimer = 0;
        this.isStarted = false;
    }
}