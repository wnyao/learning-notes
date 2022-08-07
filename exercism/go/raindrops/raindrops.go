package raindrops

import "fmt"

func Convert(number int) string {
	var str string
	factors := map[int]string{
		3: "Pling",
		5: "Plang",
		7: "Plong",
	}

	for k, v := range factors {
		if number%k == 0 {
			str += v
		}
	}

	if str != "" {
		return str
	}

	return fmt.Sprintf("%d", number)
}
