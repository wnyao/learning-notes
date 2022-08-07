package expenses

import "errors"

// Record represents an expense record.
type Record struct {
	Day      int
	Amount   float64
	Category string
}

// DaysPeriod represents a period of days for expenses.
type DaysPeriod struct {
	From int
	To   int
}

// Filter returns the records for which the predicate function returns true.
func Filter(in []Record, predicate func(Record) bool) []Record {
	var validRecord []Record

	for i := 0; i < len(in); i++ {
		record := in[i]

		if predicate(record) {
			validRecord = append(validRecord, record)
		}
	}

	return validRecord
}

// ByDaysPeriod returns predicate function that returns true when
// the day of the record is inside the period of day and false otherwise.
func ByDaysPeriod(p DaysPeriod) func(Record) bool {
	return func(record Record) bool {
		return record.Day >= p.From && record.Day <= p.To
	}
}

// ByCategory returns predicate function that returns true when
// the category of the record is the same as the provided category
// and false otherwise.
func ByCategory(c string) func(Record) bool {
	return func(record Record) bool {
		return record.Category == c
	}
}

// TotalByPeriod returns total amount of expenses for records
// inside the period p.
func TotalByPeriod(in []Record, p DaysPeriod) float64 {
	var total float64

	for i := 0; i < len(in); i++ {
		record := in[i]
		isWithin := ByDaysPeriod(p)(record)

		if isWithin {
			total = total + float64(record.Amount)
		}
	}

	return total
}

// CategoryExpenses returns total amount of expenses for records
// in category c that are also inside the period p.
// An error must be returned only if there are no records in the list that belong
// to the given category, regardless of period of time.
func CategoryExpenses(in []Record, p DaysPeriod, c string) (float64, error) {
	var total float64
	var records []Record

	for i := 0; i < len(in); i++ {
		record := in[i]

		if ByCategory(c)(record) && ByDaysPeriod(p)(record) {
			total = total + float64(record.Amount)
		}

		if ByCategory(c)(record) {
			records = append(records, record)
		}
	}

	if len(records) == 0 {
		return 0, errors.New("unknown category entertainment")
	}

	return total, nil
}
