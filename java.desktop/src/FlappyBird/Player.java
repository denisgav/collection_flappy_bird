package FlappyBird;

import java.awt.*;
import javax.swing.*;
import java.awt.geom.AffineTransform;

public class Player
{
	private ImageIcon birdImageIcons[];
	private Image birdImages[];

	private Image currentImage;

	private float centerX;
	private float centerY;

	private int animationIndex = 0;

	private boolean started = false;

	private float velocity = 0.0f;

	private final int maxCenterY;

	public Player() {
		birdImageIcons = new ImageIcon[] {
				new ImageIcon(getClass().getResource(Settings.RESOURCE_BLUEBIRD_DOWNFLAP_PATH)),
				new ImageIcon(getClass().getResource(Settings.RESOURCE_BLUEBIRD_MIDFLAP_PATH)),
				new ImageIcon(getClass().getResource(Settings.RESOURCE_BLUEBIRD_UPFLAP_PATH))
		};
		
		birdImages = new Image[birdImageIcons.length];
		for(int i=0; i<birdImageIcons.length; i++) {
			birdImages[i] = birdImageIcons[i].getImage();
		}

		currentImage = birdImages[0];

		centerX = Settings.BIRD_START_X;
		centerY = Settings.BIRD_START_Y;
		
		maxCenterY =
				Settings.WINDOW_HEIGHT -
				Settings.RESOURCE_BIRD_HEIGHT;
	}

	public void update() {
		//
		// Animation
		//
		animationIndex++;
		
		if (animationIndex >= 20) {
			animationIndex = 0;
		}
		
		int frame = animationIndex / 5;
		
		if (frame >= 0 && frame <= 2) {
			currentImage = birdImages[frame];
		}
		else {
			currentImage = birdImages[1];
		}
		
		if (started){
			move();
		}
	}

	private void move() {
		velocity += Settings.BIRD_ACCELERATION;
	
		if (velocity > Settings.BIRD_MAX_VELOCITY) {
			velocity = Settings.BIRD_MAX_VELOCITY;
		}

		centerY += velocity;
		if (centerY < 0) {
			centerY = 0;
		}
	
		if (centerY > maxCenterY) {
			centerY = maxCenterY;
		}
	}

	public void draw(Graphics g) {
		double angle = Math.toRadians(
				velocity * Settings.BIRD_ANGULAR_SPEED);

		int width = Settings.RESOURCE_BIRD_WIDTH;
		int height = Settings.RESOURCE_BIRD_HEIGHT;

		AffineTransform transform = new AffineTransform();

		transform.translate(
				centerX - width / 2.0,
				centerY - height / 2.0
		);

		transform.rotate(
				angle,
				width / 2.0,
				height / 2.0
		);
		
		Graphics2D g2d = (Graphics2D) g;

		g2d.drawImage(currentImage, transform, null);
	}

	public void onFlap() {
		velocity = Settings.BIRD_FLAP_VELOCITY;
	}

	public void onStart() {
		started = true;
		velocity = 0.0f;
	}

	public void onGameOver() {
		started = false;
		velocity = 0.0f;
	}
	
	public void onRestart() {
		currentImage = birdImages[0];

		centerX = Settings.BIRD_START_X;
		centerY = Settings.BIRD_START_Y;
		
		animationIndex = 0;
		started = false;
		velocity = 0.0f;
	}

	public int getLeft() {
		return (int)(centerX - Settings.RESOURCE_BIRD_WIDTH / 2);
	}

	public int getTop() {
		return (int)(centerY - Settings.RESOURCE_BIRD_HEIGHT / 2);
	}

	public int getWidth() {
		return Settings.RESOURCE_BIRD_WIDTH;
	}

	public int getHeight() {
		return Settings.RESOURCE_BIRD_HEIGHT;
	}
}