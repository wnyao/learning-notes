### Question

Given the array, find two numbers within that the sum of both numbers equal to the given arguments.
Return true if found else false

### Solution

```js
const findEqual = (numbers, sum) => {
  if (!numbers || !sum || numbers.length === 0) return false;
  let nums = numbers.filter((x) => x < sum);

  for (let i = 0; i < nums.length; i++) {
    const num1 = nums[i];
    const diff = sum - num1;
    if (nums.includes(diff)) return true;
  }

  return false;
};

module.exports = { answer: findEqual };
```
