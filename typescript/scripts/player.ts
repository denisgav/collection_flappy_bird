import {
    BIRD_START_POS,
    RESOURCE_BIRD_WIDTH,
    RESOURCE_BIRD_HEIGHT,
    BIRD_ACCELERATION,
    BIRD_MAX_VELOCITY,
    BIRD_ANGULAR_SPEED,
    BIRD_FLAP_VELOCITY,
    CANVAS_HEIGHT
} from "./settings.js";

import { Rect } from "./rect.js";

export class Player {
    birdImageDownflap: HTMLImageElement;
    birdImageMidflap: HTMLImageElement;
    birdImageUpflap: HTMLImageElement;

    birdImages: HTMLImageElement[];
    image: HTMLImageElement;

    rect: Rect;

    imageAnimationIndex: number;
    isStarted: boolean;

    velocity: number;
    maxCenterY: number;

    constructor(
        imageDownflapPath: string,
        imageMidflapPath: string,
        imageUpflapPath: string
    ) {
        this.birdImageDownflap = new Image();
        this.birdImageDownflap.src = imageDownflapPath;

        this.birdImageMidflap = new Image();
        this.birdImageMidflap.src = imageMidflapPath;

        this.birdImageUpflap = new Image();
        this.birdImageUpflap.src = imageUpflapPath;

        this.birdImages = [
            this.birdImageDownflap,
            this.birdImageMidflap,
            this.birdImageUpflap
        ];

        this.image = this.birdImages[0];

        this.rect = new Rect(
            BIRD_START_POS.x - RESOURCE_BIRD_WIDTH / 2,
            BIRD_START_POS.y - RESOURCE_BIRD_HEIGHT / 2,
            RESOURCE_BIRD_WIDTH,
            RESOURCE_BIRD_HEIGHT
        );

        this.imageAnimationIndex = 0;
        this.isStarted = false;
        this.velocity = 0.0;

        this.maxCenterY =
            CANVAS_HEIGHT - RESOURCE_BIRD_HEIGHT;
    }

    update(_canvas: HTMLCanvasElement): void {
        // Animate bird
        this.imageAnimationIndex++;

        if (this.imageAnimationIndex >= 20) {
            this.imageAnimationIndex = 0;
        }

        const animationIndex =
            Math.floor(this.imageAnimationIndex / 5);

        if ([0, 1, 2].includes(animationIndex)) {
            this.image = this.birdImages[animationIndex];
        } else {
            this.image = this.birdImages[1];
        }

        if (this.isStarted) {
            this.move();
        }
    }

    private move(): void {
        this.velocity += BIRD_ACCELERATION;

        if (this.velocity >= BIRD_MAX_VELOCITY) {
            this.velocity = BIRD_MAX_VELOCITY;
        }

        this.rect.centerY += this.velocity;

        if (this.rect.centerY <= 0) {
            this.rect.centerY = 0;
        }

        if (this.rect.centerY >= this.maxCenterY) {
            this.rect.centerY = this.maxCenterY;
        }
    }

    draw(
        _canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ): void {
        const angle =
            this.velocity *
            BIRD_ANGULAR_SPEED *
            (Math.PI / 180);

        ctx.save();

        ctx.translate(
            this.rect.centerX,
            this.rect.centerY
        );

        ctx.rotate(angle);

        ctx.drawImage(
            this.image,
            -this.rect.width / 2,
            -this.rect.height / 2,
            this.rect.width,
            this.rect.height
        );

        ctx.restore();
    }

    onFlap(): void {
        this.velocity = BIRD_FLAP_VELOCITY;
    }

    onStart(): void {
        this.isStarted = true;
        this.velocity = 0.0;
    }

    onGameOver(): void {
        this.isStarted = false;
        this.velocity = 0.0;
    }

    onRestart(): void {
        this.isStarted = false;
        this.velocity = 0.0;
        this.imageAnimationIndex = 0;

        this.rect.centerY = BIRD_START_POS.y;
        this.rect.centerX = BIRD_START_POS.x;
    }

    getRect(): Rect {
        return this.rect;
    }
}