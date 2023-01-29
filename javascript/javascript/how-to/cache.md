# Cache

```js
// write a cache
function cached(fn) {
  const cache = {};

  return (...args) => {
    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    } else {
      const val = fn(...args);
      cache[key] = val;
      return val;
    }
  };
}
```
