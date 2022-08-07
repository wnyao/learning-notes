package speed

// Car type struct
type Car struct {
	battery      int
	batteryDrain int
	speed        int
	distance     int
}

// NewCar creates a new remote controlled car with full battery and given specifications.
func NewCar(speed, batteryDrain int) Car {
	return Car{
		speed:        speed,
		batteryDrain: batteryDrain,
		distance:     0,
		battery:      100,
	}
}

// Track type struct
type Track struct {
	distance int
}

// NewTrack created a new track
func NewTrack(distance int) Track {
	return Track{
		distance: distance,
	}
}

// Drive drives the car one time. If there is not enough battery to drive on more time,
// the car will not move.
func Drive(car Car) Car {
	batteryLeft := car.battery - car.batteryDrain
	distanceCover := car.distance + car.speed

	if batteryLeft < 0 {
		batteryLeft = car.battery
		distanceCover = car.distance
	}

	return Car{
		speed:        car.speed,
		batteryDrain: car.batteryDrain,
		battery:      batteryLeft,
		distance:     distanceCover,
	}
}

// CanFinish checks if a car is able to finish a certain track.
func CanFinish(car Car, track Track) bool {
	totalDistanceCoverable := car.battery / car.batteryDrain * car.speed
	return totalDistanceCoverable >= track.distance
}
