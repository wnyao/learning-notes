# Effects

## `useEffect`

`useEffect(didUpdate)` accepts a function that contains imperative, possibly effectful code, which are mutations, subscriptions, timers, logging, and other side effects. By default, effects run after every completed render, but the invocation can be controlled with a second argument of an array.


## `useLayoutEffect`

`useLayoutEffect` has the same signature as useEffect, but it fires synchronously after all DOM mutations. i.e. it is fired before useEffect. It is used to read layout from the DOM and synchronously re-render. Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.

## `useInsertionEffect`

`useInsertionEffect` is introduced in React 18. It has the same signature as useEffect, but it fires synchronously before all DOM mutations. i.e. it is fired before useLayoutEffect. It is used to inject styles into the DOM before reading layout.
useInsertionEffect is intended for CSS-in-JS libraries, such as styled-components. Since this hook is limited in scope, this hook does not have access to refs and cannot schedule updates.

# Reference

- [5 New Hooks in React 18](https://betterprogramming.pub/5-new-hooks-in-react-18-300aa713cefe)
