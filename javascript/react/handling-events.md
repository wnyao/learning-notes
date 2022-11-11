# [Handling Events](https://reactjs.org/docs/handling-events.html)

- React events are named using camelCase, rather than lowercase
- With JSX you pass function as event handler, rather than string.

```jsx
// HTML DOM element
<button onclick="activateLasers()">
  Activate Lasers
</button>

// React JSX element
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

- Cannot return `false` to prevent default behavior in React, must call `preventDefault` explicitly.
- React uses synthetic event, accoding to W3C spec
- React events do not work the same as native events.

```jsx
// HTML DOM element
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>;

// React JSX element
function ActionLink() {
  // NOTE: e is synthetic event
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

- In javascript, class methods are not bound by default.
- The binding in class component is necessary to make `this` work in JSX callback. Else this will be `undefined` when called.
- This is not React specified behavior; is part of how functions work in javascript.

### Passing arguments to Event Handlers

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

In both cases, the e argument representing the React event will be passed as a second argument after the ID. With an arrow function, we have to pass it explicitly, but with bind any further arguments are automatically forwarded.

# Reference

- [Handling Events](https://reactjs.org/docs/handling-events.html)
