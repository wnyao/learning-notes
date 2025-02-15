
class BirdWatcher {
    private final int[] birdsPerDay;

    public BirdWatcher(int[] birdsPerDay) {
        this.birdsPerDay = birdsPerDay.clone();
    }

    public int[] getLastWeek() {
      return this.birdsPerDay;
    }

    public int getToday() {
      return this.birdsPerDay[this.birdsPerDay.length - 1];
    }

    public void incrementTodaysCount() {
      int lastIndex = this.birdsPerDay.length - 1;
      this.birdsPerDay[lastIndex] = this.birdsPerDay[lastIndex] + 1;
    }

    public boolean hasDayWithoutBirds() {
      for (int count: this.birdsPerDay) {
        if (count == 0) {
          return true;
        }
      }

      return false;
    }

    public int getCountForFirstDays(int numberOfDays) {
      int total = 0;
      int totalDays = this.birdsPerDay.length;
      
      for (int i = 0; i < numberOfDays; i++) {
        if (i < this.birdsPerDay.length) {
          total += this.birdsPerDay[i];       
        }
      }

      return total;
    }

    public int getBusyDays() {
      int count = 0;
      
      for (int c: this.birdsPerDay) {
        if (c >= 5) {
          count++;
        }
      }

      return count;
    }
}
