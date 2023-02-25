# Flatten

Given an array of nested arrays, flatten it similar to `Array.prototype.flat`

```js
// input
const a = [1, [2, [3, 4]]];

// output
const a = [1, 2, 3, 4]];
const result = flatten(a);
```

### Solution

```js
function flatten(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result = result.concat(arr[i]);
    }
  }

  return result;
}
```
