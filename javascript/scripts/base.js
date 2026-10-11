import { 
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    BASE_SCROLL_SPEED,
    BASE_ASPECT_RATIO,
    BASE_TO_BACKGROUND_HEIGHT_RATIO
 } from "./settings.js";

import { Rect } from "./rect.js";

export class Base {
    constructor(imagePath) {
        this.image = new Image();
        this.image.src = imagePath;

        this.tileHeight = Math.floor(
            CANVAS_HEIGHT * BASE_TO_BACKGROUND_HEIGHT_RATIO
        );

        this.tileWidth = Math.floor(
            this.tileHeight * BASE_ASPECT_RATIO
        );

        this.offsetLeft = 0;
        this.isStarted = false;

        this.rect = null;
    }

    update(canvas) {
        if (this.isStarted) {
            this.offsetLeft += BASE_SCROLL_SPEED;

            if (this.offsetLeft >= this.tileWidth) {
                this.offsetLeft = 0;
            }
        }
    }

    draw(canvas, ctx) {
        const yOffset = CANVAS_HEIGHT - this.tileHeight;

        const numTiles =
            Math.floor(
                (this.offsetLeft + CANVAS_WIDTH) /
                this.tileWidth
            ) + 1;

        for (let tileIdx = 0; tileIdx < numTiles; tileIdx++) {
            ctx.drawImage(
                this.image,
                tileIdx * this.tileWidth - this.offsetLeft,
                yOffset,
                this.tileWidth,
                this.tileHeight
            );
        }
    }

    onStart() {
        this.offsetLeft = 0;
        this.isStarted = true;
    }

    onGameOver() {
        this.isStarted = false;
    }

    getRect() {
        const yOffset = CANVAS_HEIGHT - this.tileHeight;
        return new Rect(
            0,
            yOffset,
            CANVAS_WIDTH, 
            this.tileHeight
        );
    }
}