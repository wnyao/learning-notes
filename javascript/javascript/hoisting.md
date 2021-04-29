# Hoisting

- Javascript's default behavior of moving all declarations to the top of the current scope (top of current script or current function)
- A variable can be declared after used

**Example 1**

```javascript
x = 5; // initialize x

elem = document.getElementById("demo");
elem.innerHTML = x;

var x; // declare x
```

**Example 2**

```javascript
var x; // declare x
x = 5; // initialize x

elem = document.getElementById("demo");
elem.innerHTML = x;
```

## `let` and `const` keywords

- variable with `let` and `const` defined, are hoisted to top of the block, but not initialized.

**Example 1**

This will result `ReferenceError`

```javascript
car = "volvo";
let car;
```

**Example 2**

This will result `SyntaxError`

```javascript
car = "volvo";
let car;
```

## Initializations are not hoisted

- Javascript only hoist declarations, not initialization.

**Example 1**

- `innerHTML` will result to `5 7`

```javascript
var x = 5; // initialize x
var y = 5; // initialize y

elem = document.getElementById("demo");
elem.innerHTML = x + " " + y;
```

**Example 2**

- `innerHTML` will result to `5 undefined`
- only the declaration `var y`, not the initialization `= 5` is hoisted

```javascript
var x = 5; // initialize x

elem = document.getElementById("demo");
elem.innerHTML = x + " " + y;

var y = 5; // initialize y
```

### Reference

- [Javascript Hoisting](https://www.w3schools.com/js/js_hoisting.asp)
