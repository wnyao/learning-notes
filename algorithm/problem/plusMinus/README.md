# Plus Minus

Given an array of integers, calculate the ratios of its elements that are positive, negative, and zero. Print the decimal value of each fraction on a new line with places after the decimal.

**Note:** This challenge introduces precision problems. The test cases are scaled to six decimal places, though answers with absolute error of up to are acceptable.

### Example

```
arr = [1, 1, 0, -1, -1]
```

There are n = 5 elements, two positive, two negative and one zero. Their ratios are 2/5 = 0.400000, 2/5 = 0.400000 and 1/5 = 0.200000. Results are printed as:

```
0.400000
0.400000
0.200000
```

### Function Description

Complete the plusMinus function in the editor below.

plusMinus has the following parameter(s):

- int arr[n]: an array of integers

### Print

Print the ratios of positive, negative and zero values in the array. Each value should be printed on a separate line with digits after the decimal. The function should not return a value.

### Input Format

The first line contains an integer, **n**, the size of the array.
The second line contains **n** space-separated integers that describe .

### Constraints

```
0 < n <= 100
-100 <= arr[i] <= 100
```

### Output Format

Print the following lines, each to decimals:

1.  proportion of positive values
2.  proportion of negative values
3.  proportion of zeros

### Sample Input

| STDIN         | Function                 |
| ------------- | ------------------------ |
| 6             | arr[] size n=6           |
| -4 3 -9 0 4 1 | arr=[-4, 3, -9, 0, 4, 1] |

---

### Sample Output

```
0.500000
0.333333
0.166667
```

### Explanation

There are 3 positive numbers, 2 negative numbers, and 1 zero in the array.
The proportions of occurrence are positive: 3/6 = 0.500000, negative: 2/6 = 0.333333 and zeros: 1/6 = 0.166667.

### Solution

```js
function plusMinus(arr) {
  let [posCount, negCount, neuCount] = [0, 0, 0];

  for (let i = 0; i < arr.length; i++) {
    let number = arr[i];
    if (number > 0) posCount += 1;
    if (number < 0) negCount += 1;
    if (number === 0) neuCount += 1;
  }

  const posR = posCount / arr.length;
  const negR = negCount / arr.length;
  const neuR = neuCount / arr.length;
  console.log(posR.toFixed(6));
  console.log(negR.toFixed(6));
  console.log(neuR.toFixed(6));
}
```

```py
def plusMinus(arr):
  length = len(arr)
  posVal = 0.0
  negVal = 0.0
  neuVal = 0.0

  for num in arr:
    if num == 0:
      neuVal += 1
    elif num > 0:
      posVal += 1
    elif num < 0:
      negVal += 1

  posRatio = round(posVal / length, 6)
  negRatio = round(negVal / length, 6)
  neuRatio = round(neuVal / length, 6)
  print(str(posRatio) + "\n" + str(negRatio) + "\n" + str(neuRatio))
```

```java
import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {
  
    static String fixedDecimal(float value, int to) {
      return String.format("%." + to + "f", value);
    }

    static void plusMinus(int[] arr) {
      int arrLength = arr.length ;
      float posCount = 0;
      float negCount = 0;
      float neuCount = 0;

      for (int i = 0; i < arrLength; i++) {
        int value = arr[i];
        
        if (value > 0) posCount++;
        else if (value < 0) negCount++;
        else if (value == 0) neuCount++;
      }
      
      float posRatio = posCount / arrLength;
      float negRatio = negCount / arrLength;
      float neuRatio = neuCount / arrLength;
      System.out.println(fixedDecimal(posRatio, 6));
      System.out.println(fixedDecimal(negRatio, 6));
      System.out.println(fixedDecimal(neuRatio, 6));
    }
}
```
