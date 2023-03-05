### Question

Given a sequence of integers as an array, determine whether it is possible to obtain a strictly increasing sequence by removing no more than one element from the array.
Note: sequence `a0, a1, ..., an` is considered to be strictly increasing if `a0 < a1 < ... < an`. Sequence containing only one element is also considered to be strictly increasing.

### Example

- For `sequence = [1, 3, 2, 1]`, the output should be `false`.
  > There is no one element in this array that can be removed in order to get a strictly increasing sequence.
    
- For `sequence = [1, 3, 2]`, the output should be `true`. 
  > You can remove `3` from the array to get the strictly increasing sequence `[1, 2]`. Alternately, you can remove `2` to get the strictly increasing sequence `[1, 3]`.
    
### Input/Output

- [input] array.integer
- [output] boolean - Return `true` if it is possible to remove one element from the array in order to get a strictly increasing sequence, otherwise return `false`.

### Solution

```js
const isIncreasingSequence = (sequence) => {
  let removingCount = 0;
  let numbers = sequence.slice(0, 1);

  for (let i = 1; i < sequence.length; i++) {
    const currentVal = sequence[i];

    // sequence containing one element is considered strictly increasing
    // similar element appearing twice anywhere in the array
    if (currentVal < sequence[i - 1] || numbers.includes(currentVal)) {
      removingCount += 1
    }

    numbers.push(currentVal)
  }

  // by removing no more than one element from array
  return removingCount <= 1
}
```
