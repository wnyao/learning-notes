### Question

Given an array of nested arrays, flatten it similar to `Array.prototype.flat`

### Input/Output

```js
// input
const a = [1, [2, [3, 4]]];

// output
[1, 2, 3, 4];
```

### Solution

```js
function flatten(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    // If is array we recursively flatten using the function
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
      continue
    }

    result = result.concat(arr[i]);
  }

  return result;
}
```
