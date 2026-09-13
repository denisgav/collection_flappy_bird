package FlappyBird;

import java.awt.event.*;
import java.awt.image.BufferedImage;
import java.awt.*;
import javax.swing.*;

public class FlappyBird extends JPanel implements IScoreListener, IRestartListener {
	private static final long serialVersionUID = 1L;
	
	private JFrame frame;
	private Font font;
	
	private Background background;
	private Base base;
	private PipeSpawner pipeSpawner;
	private Player player;
	
	private MessageScreen messageScreen;
	private GameOverScreen gameOverScreen;
	
	private Timer gameLoop;
	
	private BufferedImage backBuffer;
	private Graphics2D backGraphics;
	
    private boolean is_started;
    private boolean is_died;
    private int score;
    private int high_score;

    FlappyBird(JFrame frame) {
    	this.frame = frame;
    	setPreferredSize(new Dimension(Settings.WINDOW_WIDTH, Settings.WINDOW_HEIGHT));
    	setFocusable(true);
    	setBackground(Color.blue);
    	
    	font = ResourceLoader.loadFont(Settings.RESOURCE_FONT_PATH);
    	font = font.deriveFont(45f);
    	
    	backBuffer = new BufferedImage(
    			Settings.WINDOW_WIDTH,
    			Settings.WINDOW_HEIGHT,
    	        BufferedImage.TYPE_INT_ARGB);

    	backGraphics = backBuffer.createGraphics();
    	
    	background = new Background();
    	base = new Base();
    	pipeSpawner = new PipeSpawner();
    	player = new Player();
    	
    	messageScreen = new MessageScreen();
    	gameOverScreen = new GameOverScreen(frame, font);
    	gameOverScreen.setRestartListener(this);
    	
    	pipeSpawner.setScoreListener(this);
    	
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
		
		g.drawImage(
    			backBuffer,
    			0,
    			0,
    			null
    	);
	}
    
    public void onGameTick() {
    	update();
    	draw(backGraphics);
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
        pipeSpawner.onStart();
        player.onStart();
    }
    
    public void onRestart() {
    	base.onRestart();
    	pipeSpawner.onRestart();
        player.onRestart();
        is_died = false;
        is_started = false;
    }
    
    private void onGameOver() {
    	is_died = true;
        is_started = false;
        base.onGameOver();
        player.onGameOver();
        pipeSpawner.onGameOver();
        
        gameOverScreen.setScore(score, high_score);
        gameOverScreen.onShow();
        
        if(score > high_score) {
        	high_score = score;
        }
    }
    
    public void onScore() {
    	System.out.println("Scored!");
    	score++;
    }
    
    public void update() {
    	background.update();
    	base.update();
    	pipeSpawner.update();
    	player.update();
    	
    	boolean collision = collisionDetect();
    	if( collision ){
    		onGameOver();
    	}
    }
    
    private boolean collisionDetect() {
    	Rectangle playerRect = player.getRectangle();
    	Rectangle baseRect = base.getRectangle();
    	if(playerRect.intersects(baseRect))
    		return true;
    	for(Pipe pipe : pipeSpawner.getPipes()) {
    		Rectangle pipeRect = pipe.getRectangle();
    		if(playerRect.intersects(pipeRect)) {
    			return true;
    		}
    	}
    	return false;
    }
    
    public void draw(Graphics g) {
    	// Clear screen
    	g.setColor(Color.BLACK);
    	g.fillRect(
    			0,
    			0,
    			backBuffer.getWidth(),
    			backBuffer.getHeight()
    	);
    	
    	background.draw(g);
    	pipeSpawner.draw(g);
    	base.draw(g);
    	player.draw(g);
    	
    	if(is_started) {
    		g.setColor(Color.WHITE);
    		g.setFont(font);
    		g.drawString(String.valueOf(score), 20, 50);
        }
        else
        {
            if(is_died == false) {
                messageScreen.draw(g);
            }
            else {
                gameOverScreen.draw(g);
            }
        }
    }
}