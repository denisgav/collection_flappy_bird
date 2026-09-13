package FlappyBird;

import java.awt.*;
import java.awt.image.BufferedImage;

import javax.swing.*;

public class Background {
	private BufferedImage backgroundImg;
	private BufferedImage backgroundImgScaled;
	
	private int imageWidth;
	private int imageHeight;
	
	private int boardWidth;
	private int boardHeight;
	
	private int tileHeight;
	private int tileWidth;
	
	public Background() {
		backgroundImg = ResourceLoader.loadImage(Settings.RESOURCE_BACGROUND_DAY_PATH);
		
		imageWidth = backgroundImg.getWidth(null);
		imageHeight = backgroundImg.getHeight(null);
		
		boardWidth = Settings.WINDOW_WIDTH;
		boardHeight = Settings.WINDOW_HEIGHT;
		
		float m_WidthHeightRatio = (float)imageWidth/(float)imageHeight;
		
		tileHeight = boardHeight;
		tileWidth =
	            (int)((float)boardHeight * m_WidthHeightRatio);
		
		backgroundImgScaled = ResourceLoader.scaleImage(backgroundImg, tileWidth, tileHeight);
	}
	
	public void update() {
		
	}
	
	public void draw(Graphics g) {
		for (int x = 0; x < boardWidth + tileWidth; x += tileWidth) {
			g.drawImage(backgroundImgScaled, x, 0, this.tileWidth, this.tileHeight, null);
	    }		
	}
}