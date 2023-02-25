### Question

Write a function that accepts a string input and returns a reversed copy

### Solution

```js
function reverseCopy(string) {
  let strArr = [];

  for (let i of string) {
    strArr.push(i);
  }

  return strArr.reverse().join("");
}

const result = reverseCopy("hello world");
console.log(`result: `, result); // dlrow olleh
```
