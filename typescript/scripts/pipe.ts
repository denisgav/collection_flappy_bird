import {
    BIRD_START_POS,
    RESOURCE_PIPE_WIDTH,
    RESOURCE_PIPE_HEIGHT,
    BASE_SCROLL_SPEED
} from "./settings.js";

import { Rect } from "./rect.js";

export class Pipe {
    pipeImgBottom: HTMLImageElement;
    rect: Rect;
    isTop: boolean;

    birdEnter = false;
    birdExit = false;
    birdPassed = false;

    scoreListener: (() => void) | null = null;
    isAlive = true;

    constructor(
        x: number,
        y: number,
        pipeImgBottom: HTMLImageElement,
        isTop = false
    ) {
        this.pipeImgBottom = pipeImgBottom;

        this.rect = new Rect(
            x,
            y,
            RESOURCE_PIPE_WIDTH,
            RESOURCE_PIPE_HEIGHT
        );

        this.isTop = isTop;
    }

    update(_canvas: HTMLCanvasElement): void {
        this.rect.x -= BASE_SCROLL_SPEED;

        if (this.rect.x < -RESOURCE_PIPE_WIDTH) {
            this.isAlive = false;
        }

        if (this.scoreListener && !this.isTop) {
            if (
                BIRD_START_POS.x > this.rect.x &&
                !this.birdPassed
            ) {
                this.birdEnter = true;
            }

            if (
                BIRD_START_POS.x >
                    this.rect.x + this.rect.width &&
                !this.birdPassed
            ) {
                this.birdExit = true;
            }

            if (
                this.birdEnter &&
                this.birdExit &&
                !this.birdPassed
            ) {
                this.birdPassed = true;
                this.scoreListener();
            }
        }
    }

    draw(
        _canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ): void {
        if (this.isTop) {
            ctx.save();

            ctx.translate(
                this.rect.x + this.rect.width / 2,
                this.rect.y + this.rect.height / 2
            );

            ctx.scale(1, -1);

            ctx.drawImage(
                this.pipeImgBottom,
                -this.rect.width / 2,
                -this.rect.height / 2,
                this.rect.width,
                this.rect.height
            );

            ctx.restore();
        } else {
            ctx.drawImage(
                this.pipeImgBottom,
                this.rect.x,
                this.rect.y,
                this.rect.width,
                this.rect.height
            );
        }
    }

    getRect(): Rect {
        return this.rect
    }
}