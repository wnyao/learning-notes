### Question

```
var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
```

Suppose we want to know whether the number 67 is prime. If 67 is in the array, then it's prime.
We might also want to know how many primes are smaller than 67. If we find the position of the number 67 in the array, we can use that to figure out how many smaller primes exist.

### Solution

```js
const findPrime = (numbers, primeNum) => {
  if (
    !numbers ||
    !primeNum ||
    !numbers.includes(primeNum) ||
    numbers.length === 0
  ) {
    return 0;
  }

  let min = 0;
  let max = numbers.length - 1;
  let pointerIndex = Math.floor(max / 2);
  let pointer = numbers[pointerIndex];

  const primes = numbers.sort((a, b) => (b > a ? -1 : 1)); // sort number in ascending order
  if (primeNum > primes[numbers.length - 1]) return 0; // check given argument larger than last index of number

  while (pointer !== primeNum) {
    if (pointer < primeNum) {
      min = pointerIndex + 1;
    } else {
      max = pointerIndex - 1;
    }

    pointerIndex = Math.floor((max - min) / 2 + min);
    pointer = numbers[pointerIndex];
  }

  return pointerIndex;
};
```

```js
/*
 * AS SOLVED IN KHAN ACADEMY
 *
 * Returns either the index of the location in the array,
 * or -1 if the array did not contain the targetValue
 * */

const doSearch = (array, targetValue) => {
  var min = 0;
  var max = array.length - 1;
  var guess;

  while (max >= min) {
    guess = Math.floor((max - min) / 2 + min); // round down the number instead of up

    if (array[guess] === targetValue) {
      return guess;
    } else if (array[guess] < targetValue) {
      min = guess + 1;
    } else {
      max = guess - 1;
    }
  }

  return -1;
};

module.exports = {
  answer: doSearch,
};
```
