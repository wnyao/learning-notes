# Question

Given a sorted array consisting of only integers where every element appears twice except for one element which appears once. Find this single element that appears only once. Your solution should run in O(log n) time and O(1) space.

### Solution

```js
const findSingleElement = (arr) => {
  if (!arr || arr.length === 0) return [];

  let sortedArray = arr.sort();
  let prevNum, num1, num2;
  let result = [];

  for (let i = 0; i < arr.length; i = i + 2) {
    prevNum = sortedArray[i - 1];
    num1 = sortedArray[i];
    num2 = sortedArray[i + 1];

    // if num1 not equal to num2
    if (num1 !== num2) {
      if (!prevNum) result = [...result, num1, num2];

      // if number not equal to previous number
      if (num1 && prevNum !== num1) result = [...result, num1];
      if (num2 && prevNum !== num2) result = [...result, num2];
    }
  }

  return result;
};
```
