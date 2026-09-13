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
	
	private IRestartListener restartListener;

	public GameOverScreen(JFrame frame, Font font) {
		this.font = font;
		this.frame = frame;
		
		screenWidth = Settings.WINDOW_WIDTH;
		screenHeight = Settings.WINDOW_HEIGHT;

		image = ResourceLoader.loadImage(Settings.RESOURCE_GAMEOVER_PATH);

		restartButton = new JButton("Restart");
		restartButton.addActionListener(e -> restartGame());
		frame.add(restartButton);
		restartButton.setVisible(false);
		
		int posX = (screenWidth - image.getWidth()) / 2;
		int posY = (screenHeight - image.getHeight() * 4) / 2;
		posY += image.getHeight()*3;
		restartButton.setBounds(
				posX,
				posY,
				image.getWidth(),
				image.getHeight());
	}
	
	public void setRestartListener(IRestartListener restartListener) {
		this.restartListener = restartListener;
	}

	public void setScore(int score, int highScore) {
		this.score = score;
		this.highScore = highScore;
	}
	
	public void restartGame() {
		restartListener.onRestart();
	}
	
	public void onShow() {
		restartButton.setVisible(true);
		restartButton.getParent().revalidate();
		restartButton.getParent().repaint();
	}
	
	public void onHide() {
		restartButton.setVisible(false);
		restartButton.getParent().revalidate();
		restartButton.getParent().repaint();
	}

	public void draw(Graphics g) {
		int posX = (screenWidth - image.getWidth()) / 2;
		int posY = (screenHeight - image.getHeight() * 4) / 2;
		
		g.setFont(font);
		g.setColor(Color.WHITE);

		//
		// Game over image
		//
		g.drawImage(image, posX, posY, null);
		
		posY += image.getHeight();

		//
		// Score
		//

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
