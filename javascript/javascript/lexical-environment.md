# Lexical Environment

- data structure that holds **identifier-variable mapping**
- **identifier** refers to the name of variables/functions.
- **variable** refers to actual object/primitive value.

During compile phase, just microseconds before your code is executed, it is scanned for function and variable declarations. All these functions and variable declarations are added to the memory inside a JavaScript data structure called **Lexical environment**.

```js
// conceptually look sth like this
LexicalEnvironment = {
  Identifier:  <value>,
  Identifier:  <function object>
}
```

### Reference

- [Hoisting in Modern JavaScript — let, const, and var](https://blog.bitsrc.io/hoisting-in-modern-javascript-let-const-and-var-b290405adfda)
