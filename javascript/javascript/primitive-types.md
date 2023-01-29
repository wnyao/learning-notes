# Primitive Types

- In JS, primitive is data that is not an object
- Represented directly the lowest level of the language implementation
- All primitives are immutable; that is, they cannot be altered
- Not to confused with a variable assigned a primitive value. The variable may be reassigned to new value, but the existing value can not be changed in the ways tha way that object, arrays, and functions can be altered.
- Primitive have no methods. When properties are accessed on primitives, JS auto-boxes the value into wrapper object and accesses the property on that object. Eg. `"foo".includes('f')` implicitly creates a String wrapper object and call `String.prototype.includes()` on that object.
 
### Common primitive types

- string
- number
- bigint
- boolean
- undefined
- symbol
- null

### BigInt

- a numeric data type that can represent integers in the arbitrary precision format.

### Symbol

- built-in object whose constructor returns a symbol primitive, also called a Symbol value or just a Symbol.
- Every `Symbol()` call is guaranteed to return a unique Symbol.
- Symbols are often used to add unique property keys to an object that won't collide with keys any other code might add to the object.
- Symbol can simulate private variables that will not be traversed by conventional object methods. Require the use of `Object.getOwnPropertySymbols`

```js
const sym1 = Symbol("foo");

const sym = Symbol(); // TypeError
Symbol("foo") !== Symbol("foo") // false
```

- `Symbol()` function will create symbol whose value remains unique throughout the lifetime of the program.
- To create Symbols available across files and even across realms, use methods `Symbol.for()` and `Symbol.keyFor()` to set and retrieve symbols from the global Symbol registry.
- `Symbol.for(tokenString)` takes a string key and returns a symbol value from the registry
- `Symbol.keyFor(symbolValue)` takes a symbol value and returns the string key corresponding to it

```js
Symbol.keyFor(Symbol.for("tokenString")) === "tokenString"; // true
```

- Symbol are not enumerable in `for...in` iterations

```js
const obj = {};

obj[Symbol("a")] = "a";
obj[Symbol.for("b")] = "b";
obj["c"] = "c";
obj.d = "d";

for (const i in obj) {
  console.log(i);
}

// "c" "d"
```

- Symbol-keyed properties will be completely ignored when using `JSON.stringify()`

```js
JSON.stringify({ [Symbol("foo")]: "foo" });
// '{}'
```

### Reference

- [Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
- [BigInt](https://developer.mozilla.org/en-US/docs/Glossary/BigInt)
- [Object.getOwnPropertySymbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)
