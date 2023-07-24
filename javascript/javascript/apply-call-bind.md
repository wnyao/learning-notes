# Apply vs. Call vs. Bind

- `call` and `apply` are interchangeable, you can decide whether it's easier to send in an array or a common separated list of arguments.
- `bind` return new function.

## Function.prototype.call

- `call` method calls a function with given `this` context and arguments provided individually.
- accepts an argument list

```js
let customer1 = { name: "Leo", email: "leo@gmail.com" };
let customer2 = { name: "Nat", email: "nat@hotmail.com" };

function greeting(text) {
  console.log(`${text} ${this.name}`);
}

greeting.call(customer1, "Hello"); // Hello Leo
greeting.call(customer2, "Hello"); // Hello Nat
```

The call implementation in vanilla JS:

```js
Function.prototype.call = function (context, ...args) {
  context = context || window;
  
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  
  context[fnSymbol](...args);
  delete context[fnSymbol];
}
```

## Function.prototype.apply

- `apply` method calls a function with a given `this` value, and `arguments` provided as an array (or an array-like object).
- similar to `call()` except that it accepts a single array of arguments

```js
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);
console.log(max); // 7


const array = ["a", "b"];
const elements = [0, 1, 2];

array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

The apply implementation in vanilla JS:

```js
Function.prototype.apply = function (context, argsArr) {
  context = context || window;
  
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  
  context[fnSymbol](...argsArr);
  delete context[fnSymbol];
}
```


## Function.prototype.bind

```
let boundFunc = func.bind(thisArg[, arg1[, arg2[, argN]]]);
```

- `bind` method creates a new function that, when called, has its `this` keyword set to the context, with a given sequence of arguments preceding any provided when the new function is called.

```js
let customer1 = { name: "Leo", email: "leo@gmail.com" };
let customer2 = { name: "Nat", email: "nat@hotmail.com" };

function greeting(text) {
  console.log(`${text} ${this.name}`);
}

let helloLeo = greeting.bind(customer1);
let helloNat = greeting.bind(customer2);

helloLeo("Hello"); // Hello Leo
helloNat("Hello"); // Hello Nat
```

The bind implementation in vanilla JS:

```javascript
Function.prototype.bind = function (context, ...args) {
  context = context || window;
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  
  return function (..._args) {
    args = args.concat(_args);
    
    context[fnSymbol](...args);
    delete context[fnSymbol];   
  }
}
```

The value to be passed as `this` parameter to the target function `func` when the bound function is called. The value is ignored if the bound function is constructed using the `new` operator.

```js
function greeting(text) {
  console.log(`${text} ${this.name}`);
}

let customer1 = { name: "Leo", email: "leo@gmail.com" };

const helloLeo = greeting.bind(customer1);
new helloLeo("hello"); // hello undefined
```

### Function borrowing

- Function borrowing is borrowing the function from object rather than redefining it
- Function borrowing is usually a workaround for poor initial design

```js
let car1 = {
  speed: 80,
  getSpeed: function () {
    return this.speed;
  },
};

let car2 = {
  speed: 60,
};

console.log(car1.getSpeed());
console.log(car1.getSpeed.call(car2)); // borrowing getSpeed from car1
```

### Function currying

- Currying is a advanced technique of working with function
- Currying is a transformation of function

```js
function curry(f) { 
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);
console.log(curriedSum(1)(2)); // 3
```

### Reference

- [Javascript tips — Apply vs. Call vs. Bind](https://medium.com/@leonardobrunolima/javascript-tips-apply-vs-call-vs-bind-d738a9e8b4e1)
- [Function.prototype.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)
- [Currying](https://javascript.info/currying-partials)
