package FlappyBird;

public final class Settings {
	public static final String WINDOW_CAPTION = "Flappy Bird";
	public static final int WINDOW_WIDTH = 910;
	public static final int WINDOW_HEIGHT = 512;
	public static final int WINDOW_FPS = 30;
	
	public static final String RESOURCE_BACGROUND_DAY_PATH = "./../assets/sprites/background-day.png";
	
	public static final String RESOURCE_BASE_PATH = "./../assets/sprites/base.png";
	public static final float baseToBackgroundHeightRatio = 0.22f;
	
	public static final int BASE_SCROLL_SPEED = 2;
	
	public static final int BIRD_START_X = 100;
	public static final int BIRD_START_Y = 300;
	
	public static final float BIRD_ACCELERATION = 0.25f;
	public static final float BIRD_MAX_VELOCITY = 8.f;
	public static final float BIRD_FLAP_VELOCITY = -7.f;
	public static final float BIRD_ANGULAR_SPEED = 7.f;
	public static final int RESOURCE_BIRD_HEIGHT = 24;
	public static final int RESOURCE_BIRD_WIDTH = 34;
	
	public static final String RESOURCE_BLUEBIRD_DOWNFLAP_PATH = "./../assets/sprites/bluebird-downflap.png";
	public static final String RESOURCE_BLUEBIRD_MIDFLAP_PATH  = "./../assets/sprites/bluebird-midflap.png";
	public static final String RESOURCE_BLUEBIRD_UPFLAP_PATH   = "./../assets/sprites/bluebird-upflap.png";
}
