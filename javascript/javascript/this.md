# this

- The value of `this` is determined by how a function is called (runtime binding)
- Can't be set by assignment during execution
- May different each time the function is called, e.g. Dynamic binding or statically bound

![the this flowchart](https://www.debuggr.io/static/f0e49d9509fa837ca7322cedf793be6a/4815e/the-this-flow-chart.png)

### Static

- Every time a function is invoked, a new execution is created and pushed to top of the call-stack. 
- There is default execution context, global context, or can be of local scope.

```js
function foo() {
  var message = 'hello';
  console.log(message);
}

foo();
```

### Dynamic

```js
window.message = 'world';

function foo() {
  console.log(this.message);
}

const myObj = {
  message: 'hello',
  foo
};

myObj.foo(); // hello
foo.call(window); // world
```

### Examples

```js
// E1
// called with object method
function logThis(){
  console.log(this); // { logThis: [Function: logThis] }
}

const myObj = {
  logThis
}

myObj.logThis()
```

```js
// E2
// none strict mode; default case
function logThis(){
  console.log(this); // globalThis
}

const myObj = {
  foo: function(){
    logThis();
  }
}

myObj.foo()
```

```js
// E3
// arrow function; whatever this set in the wrapping function context
// in this case, the global execution context
const logThis = () => {
  console.log(this); // globalThis
}

const myObj = {
  foo: function () {
    logThis();
  },
};

myObj.foo();
```

```js
// E4
// explicitly passed object
function logThis() {
  console.log(this); // { name: 'sag1v' }
}

const myObj = { name: "sag1v" }
logThis.apply(myObj)
```

```js
// E5
// arrow function; whatever this set in the wrapping function context
// in this case, the global execution context
const logThis = () => {
  console.log(this); // {}
}

const myObj = { name: "sag1v" }

logThis.apply(myObj)
```

```js
// E6
// called by new object
function logThis(){
  console.log(this); // logThis {}
}

const someObj = new logThis()
```

```js
// E7
// strict mode: resulting to undefined
function logThis(){
  'use strict'
  console.log(this); // undefined
}

function myFunc(){
  logThis();
}

const someObj = new myFunc()
```

```js
// E8
// default case; none strict mode
function logThis(){
  console.log(this); // globalThis object
}

class myClass {
  logThat(){
    logThis()
  }
}

const myClassInstance = new myClass()
myClassInstance.logThat()
```

```js
// E9
// explicitly passed object
function logThis(){
  console.log(this); // myClass {}
}

class myClass {
  logThat(){
    logThis.call(this)
  }
}

const myClassInstance = new myClass()
myClassInstance.logThat()
```

```js
// E10
// arrow function; refer to whatever the wrapping context
class myClass {
  logThis = () => {
    console.log(this); // myClass { logThis: [Function: logThis] }
  }
}

const myObj = { name: 'sagiv' };

const myClassInstance = new myClass()
myClassInstance.logThis.call(myObj)
```

```js
// E11
function logThis() {
  console.log(this); // the btn element
}

const btn = document.getElementById('btn');
btn.addEventListener('click', logThis);
```

```js
// E12
// arrow function; refer to whatever the wrapping context
const logThis = () => {
  console.log(this); // globalThis
}

const btn = document.getElementById('btn');
btn.addEventListener('click', logThis);
```

```js
// E13
// default case; Classes are always strict mode code. Calling methods with an undefined this will throw an error.
class myClass {
  logThat() {
    function logThis() {
      console.log(this); // undefined
    }

    logThis()
  }
}

const myClassInstance = new myClass()
myClassInstance.logThat()
```

### Conclusion

- Arrow functions will make it static and won't even bother to mutate `this` at all. Which means we will need to understand what `this` was set to in the wrapping execution context.
- Plain Functions will make it dynamically, meaning it depends on how the function is invoked.

### Reference

- [JavaScript - The "this" key word in depth](https://www.debuggr.io/js-this-in-depth/#the-quiz)
- [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

