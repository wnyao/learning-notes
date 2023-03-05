### Question

Some people are standing in a row in a park. There are trees between them which cannot be moved. Your task is to rearrange the people by their heights in a ascending order without moving the trees. People can be very tall!

### Example

For `a = [-1, 150, 190, 170, -1, -1, 160, 180]`, the output should be`solution(a) = [-1, 150, 160, 170, -1, -1, 180, 190]`.

### Input/Output

- [execution time limit] 4 seconds (js)
- [input] array.integer a - If `a[i] = -1`, then the `ith` position is occupied by a tree. Otherwise `a[i]` is the height of a person standing in the `ith` position.
- [output] array.integer - Sorted array `a` with all the trees untouched.

```js
const solution = (a) => {
  // filter -1 to and sort by ascending order 
  const validNumbers = a.filter(e => e !== -1).sort((a, b) => a - b)

  // Array.shift will return remove item from array head and alter the original array 
  return a.map((e) => e === -1 ? e : validNumbers.shift());
}
```
