package sorting

import "strconv"

// DescribeNumber should return a string describing the number.
func DescribeNumber(f float64) string {
	return "This is the number " + strconv.FormatFloat(f, 'f', 1, 64)
}

// NumberBox contains a number
type NumberBox interface {
	Number() int
}

// DescribeNumberBox should return a string describing the NumberBox.
func DescribeNumberBox(nb NumberBox) string {
	formatNum := strconv.FormatFloat(float64(nb.Number()), 'f', 1, 64)
	return "This is a box containing the number " + formatNum
}

// FancyNumber contains fancy number
type FancyNumber struct {
	n string
}

// Value method return fancy number from FancyNumber
func (i FancyNumber) Value() string {
	return i.n
}

// FancyNumberBox interface
type FancyNumberBox interface {
	Value() string
}

// ExtractFancyNumber should return the integer value for a FancyNumber
// and 0 if any other FancyNumberBox is supplied.
func ExtractFancyNumber(fnb FancyNumberBox) int {
	value, _ := strconv.ParseInt(fnb.Value(), 0, 64)
	return int(value)
}

// DescribeFancyNumberBox should return a string describing the FancyNumberBox.
func DescribeFancyNumberBox(fnb FancyNumberBox) string {
	valueInt := ExtractFancyNumber(fnb)
	valueStr := strconv.FormatFloat(float64(valueInt), 'f', 1, 64)
	return "This is a fancy box containing the number " + valueStr
}

// DescribeAnything should return a string describing whatever it contains.
func DescribeAnything(i interface{}) string {
	if val, ok := i.(int); ok == true {
		return DescribeNumber(float64(val))
	}

	if val, ok := i.(float64); ok == true {
		return DescribeNumber(float64(val))
	}

	if val, ok := i.(NumberBox); ok == true {
		return DescribeNumberBox(val)
	}

	if val, ok := i.(FancyNumberBox); ok == true {
		return DescribeFancyNumberBox(val)
	}

	return "Return to sender"
}
