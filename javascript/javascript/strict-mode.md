# Strict mode

- Introduced in es5.
- `use strict` is an expression stating that javascript code should be executed in strict mode.
- Restricted version of JS, where semantics are altered to make code more resilient and secure.
  - Eliminates some JavaScript silent errors by changing them to throw errors.
  - Fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
  - Prohibits some syntax likely to be defined in future versions of ECMAScript.

```js
"use strict"
```

- In strict mode, some silent errors are changed to throw error.

```js
// strict mode
"use strict"
a = 1 // ReferenceError: a is not defined

// non strict mode
a = 1
console.log(a) // a
```

- `use strict` can be apply to local or global scope. 
- It doesn't apply to block statement enclosed with `{}`, except function body or entire scripts.

```js
a = 1;

// this will not throw an error as "use strict" is in local scope
function strictMode() {
  "use strict"
  alert("I am in strict mode");
}
```

- Using `use strict` in functions with rest, default, or destructured parameters is a syntax error.

```js
function sum(a = 1, b = 2) {
  // SyntaxError: "use strict" not allowed in function with default parameter
  "use strict";
  return a + b;
}
```

- The `this` value is equivalent to the Global object when a function is executed with no explicit `this` value specified (either by being an object method or via call() or apply())

```js
// "use strict";

var cat = {
  name: "Gus",
  printInfo: function () {
    console.log("this: ", this); // cat object

    function nestedFunction() {
      console.log("nestedFunction: ", this); // global/window in loose mode, undefined in strict mode
    }

    nestedFunction();
  },
};

cat.printInfo();
```

### Reference

- [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
