# [Components and Props](https://reactjs.org/docs/components-and-props.html)

- Allow split UI into indenpedent, reusable pieces, in isolation.
- Components are like functions
- Accept arbitrary inputs called props and return elements

```jsx
// Function component example
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Class compoent example
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### Rendering Component

- elements can be represent as DOM tags or user-defined components

```jsx
// Dom tags
const element = <div />;

// user-defined components
const element = <Welcome name="Sara" />;
```

- JSX attributes and children is pass as object "props".
- Componenets can refer other components in their output.
- Props are read-only
- Function component is pure when they do not attempt to change their inputs, and always return same result for same inputs.
- React components must act like pure functions with respect to their props.

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
