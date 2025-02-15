public class ExperimentalRemoteControlCar implements RemoteControlCar {
  private int units;

  public void drive() {
    this.units += 20;
  }

  public int getDistanceTravelled() {
    return this.units;
  }
}
