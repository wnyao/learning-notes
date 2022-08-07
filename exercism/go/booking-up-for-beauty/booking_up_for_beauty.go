package booking

import "time"

// Schedule returns a time.Time from a string containing a date
func Schedule(date string) time.Time {
	tt, _ := time.Parse("1/02/2006 15:04:05", date)
	return tt
}

// HasPassed returns whether a date has passed
func HasPassed(date string) bool {
	tt, _ := time.Parse("January 2, 2006 15:04:05", date)
	return time.Now().After(tt)
}

// IsAfternoonAppointment returns whether a time is in the afternoon
func IsAfternoonAppointment(date string) bool {
	tt, _ := time.Parse("Monday, January 2, 2006 15:04:05", date)
	noonStartTime := time.Date(tt.Year(), tt.Month(), tt.Day(), 12, 00, 00, 0, time.UTC)
	noonEndTime := time.Date(tt.Year(), tt.Month(), tt.Day(), 18, 00, 00, 0, time.UTC)
	return tt.After(noonStartTime) && tt.Before(noonEndTime)
}

// Description returns a formatted string of the appointment time
func Description(date string) string {
	tt, _ := time.Parse("1/2/2006 15:04:05", date)
	return "You have an appointment on " + tt.Format("Monday, January 2, 2006") + ", at " + tt.Format("15:04") + "."
}

// AnniversaryDate returns a Time with this year's anniversary
func AnniversaryDate() time.Time {
	tt := time.Date(time.Now().Year(), 9, 15, 0, 0, 0, 0, time.UTC)
	return tt
}
