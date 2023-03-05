### Question

Given five positive integers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers. Then print the respective minimum and maximum values as a single line of two space-separated long integers.

### Example

```
arr = [1, 3, 5, 7, 9]
```

The minimum sum is and the maximum sum is . The function prints

```
16 24
```

### Function Description

Complete the miniMaxSum function in the editor below.

miniMaxSum has the following parameter(s):

- arr: an array of integers

### Print

Print two space-separated integers on one line: the minimum sum and the maximum sum of of elements.

### Input Format

A single line of five space-separated integers.

### Output Format

Print two space-separated long integers denoting the respective minimum and maximum values that can be calculated by summing exactly four of the five integers. (The output can be greater than a 32 bit integer.)

### Input/Output

```
// input
1 2 3 4 5

// output
10 14
```

### Explanation

The numbers are , , , , and . Calculate the following sums using four of the five integers:

1.  Sum everything except , the sum is .
2.  Sum everything except , the sum is .
3.  Sum everything except , the sum is .
4.  Sum everything except , the sum is .
5.  Sum everything except , the sum is .

**Hints**: Beware of integer overflow! Use 64-bit Integer.

### Solution

```js
// Answer 1
function miniMaxSumOld(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  let maxSum = 0;
  let minSum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (value !== max) minSum += arr[i];
    if (value !== min) maxSum += arr[i];
  }

  console.log(`${minSum} ${maxSum}`);
}

// Answer 2
function miniMaxSum(arr) {
  let sums = [];

  for (let i = 0; i < arr.length; i++) {
    const total = arr.reduce((acc, cur) => {
      if (cur !== arr[i]) return acc + cur;
      else return acc;
    }, 0);
    sums.push(total);
  }

  console.log(`${Math.min(...sums)} ${Math.max(...sums)}`);
}
```

```py
# Answer 1
def miniMaxSumOne(arr):
  minNum = min(arr)
  maxNum = max(arr)

  minSum = 0
  maxSum = 0
  for i in range(0, len(arr)):
    value = arr[i]
    if value != minNum:
      maxSum += value
    if value != maxNum:
      minSum += value

  print(str(minSum) + " " + str(maxSum))

# Anwser 2
def miniMaxSumTwo(arr):
  sums = []

  for i in range(0, len(arr)):
    cloneArr = list.copy(arr)
    del cloneArr[i]
    sums.append(sum(cloneArr))

  minSum = min(sums)
  maxSum = max(sums)
  print(str(minSum) + " " + str(maxSum))
```
