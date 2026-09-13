package FlappyBird;

import java.awt.*;
import javax.swing.*;

public class Background {
	private ImageIcon backgroundImgIcon;
	private Image backgroundImg;
	private Image backgroundImgScaled;
	
	private int imageWidth;
	private int imageHeight;
	
	private int boardWidth;
	private int boardHeight;
	
	private int tileHeight;
	private int tileWidth;
	
	public Background() {
		backgroundImgIcon = new ImageIcon(getClass().getResource(Settings.RESOURCE_BACGROUND_DAY_PATH));
		backgroundImg = backgroundImgIcon.getImage();
		
		imageWidth = backgroundImg.getWidth(null);
		imageHeight = backgroundImg.getHeight(null);
		
		boardWidth = Settings.WINDOW_WIDTH;
		boardHeight = Settings.WINDOW_HEIGHT;
		
		float m_WidthHeightRatio = (float)imageWidth/(float)imageHeight;
		
		tileHeight = boardHeight;
		tileWidth =
	            (int)((float)boardHeight * m_WidthHeightRatio);
		
		backgroundImgScaled = backgroundImg.getScaledInstance(tileWidth, tileHeight, tileWidth);
	}
	
	public void update() {
		
	}
	
	public void draw(Graphics g) {
		for (int x = 0; x < boardWidth + tileWidth; x += tileWidth) {
			g.drawImage(backgroundImgScaled, x, 0, this.tileWidth, this.tileHeight, null);
	    }		
	}
}