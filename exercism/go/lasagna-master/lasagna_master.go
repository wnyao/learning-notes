package lasagna

// PreparationTime estimates the total preparation time
func PreparationTime(layers []string, prepTimePerLayer int) int {
	if prepTimePerLayer == 0 {
		prepTimePerLayer = 2
	}

	return prepTimePerLayer * len(layers)
}

// Quantities determines the quantity of noodles and sauce needed to make your meal
func Quantities(layers []string) (int, float64) {
	totalNoodleLayer := 0
	totalSauceLayer := 0

	for _, value := range layers {
		switch value {
		case "noodles":
			totalNoodleLayer++
		case "sauce":
			totalSauceLayer++
		}
	}

	return totalNoodleLayer * 50, float64(totalSauceLayer) * 0.2
}

// AddSecretIngredient generates a new slice and add the last item from your friends list to the end of your list
func AddSecretIngredient(secretRecipes, myRecipes []string) []string {
	secretIngredient := secretRecipes[len(secretRecipes)-1]
	return append(myRecipes, secretIngredient)
}

// ScaleRecipe returns the amounts needed for the desired number of portions.
func ScaleRecipe(quantitiesForTwo []float64, totalPortion int) []float64 {
	quantitiesNeeded := make([]float64, len(quantitiesForTwo))

	for i, value := range quantitiesForTwo {
		quantityPer := value / 2
		quantitiesNeeded[i] = quantityPer * float64(totalPortion)
	}

	return quantitiesNeeded
}
