package FlappyBird;

import java.awt.event.*;
import java.awt.*;
import javax.swing.*;

public class FlappyBird extends JPanel {
	private static final long serialVersionUID = 1L;
	
	private Background background;
	private Base base;
	private Player player;
	
	private Timer gameLoop;
	
    private boolean is_started;
    private boolean is_died;
    private int score;
    private int high_score;

    FlappyBird() {
    	setPreferredSize(new Dimension(Settings.WINDOW_WIDTH, Settings.WINDOW_HEIGHT));
    	setFocusable(true);
    	setBackground(Color.blue);
    	
    	background = new Background();
    	base = new Base();
    	player = new Player();
    	
    	addMouseListener(new MouseAdapter() {
    		@Override
    		public void mousePressed(MouseEvent e) {
    			if (e.getButton() == MouseEvent.BUTTON1) {
    				System.out.println("Left mouse button clicked");
    				onFlapAction();
    			}
    		}
    	});
    	
    	addKeyListener(new KeyAdapter() {
    		@Override
    		public void keyPressed(KeyEvent e) {
    			if (e.getKeyCode() == KeyEvent.VK_SPACE) {
    				System.out.println("Space pressed");
    				onFlapAction();
    			}
    		}
    	});
    	
    	//game timer
		gameLoop = new Timer(1000/Settings.WINDOW_FPS, new ActionListener() {
          @Override
          public void actionPerformed(ActionEvent e) {
        	  // Code to be executed
        	  onGameTick();
          }
		}); //how long it takes to start timer, milliseconds gone between frames 
        gameLoop.start();
        
        is_started = false;
        is_died = false;
        score = 0;
        high_score = 0;
	}
		
    public void paintComponent(Graphics g) {
		super.paintComponent(g);
		draw(g);
	}
    
    public void onGameTick() {
    	update();
    	repaint();
    }
    
    private void onFlapAction() {
    	if(is_died == false) {
            if(is_started == false) {
                is_started = true;
                onStart();
            }
            onFlap();
        }
    }
    
    private void onFlap() {
    	player.onFlap();
    }
    
    private void onStart() {
    	score = 0;
        base.onStart();
        player.onStart();
    }
    
    private void onRestart() {
    	base.onRestart();
        player.onRestart();
        is_died = false;
        is_started = false;
    }
    
    private void onGameOver() {
    	
    }
    
    private void onScore() {
    	
    }
    
    public void update() {
    	background.update();
    	base.update();
    	player.update();
    }
    
    public void draw(Graphics g) {
    	background.draw(g);
    	base.draw(g);
    	player.draw(g);
    }
}