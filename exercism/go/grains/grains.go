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
	// https://github.com/golang/go/issues/29463#issuecomment-450532581
	// not representable by math.Pow(2, 64) for uint64
	return uint64(1<<64 - 1)
}
