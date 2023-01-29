# Difference between null, undefined, and not defined

```js
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"
```

## Undefined

```js
function typeOfA() {
  var a;
  console.log(typeof a, "a"); // "undefined"
}

function typeOfUndefinedInArray() {
  let numArray = [1, 2, , 4];
  console.log(numArray); // [1, 2, empty, 4]
  console.log("type: ", typeof numArray[2]); // "undefined"
}
```

## Null

```js
// NOTE: Any arithmetic operation with null value will result in integer value
function nullArithmetic() {
  let a = 7 + null;
  console.log(a); // 7

  let b = 7 * null;
  console.log(b); // 0
}

// NOTE: any arithmetic operation with undefined with result in value of NaN
function undefinedArithmetic() {
  let c = 8 + undefined;
  console.log(c); // NaN

  let d = 8 * undefined;
  console.log(d); // NaN
}
```

## Not Defined

Not defined referred to a variable which is not declared at a given point of time with declaration keyword like `let` or `const`.

```js
function notDefined() {
  // NOTE: It is undefined because of variable hoisting
  console.log(a); // undefined
  var a = 5;
}

function notDefinedVar() {
  console.log(b); // "ReferenceError: b is not defined
  const b = 5;
}
```

### Reference 

- [Difference between null, undefined, and not defined in javascript](https://bit.ly/2Y7xpxi)
