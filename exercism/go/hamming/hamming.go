package hamming

import (
	"errors"
)

// Distance retuen the hamming distance count for a and b
func Distance(a, b string) (int, error) {
	var count int

	if len(a) != len(b) {
		return count, errors.New("Unequal length")
	}

	for i := 0; i < len(a); i++ {
		if a[i] != b[i] {
			count++
		}
	}

	return count, nil
}
