## React

- React is **a javascript library for building user interfaces**.
- React makes it **painless to create interactive UIs**, **simple views for each state in your application**, and will **efficiently update and render just the right components when data changes**.
- **Component-Based** - build encapsulated components that manage their own state and lifecycle, then compose to make complex UIs.
- Provides features such as state management and component lifecycle.

## Element

```
const element = <h1>Hello, world</h1>;
```

- Elements are the **smallest building blocks of React apps**.
- Unlink browser DOM elements, **React elements are plain objects**.
- **Cheap to create.**

## Components and Props

- Like javascript functions
- accept arbitrary inputs, called props.
- return React elements

```
function sum(a, b) {
  return a + b;
}
```

- functions are called "pure", because they **do not attempt to change their inputs**, and **always return the same result from the same inputs** no matter the same arguments given.

### React.Component

- Base class for React components when there are defined using ES6 classes.

### React.PureComponent

- Similar ro `React.Component`. The difference between them is `React.Component` doesn't implement `shouldComponentUpdate()`, but `React.PureComponent` implements it with a shallow prop and state comparison.

### Stateful Component

- Component can maintain internal state data (access via `this.state`). When component's state data changes, the rendered markup will be updated by reinvoking `render()`.

### Controlled Component

- usually use on form input elements, these elements typically maintain their own state and update it based on user inputs.
- **An element whose value is controls by React state in way to maintain "Single source ef truth"** is caleld "controlled components"

### Uncontrolled Component

- uncontrolled component keeps the source of truth in the DOM
- slightly less code; quick and dirty

## State and Lifecycle

## Reference

- [React](https://www.reactjs.org)
