package FlappyBird;

import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.io.File;

public class ResourceLoader
{
	public static BufferedImage loadImage(String relativePath) {
		try {
			String path = ResourceLoader.class.getResource(relativePath).getFile();
			return ImageIO.read(new File(path));
		}
		catch (Exception e) {
			throw new RuntimeException("Failed to load image: " + relativePath, e);
		}
	}
	
	public static BufferedImage scaleImage(
	        BufferedImage original,
	        int newWidth,
	        int newHeight)
	{
	    BufferedImage scaled =
	            new BufferedImage(
	                    newWidth,
	                    newHeight,
	                    BufferedImage.TYPE_INT_ARGB);

	    Graphics2D g2d = scaled.createGraphics();

	    g2d.setRenderingHint(
	            RenderingHints.KEY_INTERPOLATION,
	            RenderingHints.VALUE_INTERPOLATION_BILINEAR);

	    g2d.drawImage(
	            original,
	            0,
	            0,
	            newWidth,
	            newHeight,
	            null);

	    g2d.dispose();

	    return scaled;
	}
}