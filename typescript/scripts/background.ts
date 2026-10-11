import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    RESOURCE_BACKGROUND_WIDTH_HEIGHT_RATIO
} from "./settings.js";

export class Background {
    image: HTMLImageElement;
    tileWidth: number;
    tileHeight: number;
    numTiles: number;

    constructor(imagePath: string) {
        this.image = new Image();
        this.image.src = imagePath;

        this.tileWidth = Math.floor(
            CANVAS_HEIGHT *
            RESOURCE_BACKGROUND_WIDTH_HEIGHT_RATIO
        );

        this.tileHeight = CANVAS_HEIGHT;

        this.numTiles =
            Math.floor(CANVAS_WIDTH / this.tileWidth) + 1;
    }

    update(_canvas: HTMLCanvasElement): void {
    }

    draw(
        _canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ): void {
        for (
            let tileIdx = 0;
            tileIdx < this.numTiles;
            tileIdx++
        ) {
            ctx.drawImage(
                this.image,
                tileIdx * this.tileWidth,
                0,
                this.tileWidth,
                this.tileHeight
            );
        }
    }
}