### Question

Write a function that accepts a string input and returns a reversed copy

### Example

```js
const result = reverseCopy("hello world");
console.log(`result: `, result); // dlrow olleh
```

### Solution

```js
function reverseCopy(string) {
  return [...string].reverse().join("");
}
```

```js
function reverseCopy(string) {
  let stringArray = [...string];
  let reverseArray = [];

  for (let i = stringArray.length - 1; i >= 0; i--) {
    reverseArray.push(stringArray[i])
  }

  return reverseArray.join("")
}
```
