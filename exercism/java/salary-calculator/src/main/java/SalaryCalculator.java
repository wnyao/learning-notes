public class SalaryCalculator {
    public double salaryMultiplier(int daysSkipped) {
      return daysSkipped >= 5 ? 0.85 : 1;
    }

    public int bonusMultiplier(int productsSold) {
      return productsSold >= 20  ? 13 : 10;
    }

    public double bonusForProductsSold(int productsSold) {
      return productsSold * this.bonusMultiplier(productsSold);
    }

    public double finalSalary(int daysSkipped, int productsSold) {
      double salary = 1000 * this.salaryMultiplier(daysSkipped) + this.bonusForProductsSold(productsSold);
      return salary >= 2000 ? 2000 : salary;
    } 
}
