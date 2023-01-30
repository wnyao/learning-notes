# Hoisting

- JS has default behavior of moving all declarations to the top of their scope
- A variable can be declared after used

### Behaviors of hoisting:

1. Being able to use a variable's value in its scope before the line it is declared. (Value hoisting)
2. Being able to reference a variable in its scope before the line it is declared. Without throwing a ReferenceError, but the value is always undefined. (Declaration hoisting)
3. The declaration of the variable causes behavior changes in its scope before the line in which it is declared.

- function, function*, async function, and async function* declarations are considered type 1 hoisting
- var is hoisted with type 2 hoisting
- let, const, and class is hoisted with type 3 hoisting

### var

```js
// E1
x = 5; // initialized x

elem = document.getElementById("demo");
elem.innerHTML = x;

var x; // declare x
```

```js
// E2
var x; // declare x
x = 5; // initialized x

elem = document.getElementById("demo");
elem.innerHTML = x;
```

### let and const keywords

- hoisted to top of the block, but not initialized.

```js
// E1
car = "volvo";
let car; // ReferenceError: Cannot access 'car' before initialization 
```

## Initializations are not hoisted

- Javascript only hoist declarations, not initialization.

```js
// E1
// innerHTML will result to "5 7"
var x = 5; // initialize x
var y = 5; // initialize y

elem = document.getElementById("demo");
elem.innerHTML = x + " " + y;
```

```js
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
- [Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
