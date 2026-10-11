import { Game } from "./game.js";

async function loadFonts(): Promise<void> {
    const font = new FontFace(
        "FlappyFont",
        'url("assets/font/04B_19__.TTF")'
    );

    await font.load();

    document.fonts.add(font);

    console.log("Font loaded");
}

document.addEventListener(
    "DOMContentLoaded",
    async (): Promise<void> => {
        await loadFonts();

        console.log("Hello, Flappy Bird!");

        const canvas =
            document.getElementById(
                "gameCanvas"
            ) as HTMLCanvasElement;

        const ctx =
            canvas.getContext(
                "2d"
            ) as CanvasRenderingContext2D;

        const restartButton =
            document.getElementById(
                "restartButton"
            ) as HTMLButtonElement;

        const game = new Game(
            canvas,
            ctx,
            restartButton
        );

        let spacePressed = false;

        document.addEventListener(
            "keydown",
            (event: KeyboardEvent): void => {
                if (
                    event.code === "Space" &&
                    !spacePressed
                ) {
                    spacePressed = true;
                    game.onFlapAction();
                }
            }
        );

        document.addEventListener(
            "keyup",
            (event: KeyboardEvent): void => {
                if (event.code === "Space") {
                    spacePressed = false;
                }
            }
        );

        canvas.addEventListener(
            "mousedown",
            (event: MouseEvent): void => {
                if (event.button === 0) {
                    game.onFlapAction();
                }
            }
        );

        restartButton.addEventListener(
            "click",
            (): void => {
                game.onRestart();
            }
        );

        requestAnimationFrame(
            (time: number): void =>
                game.gameLoop(time)
        );
    }
);