# Principles of promise

```js
class MyPromise {
  constructor(fn) {
    this.callbacks = [];
    this.state = "PENDING";
    this.value = null;

    // new MyPromise((resolve, reject) => ...)
    // bind return new function
    fn?.(this._resolve.bind(this), this._reject.bind(this));
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) =>
      this._handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve,
        reject,
      })
    );
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  _handle(callback) {
    // if current handler is busy, add to callbacks queue
    if (this.state === "PENDING") {
      this.callbacks.push(callback);
      return;
    }

    const hasPreviousFulfilled = this.state === "FULFILLED";
    let cb = hasPreviousFulfilled ? callback.onFulfilled : callback.onRejected;

    // if no callback, resolve or reject with this._resolve or this._reject
    if (!cb) {
      cb = hasPreviousFulfilled ? callback.resolve : callback.reject;
      cb(this.value);
      return;
    }

    // continue with onFulfilled or onRejected
    let ret;

    try {
      // onFulfilled with value from the previous promise
      ret = cb(this.value);
      cb = hasPreviousFulfilled ? callback.resolve : callback.reject;
    } catch (error) {
      ret = error;
      cb = callback.reject;
    } finally {
      cb(ret);
    }
  }

  _resolve(value) {
    // if resolved with object or function
    if (value && ["object", "function"].includes(typeof value)) {
      // then derived from binding in constructor, function borrowing
      let then = value.then;

      if (typeof then === "function") {
        then.call(value, this._resolve.bind(this), this._reject.bind(this));
        return;
      }
    }

    this.state === "FULFILLED";
    this.value = value;
    this.callbacks.forEach(this._handle);
  }

  _reject(error) {
    this.state === "REJECTED";
    this.value = error;
    this.callbacks.forEach(this._handle);
  }
}
```

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("fail")), 3000);
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000);
});

p2.then((result) => console.log(result)).catch((error) => console.log(error));
```

### Reference 

- [字节跳动最爱考的前端面试题：JavaScript 基础](https://juejin.cn/post/6934500357091360781)
