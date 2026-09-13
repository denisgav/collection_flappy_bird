package FlappyBird;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

public class Pipe {
	private int x;
	private int y;
	private final BufferedImage image;
	private final boolean isTop;

	// Score system
	private boolean birdEnter = false;
	private boolean birdExit = false;
	private boolean birdPassed = false;
	
	private IScoreListener scoreListener;

	public Pipe(int x, int y, BufferedImage image, boolean isTop) {
		this.x = x;
		this.y = y;
		this.image = image;
		this.isTop = isTop;
	}

	public void update() {
		x -= Settings.BASE_SCROLL_SPEED;

		if (scoreListener != null && !isTop) {
			if (Settings.BIRD_START_X > getLeft() && !birdPassed) {
				birdEnter = true;
			}

			if (Settings.BIRD_START_X > getRight() && !birdPassed) {
				birdExit = true;
			}

			if (birdEnter && birdExit && !birdPassed) {
				birdPassed = true;
				scoreListener.onScore();
			}
		}
	}

	public void draw(Graphics g) {
		g.drawImage(image, x, y, null);
	}
	
	public boolean outOfWindow() {
		return x < -Settings.RESOURCE_PIPE_WIDTH;
	}

	public int getLeft() {
		return x;
	}

	public int getRight() {
		return x + image.getWidth();
	}

	public int getTop() {
		return y;
	}

	public int getBottom() {
		return y + image.getHeight();
	}

	public int getWidth() {
		return image.getWidth();
	}

	public int getHeight() {
		return image.getHeight();
	}

	public void setScoreListener(IScoreListener listener) {
		this.scoreListener = listener;
	}
}
