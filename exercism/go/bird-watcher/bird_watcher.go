package birdwatcher

// TotalBirdCount return the total bird count by summing
// the individual day's counts.
func TotalBirdCount(birdsPerDay []int) int {
	totalCount := 0

	for _, value := range birdsPerDay {
		totalCount += value
	}

	return totalCount

}

// BirdsInWeek returns the total bird count by summing
// only the items belonging to the given week.
func BirdsInWeek(birdsPerDay []int, week int) int {
	totalCount := 0
	totalDays := week * 7

	for day := totalDays - 7; day < totalDays; day++ {
		totalCount += birdsPerDay[day]
	}

	return totalCount
}

// FixBirdCountLog returns the bird counts after correcting
// the bird counts for alternate days.
func FixBirdCountLog(birdsPerDay []int) []int {
	for day := 0; day < len(birdsPerDay); day += 2 {
		birdsPerDay[day] = birdsPerDay[day] + 1
	}

	return birdsPerDay
}
