class ProductionRemoteControlCar implements RemoteControlCar, Comparable<ProductionRemoteControlCar> {
  int units;
  int victories;

  public interface Comparable<T> {
    void setNumberOfVictories(int rank);
  }

  public void drive() {
    this.units += 10;
  }

  public int getDistanceTravelled() {
    return this.units;
  }

  public void setNumberOfVictories(int victories) {
    this.victories = victories;
  }

  public int getNumberOfVictories() {
    return this.victories;
  }

  public int compareTo(ProductionRemoteControlCar car) {
    if (victories == car.victories) {
      return 0;
    }

    if (victories > car.victories) {
      return -1;
    }

    return 1;
  }
}
