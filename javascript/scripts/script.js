// Game variables
const CANVAS_WIDTH = 910;
const CANVAS_HEIGHT = 512;
const GAME_FPS = 30;
const FRAME_TIME = 1000 / GAME_FPS; // 33.33 ms

const BIRD_START_POS = {
    x: 200,
    y: 300
};

const BIRD_FLAP_VELOCITY = -7;
const BIRD_ACCELERATION = 0.5;
const BIRD_ANGULAR_SPEED = 4;
const BIRD_MAX_VELOCITY = 18;

const BASE_SCROLL_SPEED = 2;

// Resource paths
const RESOURCE_SPRITES_PATH = "assets/sprites";

const RESOURCE_BACKGROUND_WIDTH = 288;
const RESOURCE_BACKGROUND_HEIGHT = 512;
const RESOURCE_BACKGROUND_WIDTH_HEIGHT_RATIO =
            RESOURCE_BACKGROUND_WIDTH / RESOURCE_BACKGROUND_HEIGHT;
const RESOURCE_BACKGROUND_DAY_PATH =
    `${RESOURCE_SPRITES_PATH}/background-day.png`;

const RESOURCE_BIRD_WIDTH = 34;
const RESOURCE_BIRD_HEIGHT = 24;

const RESOURCE_BLUEBIRD_DOWNFLAP_PATH =
    `${RESOURCE_SPRITES_PATH}/bluebird-downflap.png`;

const RESOURCE_BLUEBIRD_MIDFLAP_PATH =
    `${RESOURCE_SPRITES_PATH}/bluebird-midflap.png`;

const RESOURCE_BLUEBIRD_UPFLAP_PATH =
    `${RESOURCE_SPRITES_PATH}/bluebird-upflap.png`;

const RESOURCE_BASE_WIDTH = 336;
const RESOURCE_BASE_HEIGHT = 112;
const RESOURCE_BASE_PATH =
    `${RESOURCE_SPRITES_PATH}/base.png`;

const BASE_TO_BACKGROUND_HEIGHT_RATIO =
    RESOURCE_BASE_HEIGHT / RESOURCE_BACKGROUND_HEIGHT;

const BASE_ASPECT_RATIO =
    RESOURCE_BASE_WIDTH / RESOURCE_BASE_HEIGHT;

const RESOURCE_PIPE_WIDTH = 52;
const RESOURCE_PIPE_HEIGHT = 320;
const RESOURCE_PIPE_GREEN_PATH =
    `${RESOURCE_SPRITES_PATH}/pipe-green.png`;

const RESOURCE_FONT_PATH =
    "assets/font/04B_19__.TTF";

// Pipe spawner
const PIPE_SPAWNER_POS_X = 950;
const PIPE_SPAWNER_TIMEOUT = 180;

const PIPE_SPAWNER_POSY_RAND_RANGE_MIN =
    -RESOURCE_PIPE_HEIGHT + 25;

const PIPE_SPAWNER_POSY_RAND_RANGE_MAX =
    -RESOURCE_PIPE_HEIGHT + 275;

const PIPE_SPAWNER_POSY_GAP = 100;

// Message sprite
const RESOURCE_MESSAGE_WIDTH = 184;
const RESOURCE_MESSAGE_HEIGHT = 267;
const RESOURCE_MESSAGE_PATH =
    `${RESOURCE_SPRITES_PATH}/message.png`;

// Game over sprite
const RESOURCE_GAMEOVER_WIDTH = 192;
const RESOURCE_GAMEOVER_HEIGHT = 42;
const RESOURCE_GAMEOVER_PATH =
    `${RESOURCE_SPRITES_PATH}/gameover.png`;

class Background {
    constructor(imagePath) {
        this.image = new Image();
        this.image.src = imagePath;

        this.tileWidth = Math.floor(
            CANVAS_HEIGHT * RESOURCE_BACKGROUND_WIDTH_HEIGHT_RATIO
        );
        this.tileHeight = CANVAS_HEIGHT;

        this.numTiles =
            Math.floor(CANVAS_WIDTH / this.tileWidth) + 1;
    }

    update(canvas) {
    }

    draw(canvas, ctx) {
        for (let tileIdx = 0; tileIdx < this.numTiles; tileIdx++) {
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

class Base {
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
}

class Player {
    constructor(imageDownflapPath, imageMidflapPath, imageUpflapPath) {
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

        this.rect = {
            centerX: BIRD_START_POS.x,
            centerY: BIRD_START_POS.y,
            width: RESOURCE_BIRD_WIDTH,
            height: RESOURCE_BIRD_HEIGHT
        };

        this.imageAnimationIndex = 0;
        this.isStarted = false;
        this.velocity = 0.0;

        this.maxCenterY =
            CANVAS_HEIGHT - RESOURCE_BIRD_HEIGHT;
    }

    update(canvas) {
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

    move() {
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

    draw(canvas, ctx) {
        const angle =
            this.velocity * BIRD_ANGULAR_SPEED *
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

    onFlap() {
        this.velocity = BIRD_FLAP_VELOCITY;
    }

    onStart() {
        this.isStarted = true;
        this.velocity = 0.0;
    }

    onGameOver() {
        this.isStarted = false;
        this.velocity = 0.0;
    }
}

class Pipe {
    constructor(x, y, pipeImgBottom, isTop = false) {
        this.pipeImgBottom = pipeImgBottom;

        this.rect = {
            x: x,
            y: y,
            width: RESOURCE_PIPE_WIDTH,
            height: RESOURCE_PIPE_HEIGHT
        };

        this.isTop = isTop;

        // Score system
        this.birdEnter = false;
        this.birdExit = false;
        this.birdPassed = false;

        this.scoreListener = null;
        this.isAlive = true;
    }

    update(canvas) {
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

    draw(canvas, ctx) {
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
}

class PipeSpawner {
    constructor(imagePipePath) {
        this.pipeImgBottom = new Image();
        this.pipeImgBottom.src = imagePipePath;

        this.pipes = [];

        this.isStarted = false;
        this.pipeTimer = 0;

        this.scoreListener = null;
    }

    update(ctx) {
        // Spawn pipes
        if (this.isStarted) {
            if (this.pipeTimer <= 0) {

                const yTop =
                    Math.floor(
                        Math.random() *
                        (
                            PIPE_SPAWNER_POSY_RAND_RANGE_MAX -
                            PIPE_SPAWNER_POSY_RAND_RANGE_MIN + 1
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
                    this.pipeImgBottom,
                    false
                );

                pipeBottom.scoreListener =
                    this.scoreListener;

                this.pipes.push(pipeTop);
                this.pipes.push(pipeBottom);

                this.pipeTimer = PIPE_SPAWNER_TIMEOUT;
            }

            this.pipeTimer--;
        }

        // Update pipes
        if (this.isStarted) {
            this.pipes.forEach(pipe => pipe.update(ctx));

            this.pipes =
                this.pipes.filter(pipe => pipe.isAlive);
        }
    }

    draw(canvas, ctx) {
        this.pipes.forEach(pipe => {
            pipe.draw(canvas, ctx);
        });
    }

    onStart() {
        this.isStarted = true;
    }

    onGameOver() {
        this.isStarted = false;
    }

    clear() {
        this.pipes = [];
        this.pipeTimer = 0;
    }
}

class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        // Game State
        this.gameStarted = false;
        this.gameOver = false;
        this.score = 0;
        this.high_score = 0;

        // Instantiate inner classes:
        this.background = new Background(RESOURCE_BACKGROUND_DAY_PATH);
        this.base = new Base(RESOURCE_BASE_PATH);
        this.player = new Player(
            RESOURCE_BLUEBIRD_DOWNFLAP_PATH,
            RESOURCE_BLUEBIRD_MIDFLAP_PATH,
            RESOURCE_BLUEBIRD_UPFLAP_PATH
        );
        this.pipeSpawner = new PipeSpawner(RESOURCE_PIPE_GREEN_PATH);

        this.pipeSpawner.scoreListener = () => {
            this.onScore();
        };

        // Game loop timer:
        this.previousTime = 0;
        this.gameLoop = this.gameLoop.bind(this);
    }

    gameLoop(currentTime) {
        if (currentTime - this.previousTime >= FRAME_TIME) {
            this.previousTime = currentTime;

            this.update();
            this.draw();
        }

        requestAnimationFrame(this.gameLoop);
    }

    update(){
        this.background.update(this.canvas)
        this.base.update(this.canvas)
        this.pipeSpawner.update(this.canvas)
        this.player.update(this.canvas)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.draw(this.canvas, this.ctx);
        this.pipeSpawner.draw(this.canvas, this.ctx);
        this.base.draw(this.canvas, this.ctx);
        this.player.draw(this.canvas, this.ctx);
    }

    onFlapAction(){
        if(this.gameOver == false){
            if(this.gameStarted == false){
                this.gameStarted = true;
                this.onStart();
            }
            this.onFlap();
        }
    }

    onFlap(){
        console.log("Flap");
        this.player.onFlap();
    }

    onStart(){
        console.log("Game started");
        this.base.onStart();
        this.player.onStart();
        this.pipeSpawner.onStart();
    }

    onScore(){
        this.score++;
        console.log(`Score: ${this.score}`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello, Flappy Bird!");

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let game = new Game(canvas, ctx);

    let spacePressed = false;

    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" && !spacePressed) {
            spacePressed = true;
            game.onFlap();
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.code === "Space") {
            spacePressed = false;
        }
    });

    canvas.addEventListener("mousedown", (event) => {
        if (event.button === 0) { // left mouse button
            game.onFlapAction();
        }
    });
    // Start game loop:
    requestAnimationFrame((time) => game.gameLoop(time));
});