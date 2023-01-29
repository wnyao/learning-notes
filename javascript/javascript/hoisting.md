# Hoisting

- JS has default behavior of moving all declarations to the top of global scope
- A variable can be declared after used

### `var` keyword

```javascript
// E1
x = 5; // initialized x

elem = document.getElementById("demo");
elem.innerHTML = x;

var x; // declare x
```

```javascript
// E2
var x; // declare x
x = 5; // initialized x

elem = document.getElementById("demo");
elem.innerHTML = x;
```

### `let` and `const` keywords

- hoisted to top of the block, but not initialized.

```javascript
// E1
car = "volvo";
let car; // ReferenceError: Cannot access 'car' before initialization 
```

## Initializations are not hoisted

- Javascript only hoist declarations, not initialization.

```javascript
// E1
// innerHTML will result to "5 7"
var x = 5; // initialize x
var y = 5; // initialize y

elem = document.getElementById("demo");
elem.innerHTML = x + " " + y;
```

```javascript
// E2
// innerHTML will result to "5 undefined"
// only the declaration `var y`, not the initialization `= 5` is hoisted
var x = 5; // initialize x

elem = document.getElementById("demo");
elem.innerHTML = x + " " + y;

var y = 5; // initialize y
```

### Reference

- [Javascript Hoisting](https://www.w3schools.com/js/js_hoisting.asp)
- [Hoisting in JavaScript with let and const - and How it Differs from var](https://www.freecodecamp.org/news/javascript-let-and-const-hoisting/#:~:text=As%20I've%20explained%20in,a%20default%20initialization%20of%20undefined%20.)
