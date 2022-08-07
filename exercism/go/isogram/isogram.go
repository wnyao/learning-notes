package isogram

import (
	"regexp"
	"strings"
)

func IsIsogram(word string) bool {
	re := regexp.MustCompile(`(-|\s)`)
	w := re.ReplaceAllString(word, "")

	var chars []string
	count := make(map[string]int)

	for j := 0; j < len(w); j++ {
		c := string(w[j])
		char := strings.ToLower(c)
		chars = append(chars, char)
	}

	for i := 0; i < len(w); i++ {
		char := chars[i]
		count[char] = count[char] + 1

		if count[char] > 1 {
			return false
		}
	}

	return true
}
