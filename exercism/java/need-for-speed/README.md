# Need for Speed

Welcome to Need for Speed on Exercism's Java Track.
If you need help running the tests or submitting your code, check out `HELP.md`.
If you get stuck on the exercise, check out `HINTS.md`, but try and solve it without using those first :)

## Introduction

## Constructors

Creating an instance of a _class_ is done by calling its _constructor_ through the `new` operator.
A constructor is a special type of method whose goal is to initialize a newly created instance.
Constructors look like regular methods, but without a return type and with a name that matches the class's name.

```java
class Library {
    private int books;

    public Library() {
        // Initialize the books field
        this.books = 10;
    }
}

// This will call the constructor
var library = new Library();
```

Like regular methods, constructors can have parameters.
Constructor parameters are usually stored as (private) fields to be accessed later, or else used in some one-off calculation.
Arguments can be passed to constructors just like passing arguments to regular methods.

```java
class Building {
    private int numberOfStories;
    private int totalHeight;

    public Building(int numberOfStories, double storyHeight) {
        this.numberOfStories = numberOfStories;
        this.totalHeight = numberOfStories * storyHeight;
    }
}

// Call a constructor with two arguments
var largeBuilding = new Building(55, 6.2);
```

## Instructions

In this exercise, you'll be organizing races between various types of remote controlled cars. Each car has its own speed and battery drain characteristics.

Cars start with full (100%) batteries. Each time you drive the car using the remote control, it covers the car's speed in meters and decreases the remaining battery percentage by its battery drain.

If a car's battery is below its battery drain percentage, you can't drive the car anymore.

Each race track has its own distance. Cars are tested by checking if they can finish the track without running out of battery.

You have six tasks, each of which will work with remote controlled car instances.

## 1. Creating a remote controlled car

Allow creating a remote controlled car by defining a constructor for the `NeedForSpeed` class that takes the speed of the car in meters and the battery drain percentage as its two parameters (both of type `int`):

```java
int speed = 5;
int batteryDrain = 2;
var car = new NeedForSpeed(speed, batteryDrain);
```

## 2. Creating a race track

Allow creating a race track by defining a constructor for the `RaceTrack` class that takes the track's distance in meters as its sole parameter (which is of type `int`):

```java
int distance = 800;
var raceTrack = new RaceTrack(distance);
```

## 3. Drive the car

Implement the `NeedForSpeed.drive()` method that updates the number of meters driven based on the car's speed. Also, implement the `NeedForSpeed.distanceDriven()` method to return the number of meters driven by the car:

```java
int speed = 5;
int batteryDrain = 2;
var car = new NeedForSpeed(speed, batteryDrain);
car.drive();

car.distanceDriven();
// => 5
```

## 4. Check for a drained battery

Update the `NeedForSpeed.drive()` method to drain the battery based on the car's battery drain. Also, implement the `NeedForSpeed.batteryDrained()` method that indicates if the battery is drained:

```java
int speed = 5;
int batteryDrain = 2;
var car = new NeedForSpeed(speed, batteryDrain);
car.drive();

car.batteryDrained();
// => false
```

## 5. Create the Nitro remote control car

The best-selling remote control car is the Nitro, which has a stunning top speed of 50 meters with a battery drain of 4%. Implement the (static) `NeedForSpeed.nitro()` method to return this type of car:

```java
var car = NeedForSpeed.nitro();
car.drive();
car.distanceDriven();
// => 50
```

## 6. Check if a remote control car can finish a race

To finish a race, a car has to be able to drive the race's distance. This means not draining its battery before having crossed the finish line. Implement the `RaceTrack.canFinishRace()` method that takes a `NeedForSpeed` instance as its parameter and returns `true` if the car can finish the race; otherwise, return `false`:

```java
int speed = 5;
int batteryDrain = 2;
var car = new NeedForSpeed(speed, batteryDrain);

int distance = 100;
var race = new RaceTrack(distance);

car.distanceDriven()
// => 0

race.canFinishRace(car);
// => true

car.distanceDriven()
// => 100
```

## Source

### Created by

- @ystromm

### Contributed to by

- @mirkoperillo
