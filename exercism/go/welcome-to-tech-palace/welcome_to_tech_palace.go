package techpalace

import (
	"regexp"
	"strings"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	return "Welcome to the Tech Palace, " + strings.ToUpper(customer)
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	var stars = ""

	for i := 0; i < numStarsPerLine; i++ {
		stars += "*"
	}

	return stars + "\n" + welcomeMsg + "\n" + stars
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	// establish regex
	var re = regexp.MustCompile(`\*`)

	// replace and trim leading and trailing spaces
	var msg string
	msg = re.ReplaceAllString(oldMsg, "")
	msg = strings.TrimSpace(msg)

	return msg
}
