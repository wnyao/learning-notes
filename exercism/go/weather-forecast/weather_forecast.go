// Package weather provides forecast infomation given city and condition of the weather.
package weather

// CurrentCondition represents the current condition of the weather.
var CurrentCondition string

// CurrentLocation represents the current location of the weather.
var CurrentLocation string

// Forecast returns the forecast report on the city and condition.
func Forecast(city, condition string) string {
	CurrentLocation, CurrentCondition = city, condition
	return CurrentLocation + " - current weather condition: " + CurrentCondition
}
