### Josephus Problem

### Description

There are 30 children, numbered from 1-30, in a circle to count according to this, the child who counts 1, 2, 3 to 3 exits the circle, and then the next child counts 1, 2, 3 again, ask What is the number of the last remaining child?

### Solution

```js
const remaining = ((length, k) => {
  let children = Array.from({ length }, (_, i) => i + 1);
  let i = 0;

  while (children.length > 1) {
    i = (i + k - 1) % children.length;
    children.splice(i, 1);
  }

  return children[0];
})(30, 3);

console.log(remaining); // 29
```
