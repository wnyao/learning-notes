### Question

This is a staircase of size n = 4:

```
   #
  ##
 ###
####
```

Its base and height are both equal to **n**. It is drawn using # symbols and spaces. The last line is not preceded by any spaces.

Write a program that prints a staircase of size **n**.

### Function Description

Complete the staircase function in the editor below.

staircase has the following parameter(s):

- int n: an integer

### Print

Print a staircase as described above.

### Input Format

A single integer, **n**, denoting the size of the staircase.

### Output Format

Print a staircase of size **n** using # symbols and spaces.

**Note:** The last line must have spaces in it.

### Sample Input

```
6
```

### Sample Output

```
     #
    ##
   ###
  ####
 #####
######
```

### Solution

```js
function staircase(n) {
  for (let i = 1; i <= n; i++) {
    const spaces = new Array(n - i).fill(" ").join("");
    const hashes = new Array(i).fill("#").join("");
    console.log(spaces + hashes);
  }
}
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
    // Complete the staircase function below.
    static void staircase(int n) {
      String space = " ";
      String symbol = "#";
     
      for (int i = 1; i <= n; i++) {
        // create a string made up of n copies of string s
        String spaces = String.join("", Collections.nCopies(n - i, " "));
        String symbols = String.join("", Collections.nCopies(i, "#"));
        System.out.println(spaces + symbols);
      }
    }
}
```

```py
import math
import os
import random
import re
import sys

def staircase(n):
  for i in range(1, n + 1):
    spaces = n - i
    char = i
    print((spaces * " ") + (char * "#"))
```

### Explanation

The staircase is right-aligned, composed of # symbols and spaces, and has a height and width of n = 6.
