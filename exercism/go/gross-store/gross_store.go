package gross

// Units stores the Gross Store unit measurements.
func Units() map[string]int {
	return map[string]int{
		"quarter_of_a_dozen": 3,
		"half_of_a_dozen":    6,
		"dozen":              12,
		"small_gross":        120,
		"gross":              144,
		"great_gross":        1728,
	}
}

// NewBill creates a new bill.
func NewBill() map[string]int {
	return map[string]int{}
}

// AddItem adds an item to customer bill.
func AddItem(bill, units map[string]int, item, unit string) bool {
	unitVal, exists := units[unit]

	if exists {
		bill[item] += unitVal
	}

	return exists
}

// RemoveItem removes an item from customer bill.
func RemoveItem(bill, units map[string]int, item, unit string) bool {
	_, billItemExists := bill[item]
	unitItem, unitItemExists := units[unit]

	// Return `false` if the given item is **not** in the bill
	// Return `false` if the given `unit` is not in the `units` map.
	if !billItemExists || !unitItemExists {
		return false
	}

	newQuantity := bill[item] - unitItem

	switch {
	// Return `false` if the new quantity would be less than 0.
	case newQuantity < 0:
		return false
	// If the new quantity is 0, completely remove the item from the `bill` then return `true`
	case newQuantity == 0:
		delete(bill, item)
		return true
	// Otherwise, reduce the quantity of the item and return `true`.
	default:
		bill[item] = newQuantity
		return true
	}
}

// GetItem returns the quantity of an item that the customer has in his/her bill.
func GetItem(bill map[string]int, item string) (int, bool) {
	billItem, billItemExists := bill[item]

	if !billItemExists {
		return 0, false
	}

	return billItem, true
}
