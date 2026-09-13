package FlappyBird;

import java.awt.*;
import javax.swing.*;

public class Base {
	private ImageIcon baseImgIcon;
	private Image baseImg;
	private Image baseImgScaled;
	
	private int imageWidth;
	private int imageHeight;
	
	private int boardWidth;
	private int boardHeight;
	
	private int tileWidth;
	private int tileHeight;

	private int offsetLeft = 0;
	
	private boolean started = false;
	
	public Base() {
		baseImgIcon = new ImageIcon(getClass().getResource(Settings.RESOURCE_BASE_PATH));
		baseImg = baseImgIcon.getImage();
		
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
		
		baseImgScaled = baseImg.getScaledInstance(tileWidth, tileHeight, tileWidth);
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

	public void onGameOver() {
		started = false;
	}

	public int getTop() {
		return boardHeight - tileHeight;
	}
}
