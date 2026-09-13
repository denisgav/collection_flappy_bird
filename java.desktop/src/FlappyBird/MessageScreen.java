package FlappyBird;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

public class MessageScreen {
	private final BufferedImage image;
	
	private int posX, posY;

	public MessageScreen() {
		image = ResourceLoader.loadImage(Settings.RESOURCE_MESSAGE_PATH);
		
		posX = (Settings.WINDOW_WIDTH  - image.getWidth())  / 2;
		posY = (Settings.WINDOW_HEIGHT - image.getHeight()) / 2;
	}

	public void draw(Graphics g) {
		g.drawImage(image, posX, posY, null);
	}
}