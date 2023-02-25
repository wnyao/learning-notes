# React Lifecycle

- Three phases: Mounting, Updating, Unmounting

### Mounting

- constructor - calls before anything, usually for initializes component
- getDerivedStateFromProps - calls right before rendering to DOM; static methods
- render - method to output HTML to the DOM
- componentDidMount - calls after component is rendered; places to initializes statements or effects

### Updating

- getDerivedStateFromProps
- shouldComponentUpdate - method where you can specify whether to continue render or not
- render
- getSnapshotBeforeUpdate - method where you can access the props and state before the update
- componentDidUpdate - calls after the component is updated in the DOM

### Upmounting

- componentWillUnmount - calls when component is about to be removed from the DOM

# State and Lifecycle

- Lifecycle methods allowed declare special methods to run some code.
- `componentDidMount()` method runs after component output has been rendered to DOM.
- `componentWillUnmount()` tear down component

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
```

#### Steps taken on above component

1. `<Clock/>` passed to `ReactDOM.render()`, React calls constructor of `Clock` component, initializes `this.state`.
2. React calls `Clock` components's `render()` method, learns what should be displayed. Then updates the DOM to match `Clock`'s render output.
3. When `Clock` output is inserted in the DOM, React calls `componentDidMount`, set up timer and call `tick()` method.
4. The `Clock` component schedules UI update by calling `setState` every second from `tick()` method.
5. If `Clock` component is removed from DOM, React calls `componentWillUnmount`.

### Using State Correctly

- The only place you can assign `this.state` is constructor.
- Props and state updates may be asynchronous.
- React may batch multiple `setState()` calls into single update for performance.
- State updates are merged and merging is shallow.

Use second form of `setState()` that accept function to fix asynchronous calculation.

```jsx
this.setState((state, props) => ({
  return state.counter + props.increment
}));
```

### The Data Flows Down

- Neither parent nor child components know certain component is stateful or stateless.
- State is local and encapsulated.
- React follows "top-down" or "unidirectional" data flow.
- Data or UI derived from state can only affect components below the tree.

# Reference

- [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [React Lifecycle](https://www.w3schools.com/react/react_lifecycle.asp#:~:text=Each%20component%20in%20React%20has,Mounting%2C%20Updating%2C%20and%20Unmounting.)
- [State: A Component's Memory](https://beta.reactjs.org/learn/state-a-components-memory)
