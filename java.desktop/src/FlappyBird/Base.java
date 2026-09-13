package FlappyBird;

import java.awt.*;
import javax.swing.*;
import java.awt.image.BufferedImage;

public class Base {
	private BufferedImage baseImg;
	private BufferedImage baseImgScaled;
	
	private int imageWidth;
	private int imageHeight;
	
	private int boardWidth;
	private int boardHeight;
	
	private int tileWidth;
	private int tileHeight;

	private int offsetLeft = 0;
	
	private boolean started = false;
	
	public Base() {
		baseImg = ResourceLoader.loadImage(Settings.RESOURCE_BASE_PATH);
		
		imageWidth = baseImg.getWidth(null);
		imageHeight = baseImg.getHeight(null);
		float baseAspectRatio =
				(float)imageWidth /
				(float)imageHeight;
		
		boardWidth = Settings.WINDOW_WIDTH;
		boardHeight = Settings.WINDOW_HEIGHT;
		
		tileHeight =
				(int)((float)boardHeight *
						Settings.baseToBackgroundHeightRatio);

		tileWidth =
				(int)(tileHeight *
				baseAspectRatio);
		
		baseImgScaled = ResourceLoader.scaleImage(baseImg, tileWidth, tileHeight);
	}
	
	public void update() {
		if (started){
			offsetLeft += Settings.BASE_SCROLL_SPEED;
		
			if (offsetLeft >= tileWidth) {
				offsetLeft = 0;
			}
		}
	}
	
	public void draw(Graphics g) {
		int yOffset = boardHeight - tileHeight;
		int tileCount = ((offsetLeft + boardWidth) / tileWidth) + 1;

		for (int i = 0; i < tileCount; i++) {
			int x = i * tileWidth - offsetLeft;
			g.drawImage(baseImgScaled, x, yOffset, null);
		}
	}
	
	public void onStart() {
		offsetLeft = 0;
		started = true;
	}
	
	public void onRestart() {
		offsetLeft = 0;
		started = false;
	}

	public void onGameOver() {
		started = false;
	}

	public int getTop() {
		return boardHeight - tileHeight;
	}
	
	public Rectangle getRectangle() {
		return new Rectangle(
				0,
				getTop(),
				Settings.WINDOW_WIDTH,
				tileHeight
		);
	}
}
