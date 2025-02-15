import java.util.ArrayList;
import java.util.List;

public class Drawing {
  public String[] colours;
  public String[] shapes;

  public static class Art {
    public String colour;
    public String shape;

    public Art(String colour, String shape) {
      this.colour = colour;
      this.shape = shape;
    }
  }

  public Drawing(String[] colours, String[] shapes) {
    this.colours = colours;
    this.shapes = shapes;
  }

  public List<Art> mix() {
    int max = Math.max(colours.length, shapes.length);
    List<Art> mixes = new ArrayList<Art>();

    for (int i = 0; i < max; i++) {
      String c = i < colours.length ? colours[i] : colours[colours.length - 1];
      String s = i < shapes.length ? shapes[i] : shapes[shapes.length - 1];
      mixes.add(new Art(c, s));
    }

    return mixes;
  }

  public static void main(String[] args) {
    Drawing draw = new Drawing(new String[] {"red", "blue"}, new String[] {"circle"});
    List<Art> mixes = draw.mix();

    /*
     * Should print:
     * red, circle
     * blue, circle
     */
    for (Art art : mixes) {
      System.out.println(art.colour + ", " + art.shape);
    }
  }
}
