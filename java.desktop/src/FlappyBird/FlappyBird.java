package FlappyBird;

import java.awt.event.*;
import java.awt.*;
import javax.swing.*;

public class FlappyBird extends JPanel {
	private static final long serialVersionUID = 1L;
	
	private Background background;
	private Base base;
	
	private Timer gameLoop;

    FlappyBird() {
    	setPreferredSize(new Dimension(Settings.WINDOW_WIDTH, Settings.WINDOW_HEIGHT));
    	setBackground(Color.blue);
    	
    	background = new Background();
    	base = new Base();
    	
    	//game timer
		gameLoop = new Timer(1000/Settings.WINDOW_FPS, new ActionListener() {
          @Override
          public void actionPerformed(ActionEvent e) {
        	  // Code to be executed
        	  onGameTick();
          }
		}); //how long it takes to start timer, milliseconds gone between frames 
        gameLoop.start();    	
	}
		
    public void paintComponent(Graphics g) {
		super.paintComponent(g);
		draw(g);
	}
    
    public void onGameTick() {
    	update();
    	repaint();
    }
    
    public void update() {
    	background.update();
    	base.update();
    }
    
    public void draw(Graphics g) {
    	background.draw(g);
    	base.draw(g);
    }
}