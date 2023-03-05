### Question

Ticket numbers usually consist of an even number of digits. A ticket number is considered *lucky* if the sum of the first half of the digits is equal to the sum of the second half.

Given a ticket number `n`, determine if it's *lucky* or not.

### Example

- For `n = 1230`, the output should be `true`;
- For `n = 239017`, the output should be `false`.

### Input/Output

- [execution time limit] 4 seconds (js)
- [input] integer n - A ticket number represented as a positive integer with an even number of digits.
- [output] boolean - `true` if **`n`** is a lucky ticket number, `false` otherwise.

### Solution

```js
const solution = (n) => {
  const numbers = [...String(n)];
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < numbers.length / 2; i++) {
    sum1 += Number(numbers[i]);
    sum2 += Number(numbers[numbers.length - 1 - i]);
  }

  return sum1 === sum2;
}
```
