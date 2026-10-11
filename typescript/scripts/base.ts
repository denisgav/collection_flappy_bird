import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    BASE_SCROLL_SPEED,
    BASE_ASPECT_RATIO,
    BASE_TO_BACKGROUND_HEIGHT_RATIO
} from "./settings.js";

import { Rect } from "./rect.js";

export class Base {
    image: HTMLImageElement;

    tileWidth: number;
    tileHeight: number;

    offsetLeft: number;

    isStarted: boolean;

    rect: Rect | null;

    constructor(imagePath: string) {
        this.image = new Image();
        this.image.src = imagePath;

        this.tileHeight = Math.floor(
            CANVAS_HEIGHT *
            BASE_TO_BACKGROUND_HEIGHT_RATIO
        );

        this.tileWidth = Math.floor(
            this.tileHeight *
            BASE_ASPECT_RATIO
        );

        this.offsetLeft = 0;
        this.isStarted = false;

        this.rect = null;
    }

    update(_canvas: HTMLCanvasElement): void {
        if (this.isStarted) {
            this.offsetLeft += BASE_SCROLL_SPEED;

            if (this.offsetLeft >= this.tileWidth) {
                this.offsetLeft = 0;
            }
        }
    }

    draw(
        _canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ): void {
        const yOffset =
            CANVAS_HEIGHT - this.tileHeight;

        const numTiles =
            Math.floor(
                (this.offsetLeft + CANVAS_WIDTH) /
                this.tileWidth
            ) + 1;

        for (
            let tileIdx = 0;
            tileIdx < numTiles;
            tileIdx++
        ) {
            ctx.drawImage(
                this.image,
                tileIdx * this.tileWidth - this.offsetLeft,
                yOffset,
                this.tileWidth,
                this.tileHeight
            );
        }
    }

    onStart(): void {
        this.offsetLeft = 0;
        this.isStarted = true;
    }

    onGameOver(): void {
        this.isStarted = false;
    }

    getRect(): Rect {
        const yOffset =
            CANVAS_HEIGHT - this.tileHeight;

        return new Rect(
            0,
            yOffset,
            CANVAS_WIDTH,
            this.tileHeight
        );
    }
}