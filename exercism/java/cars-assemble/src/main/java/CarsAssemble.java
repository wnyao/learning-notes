public class CarsAssemble {
    private int parseDoubleToInt(double num) {
      return (int) num;
    }

    public double productionRatePerHour(int speed) {
      double rate = speed * 221;
      
      if (speed >= 1 && speed <= 4) {
        return rate;
      }

      if (speed >= 5 && speed <= 8) {
        return rate * 0.9;
      }

      if (speed == 9) {
        return rate * 0.8;
      }

      return rate * 0.77;
    }

    public int workingItemsPerMinute(int speed) {
      double workingItemsPerMin =  this.productionRatePerHour(speed) / 60;
      return this.parseDoubleToInt(workingItemsPerMin);
    }
}
