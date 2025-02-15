### Answer 1

```java
public class GamePlatform {
  public static double getFinalSpeed(double initialSpeed, int[] inclinations) {
    double speed = initialSpeed;

    for (int inclination : inclinations) {
      if (inclination < 0) {
        speed = Math.abs(3 * inclination);
        continue;
      }

      if (inclination > 0) {
        speed = inclination;
        continue;
      }
    }

    return speed;
  }

  public static void main(String[] args) {
    System.out.println(getFinalSpeed(60.0, new int[] {0, -30, 0, 45, 0})); // should print 45
  }
}
```



### Answer 2

```java
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

  // Not sure there is some mistake in the question, the Constructor method is initially named as IceCreamMachine
  public Drawing(String[] colours, String[] shapes) {
    this.colours = colours;
    this.shapes = shapes;
  }

  public List<Art> mix() {
    int max = Math.max(this.colours.length, this.shapes.length);
    List<Art> mixes = new ArrayList<Art>();

    for (int i = 0; i < max; i++) {
      String c = i < this.colours.length ? this.colours[i] : this.colours[this.colours.length - 1];
      String s = i < this.shapes.length ? this.shapes[i] : this.shapes[this.shapes.length - 1];
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
```


### Answer 3

```java
public List<Student> findStudentByName(String nameStartsWith) {
    return template.query(
        "SELECT * FROM student WHERE name LIKE ?",
        new Object[] {nameStartsWith + "%"},
        (rs, rowNum) -> new Student(rs.getString("name"), rs.getString("gender")));
}
```

### Answer 4

`@PreAuthorize` annotation can be applied at the class level, 
so that each methods of the class are allowed to inherit the security configuration.

### Answer 5

```sql
SELECT p.Name, s.Sport, s.Score AS "Total Score" 
FROM players p INNER JOIN scores s 
ON p.Player_no = s.Player_no; 
```
