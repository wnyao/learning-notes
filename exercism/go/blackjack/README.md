# Blackjack

Welcome to Blackjack on Exercism's Go Track.
If you need help running the tests or submitting your code, check out `HELP.md`.
If you get stuck on the exercise, check out `HINTS.md`, but try and solve it without using those first :)

## Introduction

Like other languages, Go also provides a `switch` statement. Switch statements are a shorter way to write long `if ... else if` statements. To make a switch, we start by using the keyword `switch` followed by a value or expression. We then declare each one of the conditions with the `case` keyword. We can also declare a `default` case, that will run when none of the previous `case` conditions matched:

```go
operatingSystem := "windows"

switch operatingSystem {
case "windows":
    // do something if the operating system is windows
case "linux":
    // do something if the operating system is linux
case "macos":
    // do something if the operating system is macos
default:
    // do something if the operating system is none of the above
} 
```

One interesting thing about switch statements, is that the value after the `switch` keyword can be omitted, and we can have boolean conditions for each `case`:

```go
age := 21

switch {
case age > 20 && age < 30:
    // do something if age is between 20 and 30
case age == 10:
    // do something if age is equal to 10
default:
    // do something else for every other case
}
```

## Instructions

In this exercise we will simulate the first turn of a [Blackjack](https://en.wikipedia.org/wiki/Blackjack) game.

You will receive two cards and will be able to see the face up card of the dealer. All cards are represented using a string such as "ace", "king", "three", "two", etc. The values of each card are:

| card  | value | card  | value |
| :---: | :---: | :---: | :---: |
|  ace  |  11   | eight |   8   |
|  two  |   2   | nine  |   9   |
| three |   3   |  ten  |  10   |
| four  |   4   | jack  |  10   |
| five  |   5   | queen |  10   |
|  six  |   6   | king  |  10   |
| seven |   7   | other |   0   |

**Note**: Commonly, aces can take the value of 1 or 11 but for simplicity we will assume that they can only take the value of 11.

Depending on your two cards and the card of the dealer, there is a strategy for the first turn of the game, in which you have the following options:

    - Stand (S)
    - Hit (H)
    - Split (P)
    - Automatically win (W)

Although not optimal yet, you will follow the strategy your friend Alex has been developing, which is as follows:

Category: Large Hand

- If you have a pair of aces you must always split them.
- If you have a Blackjack (two cards that sum up to a value of 21), and the dealer does not have an ace, a figure or a ten then you automatically win. If the dealer does have any of those cards then you'll have to stand and wait for the reveal of the other card.

Category: Small Hand

- If your cards sum up to 17 or higher you should always stand.
- If your cards sum up to 11 or lower you should always hit.
- If your cards sum up to a value within the range [12, 16] you should always stand unless the dealer has a 7 or higher, in which case you should always hit.

The overall logic has already been implemented. You have four tasks:

## 1. Calculate the score of any given card.

Implement a function to calculate the numerical value of a card given its name using conditionals.

```go
value := ParseCard("ace")
fmt.Println(value)
// Output: 11
```

## 2. Determine if two cards make up a Blackjack.

Implement a function that returns `true` if two cards form a Blackjack, `false` otherwise.

```go
isBlackjack := IsBlackjack("queen", "ace")
fmt.Println(isBlackjack)
// Output: true
```

## 3. Implement the decision logic for hand scores larger than 20 points.

Implement a function that returns the string representation of a decision given your cards. This function is only called if the `handScore` is larger than 20. It will receive 2 arguments: `isBlackJack` and `dealerScore`. It should implement the bulletpoints in the category "Large Hand" above.

```go
isBlackJack := true
dealerScore := 7
choice := LargeHand(isBlackJack, dealerScore)
fmt.Println(choice)
// Output: "W"
```

## 4. Implement the decision logic for hand scores with less than 21 points.

Implement a function that returns the string representation of a decision given your cards. This function is only called if the `handScore` is less than 21. It will receive 2 arguments: `handScore` and `dealerScore`. It should implement the bulletpoints in the category "Small Hand" above.

```go
handScore := 15
dealerScore := 12
choice := SmallHand(handScore, dealerScore)
fmt.Println(choice)
// Output: "H"
```

## Source

### Created by

- @andres-zartab

### Contributed to by

- @tehsphinx
- @andrerfcsantos
