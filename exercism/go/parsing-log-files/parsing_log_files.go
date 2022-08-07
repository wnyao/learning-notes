package parsinglogfiles

import (
	"fmt"
	"regexp"
	"strings"
)

func IsValidLine(text string) bool {
	re := regexp.MustCompile(`^\[(TRC|DBG|INF|WRN|ERR|FTL)+\]`)
	s := re.FindString(text)
	return s != ""
}

func SplitLogLine(text string) []string {
	re := regexp.MustCompile(`(<[*+-_~]*>)`)
	s := re.Split(text, -1)
	return s
}

func CountQuotedPasswords(lines []string) int {
	count := 0
	re := regexp.MustCompile(`\"[A-Z a-z]*(?i)password\"`)

	for i := 0; i < len(lines); i++ {
		line := lines[i]
		s := re.FindString(line)

		if s != "" {
			count = count + 1
		}
	}

	return count
}

func RemoveEndOfLineText(text string) string {
	re := regexp.MustCompile(`end-of-line[0-9]*`)
	s := re.ReplaceAllString(text, "")
	return s
}

func TagWithUserName(lines []string) []string {
	result := make([]string, len(lines))

	re := regexp.MustCompile(`(?:User)([\s]+[[:alnum:]]*)?`)

	for i := 0; i < len(lines); i++ {
		line := lines[i]

		// NOTE: FindString dont support function of non-capturing group
		user := re.FindStringSubmatch(line)

		// line that not contain the string User untouched
		if user == nil || user[1] == "" {
			result[i] = line
			continue
		}

		result[i] = fmt.Sprintf("[USR] %s %s", strings.TrimSpace(user[1]), line)
	}

	return result
}
