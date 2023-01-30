# Scope

- Scope is the context environment (lexical environment) created when a function is written.
- Two kinds of scopes: global and local scope.
- Scope Resolution; Scope is used to manage how engine searches variables based on identifier names in the current scope. 
- Scope resolution starts in the innermost context and proceeds outward until the identifier is found.
- Global execution context is always running, close only when browser is closed.
- Function execution context is always forms when the function is invoked.

> JS is a single threaded language, it can do only one thing at a time. When function is called, the previous execution context is paused. The called function is on the top and is then executed. When that finishes, it popped off the stack and then the older execution context is resumed.

### Scope chain

- The scope chain is a list of Variable/Activation object
- A way to link or provide systematic access to all variables and other functions that the current execution context has access to
- Each execution has an associated variable object
- In global execution context, variable object is created
- Activation object is not accessible by code, it operates in the background. It holds all declared variables, functions, and parameters passed in that context.

> At the head of the scope chain, if it is function, is the Activation object. The Activation object has it's own declared variables, arguments, and this. Next on the chain is the next object from the containing context, variable or activation object. This repeat until global context is reached.

> If a variable or property is not found, it continues up the chain until it is either found or an error is thrown.

### Closure

- Without being able to leverage scope chain rules, async operations would be impossible
- Scope chain guarantee that data will still be around to use later

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

### Reference

- [Deep dive into Scope Chains and Closures](https://www.freecodecamp.org/news/deep-dive-into-scope-chains-and-closures-21ee18b71dd9/#:~:text=The%20scope%20chain%20is%20a,this%20case)%20has%20access%20to.)
