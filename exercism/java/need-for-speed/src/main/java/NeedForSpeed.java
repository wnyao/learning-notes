class NeedForSpeed {
  private int speed;
  private int batteryDrain;

  private int battery = 100;
  private int meters = 0;

  NeedForSpeed(int speed, int batteryDrain) {
    this.speed = speed;
    this.batteryDrain = batteryDrain;
  }

  public boolean batteryDrained() {
    return this.battery < this.batteryDrain;
  }

  public int distanceDriven() {
    return this.meters * this.speed;
  }

  public void drive() {
    if (!this.batteryDrained()) {
      this.battery -= this.batteryDrain;
      this.meters += 1;
    }
  }

  public static NeedForSpeed nitro() {
    return new NeedForSpeed(50, 4);
  }
}

class RaceTrack {
  private int distance;

  RaceTrack(int distance) {
    this.distance = distance;
  }

  public boolean canFinishRace(NeedForSpeed car) {
    while (car.distanceDriven() < this.distance) {
      if (!car.batteryDrained()) {
        car.drive();
        continue;
      }

      return false;
    }

    return true;
  }
}
