package FlappyBird;

import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.RenderingHints;
import java.awt.Transparency;
import java.awt.geom.AffineTransform;
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
	
    public static BufferedImage flipVerticalImage(BufferedImage source) {
        BufferedImage result =
                GraphicsEnvironment
                        .getLocalGraphicsEnvironment()
                        .getDefaultScreenDevice()
                        .getDefaultConfiguration()
                        .createCompatibleImage(
                                source.getWidth(),
                                source.getHeight(),
                                Transparency.TRANSLUCENT);

        Graphics2D g = result.createGraphics();

        AffineTransform tx = AffineTransform.getScaleInstance(1, -1);
        tx.translate(0, -source.getHeight());

        g.drawImage(source, tx, null);
        g.dispose();

        return result;
    }
}