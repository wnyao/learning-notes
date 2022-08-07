package thefarm

import (
	"errors"
	"fmt"
)

// See types.go for the types defined for this exercise.

// SillyNephewError returned in case the number of cows is negative
type SillyNephewError struct {
	cows int
}

func (e *SillyNephewError) Error() string {
	return fmt.Sprintf("silly nephew, there cannot be %d cows", e.cows)
}

// DivideFood computes the fodder amount per cow for the given cows.
func DivideFood(weightFodder WeightFodder, cows int) (float64, error) {
	amount, err := weightFodder.FodderAmount()
	var fodder float64

	switch {
	case err == ErrScaleMalfunction && amount < 0:
		return 0, errors.New("Negative fodder")
	case err == ErrScaleMalfunction:
		fodder = amount / float64(cows) * 2
		return fodder, nil
	case err != nil:
		return 0, err
	case amount < 0:
		return 0, errors.New("Negative fodder")
	case cows == 0:
		return 0, errors.New("Division by zero")
	case cows < 0:
		return 0, &SillyNephewError{
			cows: cows,
		}
	}

	fodder = amount / float64(cows)
	return fodder, nil
}
