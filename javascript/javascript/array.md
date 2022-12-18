# Array

### Array.length

```js
// there will be 21 in length, from index 0 to 20
var a = [];
a.push("b");
a[20] = 22;
a[20] = undefined;
console.log(a.length); 
```

### Ways to create indexed array

```js
const a = Array.from(Array(6).keys());
const c = Array(6).fill("").map((_, i) => i);
const b = [...Array(6)].map((_, i) => i);
const d = [...Array(6).keys()];
```
