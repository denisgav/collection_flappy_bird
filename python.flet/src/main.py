import flet as ft
import flet.canvas as cv

from settings import *

def main(page: ft.Page):

    page.title = WINDOW_CAPTION
    page.window.width = WINDOW_WIDTH
    page.window.height = WINDOW_HEIGHT

    canvas = cv.Canvas(
        [
            cv.Image(
                x=0,
                y=0,
                src=RESOURCE_BACGROUND_DAY_PATH,
                width=RESOURCE_BACGROUND_WIDTH,
                height=RESOURCE_BACGROUND_HEIGHT,
            )
        ],
        width=800,
        height=600,
    )

    page.add(canvas)


if __name__ == "__main__":
    ft.run(main)
