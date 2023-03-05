### Question

Given a square matrix of size , calculate the absolute difference between the sums of its
diagonals.

### Input Format

The first line contains a single integer, . The next lines denote the matrix's rows, with each line
containing space-separated integers describing the columns.

## Output Format

Print the absolute difference between the two sums of the matrix's diagonals as a single integer.

```
// input
3
11 2 4
4 5 6
10 8 -12

// output
15
```

## Explanation

The primary diagonal is:

```
11
    5
        -12
```

Sum across the primary diagonal: 11 + 5 - 12 = 4
The secondary diagonal is:

```
        4
    5
10
```

Sum across the secondary diagonal: 4 + 5 + 10 = 19
Difference: |4 - 19| = 15

Note: |x| is absolute value function

### Solution

```js
// answer 1
function diagonalDifference(arr) {
  let [sumF, sumB] = [0, 0];

  for (let i = 0; i < arr.length; i++) {
    const nums = arr[i];
    sumF += nums[i];
    sumB += nums[nums.length - (i + 1)];
  }

  return Math.abs(sumF - sumB);
}

// answer 2
function diagonalDifference(arr) {
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    const numbers = arr[i];

    const f = numbers[i];
    const b = numbers[numbers.length - (i + 1)];
    total -= f - b;
  }

  return Math.abs(total);
}
```

```py
import math
import os
import random
import re
import sys

def diagonalDifference(arr):
    total = 0

    for i in range(0, len(arr)):
      row = arr[i]
      total += row[i] - row[len(row) - (i + 1)]

    return abs(total)
```

# Reference

- [Diagonal Difference](https://www.hackerrank.com/challenges/diagonal-difference/problem)
