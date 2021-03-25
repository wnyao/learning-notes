# [Element](https://reactjs.org/docs/rendering-elements.html)

```
const element = <h1>Hello, world</h1>;
```

- Smallest building blocks of React apps
- Element describes what you want to see on screen
- Plain object and cheap to create
- Unlike browser DOM
- React DOM takes care of updating DOM to match React elements

### Rendering element into DOM

The following is a "root" DOM node, everything inside will be managed by React DOM.

```jsx
<div id="root"></div>
```

- Applications usually have single root DOM node.
- One might have as many isolated root DOM nodes as one like.

To reander React element into root DOM node:

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById("root"));
```

### Updating rendered element

- React elements are immutable.
- Once create, you can't change its children or attributes.
- It represents UI at certain point in time.
- To update the UI is to create a new element, and pass to `ReactDOM.render()`

### React updates what's necessary

- ReactDOM compares element and children to the previous one, and applies DOM updates to desired state if necessary.

# Reference

- [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
