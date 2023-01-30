# Shallow clone & Deep clone

#### Shallow clone

```js
function shallowClone(obj) {
  let cloneObj = {};
  
  for (let i in obj) {
    cloneObj[i] = obj[i];
  }
  
  return cloneObj;
}
```

#### Deep clone

- Consider the base type
- Reference type
  - RegExp, Date, functions are not JSON safe
  - The constructor will be lost, all constructors point to Object
  - Cracking circular references

```js
function deepCopy(obj) {
  if (typeof obj === 'object') {
    // check if is typeof array or object
    var result = obj.constructor === Array ? [] : {};
    
    for (var i in obj) {
      // if value is typeof object, deep copy again
      result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
    }

    return result;
  }
  
  // non object type values
  return obj;
}
```

### Reference

- [字节跳动最爱考的前端面试题：JavaScript 基础](https://juejin.cn/post/6934500357091360781)
