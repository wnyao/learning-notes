package diffsquares

func SquareOfSum(n int) int {
	num := 0

	for i := n; i > 0; i-- {
		num = num + i
	}

	return num * num
}

func SumOfSquares(n int) int {
	num := 0

	for i := n; i > 0; i-- {
		num = num + i*i
	}

	return num
}

func Difference(n int) int {
	return SquareOfSum(n) - SumOfSquares(n)
}
