import { Game } from "./game.js";


async function loadFonts() {
    const font = new FontFace(
        "FlappyFont",
        'url("assets/font/04B_19__.TTF")'
    );

    await font.load();
    document.fonts.add(font);

    console.log("Font loaded");
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadFonts();
    console.log("Hello, Flappy Bird!");

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const restartButton = document.getElementById("restartButton");

    let game = new Game(canvas, ctx, restartButton);

    let spacePressed = false;

    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" && !spacePressed) {
            spacePressed = true;
            game.onFlapAction();
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

    restartButton.addEventListener("click", () => {
        game.onRestart();
    });

    // Start game loop:
    requestAnimationFrame((time) => game.gameLoop(time));
});