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

import { Rect } from "./rect.js";
import { Background } from "./background.js";
import { Base } from "./base.js";
import { Player } from "./player.js";
import { Pipe } from "./pipe.js";
import { PipeSpawner } from "./pipe_spawner.js";


export class Game {
    constructor(canvas, ctx, restartButton) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.restartButton = restartButton;

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

        this.messageImage = new Image();
        this.messageImage.src = RESOURCE_MESSAGE_PATH;

        this.gameOverImage = new Image();
        this.gameOverImage.src = RESOURCE_GAMEOVER_PATH;

        // Game loop timer:
        this.previousTime = 0;
        this.gameLoop = this.gameLoop.bind(this);

        this.restartButton.hidden = true;
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

        if(this.gameOver == false){
            let collision = this.hasCollision();
            if(collision){
                this.onGameOver();
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.draw(this.canvas, this.ctx);
        this.pipeSpawner.draw(this.canvas, this.ctx);
        this.base.draw(this.canvas, this.ctx);
        this.player.draw(this.canvas, this.ctx);

        if(this.gameOver == true){
            this.drawGameOver(this.canvas, this.ctx);
        } else {
            if(this.gameStarted == true){
                this.drawScore(this.canvas, this.ctx);
            } else {
                this.drawMessage(this.canvas, this.ctx);
            }
        }
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
        this.score = 0;
        this.base.onStart();
        this.player.onStart();
        this.pipeSpawner.onStart();
    }

    onScore(){
        this.score++;
        console.log(`Score: ${this.score}`);
    }

    onGameOver(){
        console.log("Game over");
        this.gameOver = true;
        this.gameStarted = false;

        if(this.score > this.high_score){
            this.high_score = this.score;
        }

        this.player.onGameOver();
        this.pipeSpawner.onGameOver();
        this.base.onGameOver();

        this.restartButton.hidden = false;
    }

    onRestart(){
        console.log("Game restart");
        this.gameOver = false;
        this.gameStarted = false;

        this.restartButton.hidden = true;

        this.player.onRestart();
        this.pipeSpawner.onRestart();
    }

    hasCollision(){
        let birdRect = this.player.getRect();
        let baseRect = this.base.getRect();

        if(birdRect.intersects(baseRect)){
            return true;
        }

        let hasPipeCollision = false;
        this.pipeSpawner.pipes.forEach(pipe => {
            let pipeRect = pipe.getRect();
            if(birdRect.intersects(pipeRect)){
                hasPipeCollision = true;
            }
        });

        return hasPipeCollision;
    }

    drawScore(canvas, ctx) {
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

    drawMessage(canvas, ctx) {
        const x =
            (CANVAS_WIDTH - RESOURCE_MESSAGE_WIDTH) / 2;

        const y =
            (CANVAS_HEIGHT - RESOURCE_MESSAGE_HEIGHT) / 2;

        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";

        ctx.drawImage(
            this.messageImage,
            x,
            y,
            RESOURCE_MESSAGE_WIDTH,
            RESOURCE_MESSAGE_HEIGHT
        );
    }

    drawGameOver(canvas, ctx) {
        // Game Over image
        const imageX =
            (CANVAS_WIDTH - RESOURCE_GAMEOVER_WIDTH) / 2;

        const imageY =
            CANVAS_HEIGHT * 0.2;

        ctx.drawImage(
            this.gameOverImage,
            imageX,
            imageY,
            RESOURCE_GAMEOVER_WIDTH,
            RESOURCE_GAMEOVER_HEIGHT
        );

        // Score text
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

        // High score text
        ctx.strokeText(
            `BEST: ${this.high_score}`,
            canvas.width / 2,
            imageY + 150
        );

        ctx.fillText(
            `BEST: ${this.high_score}`,
            canvas.width / 2,
            imageY + 150
        );
    }
}