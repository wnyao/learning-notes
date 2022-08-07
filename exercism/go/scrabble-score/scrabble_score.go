package scrabble

import (
	"fmt"
	"strings"
)

func Score(word string) int {
	finalScore := 0

	for _, char := range word {
		str := fmt.Sprintf("%c", char)
		finalScore += getScore(str)
	}

	return finalScore
}

func getScore(letter string) int {
	upperCaseLetter := strings.ToUpper(letter)

	switch upperCaseLetter {
	case "A", "E", "I", "O", "U", "L", "N", "R", "S", "T":
		return 1
	case "D", "G":
		return 2
	case "B", "C", "M", "P":
		return 3
	case "F", "H", "V", "W", "Y":
		return 4
	case "K":
		return 5
	case "J", "X":
		return 8
	case "Q", "Z":
		return 10
	default:
		return 0
	}
}
