### Sorting

One common task for computers is to sort data. For example, people might want to see all their files on a computer sorted by size. Since sorting is a simple problem with many different possible solutions, it is often used to introduce the study of algorithms.

### Insertion Sort

These challenges will cover Insertion Sort, a simple and intuitive sorting algorithm. We will first start with a nearly sorted list.

### Insert element into sorted list

Given a sorted list with an unsorted number `e` in the rightmost cell, can you write some simple code to insert `e` into the array so that it remains sorted?

Since this is a learning exercise, it won't be the most efficient way of performing the insertion. It will instead demonstrate the brute-force method in detail.

Assume you are given the array `arr= [1, 2, 4, 5, 3]` indexed `0...4`. Store the value of `arr[4]` . Now test lower index values successively from 3 to 0 until you reach a value that is lower than `arr[4]`, at `arr[1]` in this case. Each time your test fails, copy the value at the lower index to the current index and print your array. When the next lower indexed value is smaller than `arr[4]`, insert the stored value at the current index and print the entire array.

### Example

```
n = 5
arr = [1, 2, 4, 5, 3]
```

Start at the rightmost index. Store the value of `arr[4] = 3`. Compare this to each element to the left until a smaller value is reached. Here are the results as described:

```
1 2 4 5 5
1 2 4 4 5
1 2 3 4 5
```

### Function Description

Complete the insertionSort1 function in the editor below.

insertionSort1 has the following parameter(s):

- n: an integer, the size of
- arr: an array of integers to sort

### Returns

- None: Print the interim and final arrays, each on a new line. No return value is expected.

### Input Format

The first line contains the integer `n` , the size of the array `arr`.
The next line contains `n` space-separated integers `arr[0]...arr[n - 1]`.

### Constraints

```
1 <= n <= 1000
-10000 <= arr[i] <= 10000
```

### Output Format

Print the array as a row of space-separated integers each time there is a shift or insertion.

### Sample Input

```
5
2 4 6 8 3
```

### Sample Output

```
2 4 6 8 8
2 4 6 6 8
2 4 4 6 8
2 3 4 6 8
```

### Explanation

3 is removed from the end of the array.
In the 1st line 8 > 3, so 8 is shifted one cell to the right.
In the 2nd line 6 > 3, so 6 is shifted one cell to the right.
In the 3rd line 4 > 3, so 4 is shifted one cell to the right.
In the 4th line 2 < 3, so 3 is placed at position 1.

### Solution

```js
// answer 1 ------------------------------------
function insertionSort1(n, arr) {
  let finish = false;
  const lastValue = arr[n - 1];
  const subArray = arr.slice(0, n - 1);

  for (let i = subArray.length - 1; i >= -1; i--) {
    // handle index 0 comparison
    if (i < 0 || subArray[i] < lastValue) {
      subArray.splice(i + 1, 1, lastValue);
      finish = true;
    } else {
      subArray.splice(i + 1, 1, subArray[i]);
    }

    console.log(subArray.join(" "));
    if (finish) break;
  }
}

// answer 2 ------------------------------------
function insertionSort2(n, arr) {
  target = arr[n - 1];
  idx = n - 2;

  while (idx >= 0 && target < arr[idx]) {
    arr[idx + 1] = arr[idx];
    console.log(arr.join(" "));
    idx -= 1;
  }

  arr[idx + 1] = target;
  console.log(arr.join(" "));
}

// answer 3 ------------------------------------
// Note: below solution modify given array instead of create anew

const insert = (array, rightIndex, value) => {
  for (var j = rightIndex; j >= 0 && array[j] > value; j--) {
    array[j + 1] = array[j];
  }

  array[j + 1] = value;
};

const insertionSort = (array) => {
  for (var i = 1; i < array.length; i++) {
    insert(array, i - 1, array[i]);
  }
};

var array = [22, 11, 99, 88, 9, 7, 42];
insertionSort(array);
```

```py
import math

# answer 1 -----------------------------------------------------
def insertionSort1(n, arr):
  lastNum = arr[-1]
  subArr = arr[:-1]
  finish = False

  # for loop in reverse
  for i in range(len(subArr) - 1, -2, -1):

    if i < 0 or subArr[i] < lastNum:
      arr[i + 1] = lastNum
      finish = True
    else:
      arr[i + 1] = subArr[i]

    # convert int[] to string[], then jon
    strArr = map(str, arr)
    print(" ".join(strArr))
    if finish: break

# answer 2 -----------------------------------------------------
def insertionSort2(n, arr):
  target = arr[-1]
  idx = n-2

  while (target < arr[idx]) and (idx >= 0):
      arr[idx+1] = arr[idx]
      print(' '.join(map(str, arr)))
      idx -= 1

  arr[idx+1] = target
  print(' '.join(map(str, arr)))
```

```js
import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {

    static void insertionSort1(int n, int[] arr) {    
      int lastValue = arr[n - 1];
      boolean finish = false;
      
      for (int i = n - 2; i >= -1; i--) {
        if (i < 0 || arr[i] < lastValue) {
          arr[i + 1] = lastValue;
          finish = true;
        } else {
          arr[i + 1] = arr[i];
        }
        
        String[] strArray = Arrays.stream(arr).mapToObj(String::valueOf).toArray(String[]::new);
        String joinedString = String.join(" ", strArray);
        System.out.println(joinedString);
        if (finish) break;
      }
    }
}
```
