# React.useCallback

```javascript
const memoizedCallback = useCallback(
  // inline function
  () => {
    doSomething(a, b);
  },
  // dependencies
  [a, b], 
);
```
Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed

---

##### 1. What are the pros and cons of useCallback?

- **Pro**
  - Create memoized callback that keep same reference of the function between rerender.
  - Useful when passing callbacks to optimized child components, to avoid re-rendering of child component by ensuring that same reference of callback is being passed down.

- **Con**
  - Add additional performance cost. Cost on useCallback invocation, function re-creation and properties definitions.

---

##### 2. Should you use useCallback for everything?

- No. 

---

##### 3. When should you use them on? Think about html tags and component.

- Computationally expensive calculations, heavy component. Eg. 
  - interactive graph
  - table
  - scrolling list

- Need to ensure referential equality. Eg
  - passing down inline function as prop
  - function serves as dependency of other hooks
  - when function has state that require maintain

```javascript
// Rule of thumb for referential equality in javascript

1 === 1 // true
'a' === 'a' // true
true === true // true
false === false // true

const z = {}
z === z // true

{} === {} // false
[] === [] // false
() => {} === () => {} // false

function factory() {
  return (a, b) => a + b;
}

const sum1 = factory();
const sum2 = factory();
sum1 === sum2; // false
sum1 === sum1; // true
```

---

### 4. Can you use useCallback alone?

- No, althought useCallback maintain equality of the function. When parent component rerender, child component will always rerender.
- Good to pair with child component that is memoized or pure
- Also there would be a need to use memoized callback on general HTML tags, because thouse tag aren't memoized at base. A simple function wont change the rerendering of HTML tags.

```javascript
function App() {
  const [_, setCount] = useState(0)

  // maintain referential equality
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, [])

  return (
    <div className="App">
      <MemoizedBtn onClick={increment} label="Memoized" message='Rerender memoized button' />
      <NormalBtn onClick={increment} label="Normal" message='Rerender normal button' />
    </div>
  );
}

// this will rerender
const NormalBtn = ({ onClick, message, label }) => {
  console.log(message)

  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}

// this wont rerender
const MemoizedBtn = memo(NormalBtn)
```

## References

- [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
- [Your Guide to React.useCallback()](https://dmitripavlutin.com/dont-overuse-react-usecallback/)
- [Some misunderstandings with React.memo, useMemo, and useCallback](https://albertyuebaixu.medium.com/some-misunderstandings-with-react-memo-usememo-and-usecallback-27449b670d60)
