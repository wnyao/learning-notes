package grains

import (
	"math"
)

type error interface {
	Error() string
}

type SquareError struct{}

func (err *SquareError) Error() string {
	return "Error"
}

func Square(number int) (uint64, error) {
	if number <= 0 || number > 64 {
		return uint64(0), &SquareError{}
	}

	squareNumb := math.Pow(2, float64(number-1))
	return uint64(squareNumb), nil
}

func Total() uint64 {
	return uint64(math.Pow(2, 64))
}
