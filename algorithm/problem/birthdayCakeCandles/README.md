# Birthday Cake Candles

You are in charge of the cake for a child's birthday. You have decided the cake will have one candle for each year of their total age. They will only be able to blow out the tallest of the candles. Count how many candles are tallest.

### Example

```
candles = [4, 4, 1, 3]
```

The maximum height candles are 4 units high. There are 2 of them, so return 2.

### Function Description

Complete the function birthdayCakeCandles in the editor below.

birthdayCakeCandles has the following parameter(s):

- int candles[n]: the candle heights

### Returns

- int: the number of candles that are tallest

### Input Format

The first line contains a single integer, **n**, the size of candles[].
The second line contains **n** space-separated integers, where each integer i describes the height of candles\*[i].

### Constraints

```
1 <= n <= 10^5
1 <= candles[i] <= 10^7
```

### Sample Input 0

```
4
3 2 1 3
```

### Sample Output 0

```
2
```

### Explanation 0

Candle heights are [3, 2, 1, 3]. The tallest candles are 3 units, and there are 2 of them.

### Solution

```js
function birthdayCakeCandles(candles) {
  const highests = Math.max(...candles);
  const totalTallest = candles.filter((x) => x === highests).length;
  return totalTallest;
}
```

```py
import math
import os
import random
import re
import sys

def birthdayCakeCandles(candles):
    maxNum = max(candles)
    totalMax = 0

    for i in range(0, len(candles)):
      if candles[i] == maxNum:
        totalMax += 1

    return totalMax
```

```java
import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

class Result {

    private static int getMax(List<Integer> intergers) {
      int maxNum = 0;
      
      // find maximum in List
      for (int i = 0; i < intergers.size(); i++) {
        int value = intergers.get(i);
        if (value > maxNum) {
          maxNum = value;
        }
      }
      return maxNum;
    }

    public static int birthdayCakeCandles(List<Integer> candles) {
      int totalHighest = 0;
      int maxValue = getMax(candles);
      
      for (int j= 0; j < candles.size(); j++) {
        int value = candles.get(j);
        if (value != maxValue) {
          totalHighest++;
        }
      }
     
      return totalHighest;
    }
}
```
