package cars

// SuccessRate is used to calculate the ratio of an item being created without
// error for a given speed
func SuccessRate(speed int) float64 {
	if speed < 1 {
		return 0
	} else if speed < 5 {
		return 1
	} else if speed < 9 {
		return 0.9
	} else {
		return 0.77
	}
}

// CalculateProductionRatePerHour for the assembly line, taking into account
// its success rate
func CalculateProductionRatePerHour(speed int) float64 {
	totalCar := speed * 221
	successRate := SuccessRate(speed)
	return float64(totalCar) * float64(successRate)

}

// CalculateProductionRatePerMinute describes how many working items are
// produced by the assembly line every minute
func CalculateProductionRatePerMinute(speed int) int {
	totalCar := CalculateProductionRatePerHour(speed)
	return int(totalCar) / 60
}

// CalculateLimitedProductionRatePerHour describes how many working items are
// produced per hour with an upper limit on how many can be produced per hour
func CalculateLimitedProductionRatePerHour(speed int, limit float64) float64 {
	totalProdRate := CalculateProductionRatePerHour(speed)

	if totalProdRate > limit {
		return limit
	}

	return totalProdRate
}
