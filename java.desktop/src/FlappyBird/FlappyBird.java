package FlappyBird;

import java.awt.*;
import javax.swing.*;

public class FlappyBird extends JPanel {
	private static final long serialVersionUID = 1L;
	
	public static final String WINDOW_CAPTION = "Flappy Bird";
	public static final int WINDOW_WIDTH = 910;
	public static final int WINDOW_HEIGHT = 512;
	public static final int WINDOW_FPS = 30;

    FlappyBird() {
    	setPreferredSize(new Dimension(FlappyBird.WINDOW_WIDTH, FlappyBird.WINDOW_HEIGHT));
    	setBackground(Color.blue);
	}
}