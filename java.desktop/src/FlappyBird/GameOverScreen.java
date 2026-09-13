package FlappyBird;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

import javax.swing.JButton;
import javax.swing.JFrame;

public class GameOverScreen {
	private final Font font;
	private JFrame frame;

	private final BufferedImage image;

	private Integer score;

	private Integer highScore;

	JButton restartButton;

	private int screenWidth;
	private int screenHeight;

	public GameOverScreen(JFrame frame, Font font) {
		this.font = font;
		this.frame = frame;

		image = ResourceLoader.loadImage(Settings.RESOURCE_GAMEOVER_PATH);

		restartButton = new JButton("Restart");
		restartButton.addActionListener(e -> restartGame());
		frame.add(restartButton);
		restartButton.setVisible(false);

		screenWidth = Settings.WINDOW_WIDTH;
		screenHeight = Settings.WINDOW_HEIGHT;
	}

	public void setScore(int score, int highScore) {
		this.score = score;
		this.highScore = highScore;
	}
	
	public void restartGame() {
		
	}

	public void draw(Graphics g) {
		int posX = (screenWidth - image.getWidth()) / 2;

		int posY = (screenHeight - image.getHeight() * 4) / 2;

		//
		// Game over image
		//
		g.drawImage(image, posX, posY, null);

		//
		// Score
		//
		g.setFont(font);
		g.setColor(Color.WHITE);

		posY += image.getHeight();

		g.drawString("SCORE: " + score, posX, posY);

		//
		// High score
		//
		posY += image.getHeight();

		g.drawString("BEST: " + highScore, posX, posY);

		//
		// Recalculate button position
		// when window changes size
		//
		posY += image.getHeight();

		//button.setBounds(posX, posY, image.getWidth(), image.getHeight());

		//button.draw(g);
	}
}
