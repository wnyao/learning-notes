public class Lasagna {
    public int expectedMinutesInOven() {
      return 40;
    }

    public int remainingMinutesInOven(int minutesIn) {
      return this.expectedMinutesInOven() - minutesIn;
    }

    public int preparationTimeInMinutes(int layers) {
      return layers * 2;
    }

    public int totalTimeInMinutes(int layers, int minutesInOven) {
      return this.preparationTimeInMinutes(layers) + minutesInOven;
    }
}
