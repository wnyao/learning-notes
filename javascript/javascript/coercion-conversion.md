## Type Conversion

- Type conversion means transfer of data from one type to another
- Can be implicit or explicit
- Implicit conversion happened when compiler or runtime automatically convert data types
- Explicit conversion can be done by developer
- Explicit type conversion is also known as Type Casting
- Implicit type conversion is also known as Type Coercion

```js
"foo" + 1 // "foo1"
1 + true // 2
Number("0x11") // 17
35 * "hello" // NaN
```

## Type Coercion

- Type coercion is the automatic or implicit conversion of value from one type to another
- Type conversion is similar to type coercion but with one key difference
- Type coercion is implicitly whereas type conversion can be implicit or explicit
- Implicitly convert
- Because JS is a weakly typed language, JS coerce the type to fit the other so the operation can be carried out

```js
// JS coerced the 9 from a number into a string and then concatenated the two values together
const value1 = "5";
const value2 = 9;
let sum = value1 + value2;

console.log(sum); // "59"
```

The compiler could have coerced the 5 into a number and returned a sum of 14, but it did not. To return this result, you'd have to explicitly convert the 5 to a number using the Number() method

```js
sum = Number(value1) + value2;
```

## Loose or Strict equality check

- Loose equality check does a loose check
- It checks value are equal, the types are not a focus for this operator
- In loose equality check, coercion happens before comparison occurs

```js
20 == '20' // true
```

### Reference

- [Type Conversion](https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion)
- [Type Coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)
- [Coercion and Type Conversion in JavaScript – Explained with Code Examples](https://www.freecodecamp.org/news/coercion-and-type-conversion-in-javascript/)
