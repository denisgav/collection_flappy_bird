package FlappyBird;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

public class PipeSpawner {
	private final BufferedImage pipeImgBottom;
	private final BufferedImage pipeImgTop;

	private final List<Pipe> pipes = new ArrayList<>();

	private final Random random = new Random();

	private boolean started = false;

	private int pipeTimer = 0;

	private IScoreListener scoreListener;

	public PipeSpawner() {
		pipeImgBottom = ResourceLoader.loadImage(Settings.RESOURCE_PIPE_GREEN_PATH);
		pipeImgTop = ResourceLoader.flipVerticalImage(pipeImgBottom);
	}

	public void update() {
		if (started) {
			if (pipeTimer <= 0) {
				spawnPipePair();

				pipeTimer = Settings.PIPE_SPAWNER_TIMEOUT;
			}

			pipeTimer--;

			Iterator<Pipe> iterator = pipes.iterator();

			while (iterator.hasNext()) {
				Pipe pipe = iterator.next();

				pipe.update();

				if (pipe.outOfWindow()) {
					iterator.remove();
				}
			}
		}
	}

	private void spawnPipePair() {
		int xTop = Settings.PIPE_SPAWNER_POS_X;

		int xBottom = Settings.PIPE_SPAWNER_POS_X;

		int yTop = random
				.nextInt(Settings.PIPE_SPAWNER_POSY_RAND_RANGE_MAX - Settings.PIPE_SPAWNER_POSY_RAND_RANGE_MIN + 1)
				+ Settings.PIPE_SPAWNER_POSY_RAND_RANGE_MIN;

		int yBottom = yTop + Settings.PIPE_SPAWNER_POSY_GAP + Settings.RESOURCE_PIPE_HEIGHT;

		Pipe topPipe = new Pipe(xTop, yTop, pipeImgTop, true);

		Pipe bottomPipe = new Pipe(xBottom, yBottom, pipeImgBottom, false);

		bottomPipe.setScoreListener(scoreListener);

		pipes.add(topPipe);
		pipes.add(bottomPipe);
	}

	public void draw(Graphics g) {
		for (Pipe pipe : pipes) {
			pipe.draw(g);
		}
	}

	public void onStart() {
		started = true;
	}

	public void onGameOver() {
		started = false;
	}
	
	public void onRestart() {
		started = false;
		pipeTimer = 0;
		pipes.clear();
	}

	public void setScoreListener(IScoreListener listener) {
		this.scoreListener = listener;
	}

	public List<Pipe> getPipes() {
		return pipes;
	}

}