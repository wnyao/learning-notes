package luhn

import (
	"strconv"
	"strings"
)

func Valid(id string) bool {
	var total int
	parsedStr := strings.ReplaceAll(id, " ", "")
	totalLength := len(parsedStr)

	if totalLength <= 1 {
		return false
	}

	for index := totalLength - 1; index >= 0; index -= 1 {
		reversedIndex := totalLength - index
		char := string([]rune(parsedStr)[index])
		number, err := strconv.Atoi(char)

		if err != nil {
			return false
		}

		if reversedIndex%2 == 0 {
			multiply := number * 2

			if multiply > 9 {
				total += (multiply - 9)
			} else {
				total += multiply
			}

			continue
		}

		total += number
	}

	return total%10 == 0
}
