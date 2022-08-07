package chessboard

// Rank which stores if a square is occupied by a piece - this will be a slice of bools
type Rank []bool

// Chessboard contains a map of eight Ranks, accessed with values from "A" to "H"
type Chessboard map[string]Rank

// CountInRank returns how many squares are occupied in the chessboard, within the given rank
func CountInRank(cb Chessboard, rank string) int {
	var squares Rank
	for k, v := range cb {
		if k == rank {
			squares = v
			break
		}
	}

	count := 0
	for _, occupied := range squares {
		if occupied {
			count++
		}
	}

	return count
}

// CountInFile returns how many squares are occupied in the chessboard,
// within the given file
func CountInFile(cb Chessboard, file int) int {
	count := 0

	// Return a count of zero (`0`) if the given file is not a valid one
	if file < 1 || file > 8 {
		return count
	}

	for _, rank := range cb {
		occupied := rank[file-1]

		if occupied {
			count++
		}
	}

	return count
}

// CountAll should count how many squares are present in the chessboard
func CountAll(cb Chessboard) int {
	totalSquare := 0

	for range cb {
		totalSquare += 8
	}

	return totalSquare
}

// CountOccupied returns how many squares are occupied in the chessboard
func CountOccupied(cb Chessboard) int {
	count := 0

	for k := range cb {
		occupied := CountInRank(cb, k)
		count += occupied
	}

	return count
}
