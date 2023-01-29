# Closure

```js
// closure will get updated value
var a = 1;
const test = () => () => console.log(a);
const func = test();
a = 2;
func();

// result
> 2
```
