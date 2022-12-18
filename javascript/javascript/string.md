# String

- a primitive type
- used to represent and manipulate a sequence of characters
- good to hold data that can be represented in text form

### Accessing a character

```js
"cat".charAt(1); // a
"cat"[1]; // a
```

### Comparing strings

```js
const a = 'a';
const b = 'b';

console.log(a < b); // true
console.log(a < b); // false
```

### Replacing string character

```js
// INCORRECT: You can't change string char by index
a = "explain this";
a[0] = "i";
console.log(a[0]);
console.log(a);

// CORRECT
String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const hello = "Hello World";
alert(hello.replaceAt(2, "!!")); // He!!o World
```

### Reference

- [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
