# Apply vs. Call vs. Bind

- `call` and `apply` are interchangeable, you can decide whether it's easier to send in an array or a common separated list of arguments.
- `bind` return new function.

## [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

`call()` method calls a function with given `this` context and arguments provided individually.

```javascript
let customer1 = { name: "Leo", email: "leo@gmail.com" };
let customer2 = { name: "Nat", email: "nat@hotmail.com" };

function greeting(text) {
  console.log(`${text} ${this.name}`);
}

greeting.call(customer1, "Hello"); // expected output: Hello Leo
greeting.call(customer2, "Hello"); // expected output: Hello Nat
```

## [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

`apply()` method calls a function with a given `this` value, and `arguments` provided as an array (or an array-like object).

```javascript
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);
console.log(max); // expected output: 7

const min = Math.min.apply(null, numbers);
console.log(min); // expected output: 2
```

## [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)

```
let boundFunc = func.bind(thisArg[, arg1[, arg2[, argN]]]);
```

`bind()` method creates a new function that, when called, has its `this` keyword set to the context, with a given sequence of arguments preceding any provided when the new function is called.

```javascript
let customer1 = { name: "Leo", email: "leo@gmail.com" };
let customer2 = { name: "Nat", email: "nat@hotmail.com" };

function greeting(text) {
  console.log(`${text} ${this.name}`);
}

let helloLeo = greeting.bind(customer1);
let helloNat = greeting.bind(customer2);

helloLeo("Hello"); // expected output: Hello Leo
helloNat("Hello"); // expected output: Hello Nat
```

The bind implementation would be like:

```javascript
Function.prototype.bind = function (context) {
  var fn = this;
  return function () {
    fn.apply(context, arguments);
  };
};
```

The value to be passed as the `this` parameter to the target function `func` when the bound function is called. The value is ignored if the bound function is constructed using the `new` operator.

```javascript
const helloLeo = greeting.bind(customer1);
new helloLeo("hello"); // expected output: hello undefined
```

### Reference

- [Javascript tips — Apply vs. Call vs. Bind](https://medium.com/@leonardobrunolima/javascript-tips-apply-vs-call-vs-bind-d738a9e8b4e1)
