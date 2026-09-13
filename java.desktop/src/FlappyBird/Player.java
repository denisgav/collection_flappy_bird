package FlappyBird;

import java.awt.*;
import javax.swing.*;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;

public class Player
{
	private BufferedImage birdImages[];
	private BufferedImage currentImage;

	private float centerX;
	private float centerY;

	private int animationIndex = 0;

	private boolean started = false;

	private float velocity = 0.0f;

	private final int maxCenterY;
	
	private AffineTransform transform;

	public Player() {
		birdImages = new BufferedImage[] {
				ResourceLoader.loadImage(Settings.RESOURCE_BLUEBIRD_DOWNFLAP_PATH),
				ResourceLoader.loadImage(Settings.RESOURCE_BLUEBIRD_MIDFLAP_PATH),
				ResourceLoader.loadImage(Settings.RESOURCE_BLUEBIRD_UPFLAP_PATH)
		};
		
		currentImage = birdImages[0];

		centerX = Settings.BIRD_START_X;
		centerY = Settings.BIRD_START_Y;
		
		maxCenterY =
				Settings.WINDOW_HEIGHT -
				Settings.RESOURCE_BIRD_HEIGHT;
		
		transform = new AffineTransform();
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
		
		double angle = Math.toRadians(
				velocity * Settings.BIRD_ANGULAR_SPEED);

		int width = Settings.RESOURCE_BIRD_WIDTH;
		int height = Settings.RESOURCE_BIRD_HEIGHT;

		transform.setToIdentity();

		transform.translate(
				centerX - width / 2.0,
				centerY - height / 2.0
		);

		transform.rotate(
				angle,
				width / 2.0,
				height / 2.0
		);
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