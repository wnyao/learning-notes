# Dom

- DOM short for Document Object Model
- DOM is a tree-like structure constructed from the HTML when browser receives a webpage from server
- A structural representation of web documents as nodes and objects
- An interface where javascript and scripting languages can interact, manipulate and access the document's content
- DOM operations are fast and lightweight, but become expensive for re-rendering (document get rebuild and repaint)

# Virtual Dom

- Lighter replica of DOM in the form of objects
- Provides mechanism that allows the actual DOM to compute minimal DOM operations when re-rendering the UI; optimize performance
- Virtual DOM conforms with its declarative approach, allows us to specify the state we want the UI to be in
- After virtual DOM is updated, react compares it to a snapshot of the virtual DOM, determines which element has changed, and update the only element in actual DOM

```js
// jsx
const update = () => {
 const element = (
  <>
   <h3>React:</h3>
   <form>
    <input type="text" />
   </form>
   <span>Time: {new Date().toLocaleTimeString()}</span>
  </>
 );

 root.render(element);
};

// plain react
const element = React.createElement(
 React.Fragment,
 null,
 React.createElement("h3", null, "React:"),
 React.createElement(
  "form",
  null,
  React.createElement("input", {
   type: "text"
  })
 ),
 React.createElement("span", null, "Time: ", new Date().toLocaleTimeString())
);
```

### Rendering & Reconciliation

- When application is render, react creates a virtual DOM tree representing that UI and stores it in memory
- On the next update, react will automatically create a new virtual DOM tree for the update 
- And compare it to previous snapshot using diff algorithm called reconciliation
- After reconciliation process, react uses library renderer ReactDOM to update the rendered app
- ReactDOM ensures only the updated node get repainted in the actual DOM

### The diff process

- React diffs two virtual DOM trees, it begins by comparing whether or not both snapshots have the same root element
- If they have the same element, react moves to recurses on attributes
- If no attributes is present or updated on the element, it repeats the procedure on the children
- Upon seeing changes, React will update the actual node in the real DOM
- If both snapshot has different element types, react will destroy the old DOM nodes and build a new one


### Reference

- [What is the virtual Dom in React?](https://blog.logrocket.com/virtual-dom-react/#:~:text=The%20virtual%20Dom%20provides%20a%20mechanism%20that%20abstracts%20manual%20Dom,necessary%20on%20the%20actual%20Dom.)
- [The diffing algorithm](https://reactjs.org/docs/reconciliation.html#the-diffing-algorithm)
- [Preserving and Resetting State](https://beta.reactjs.org/learn/preserving-and-resetting-state)
- [A deep dive into React Fiber](https://blog.logrocket.com/deep-dive-react-fiber/#:~:text=React%20Fiber%20is%20an%20internal,long%2Dstanding%20issues%20in%20React.)
- [An Introduction to React Fiber - The Algorithm Behind React](https://www.velotio.com/engineering-blog/react-fiber-algorithm)
