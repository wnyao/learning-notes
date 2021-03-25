# [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

- lifecycle methods allowed declare special methods to run some code.
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

1. `<Clock/>` passed to `ReactDOM.render()`, React calls constructor of `Clock` component, initilizes `this.state`.
2. React calls `Clock` components's `render()` method, learns what should be displayed. Then updates the DOM to match `Clock`'s render output.
3. When `Clock` output is inserted in the DOM, React calls `componentDidMount()`, set up timer and call `tick()` method.
4. The `Clock` component schedules UI update by calling `setState()` every second from `tick()` method.
5. If `Clock` component is removed from DOM, React callse `componentWillUnmount()`.

### Usig State Correctly

- The only place you can assign `this.state` is constructor.
- Props and state updates may be asynchronous.
- React may batch multiple `setState()` calls into single update for performance.
- State updates are merged and merging is shallow.

Use second form of `setState()` that accept function to fix asynchronous calculation.

```jsx
this.setState((state, props) => ({
    conunter state.counter + props.increment
}));
```

### The Data Flows Down

- Neither parent nor child components know certain component is stateful or stateless.
- State is local and encapsulated.
- React follows "top-down" or "unidirectional" data flow.
- Data or UI derived from state can only affect components below the tree.

# Reference

- [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
