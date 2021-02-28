# Insertion Sort

### Sample Input

```
n = 6
arr = 1 4 3 5 6 2
```

### Sample Output

```
1 4 3 5 6 2
1 3 4 5 6 2
1 3 4 5 6 2
1 3 4 5 6 2
1 2 3 4 5 6
```

### Code

```
def insertionSort2(n, arr):
  for j in range(1, n):
    key = arr[j]
    i = j - 1

    while i >= 0 and arr[i] > key:
      arr[i + 1] = arr[i]
      i = i - 1

    arr[i + 1] = key
    print(" ".join(map(str, arr)));
```

### Execution

```
j = 1
key = 4
i = 0

arr[i] = 1
i >= 0 and arr[i] > key = false

1 "4" 3 5 6 2 unchanged
print

-------------------------------------------

j = 2
key = 3
i = 1

arr[i] = 4
i >= 0 and arr[i] > key = true
1 4 "4" 5 6 2 copy over
i = 0

arr[i] = 1
i >= 0 and arr[i] > key = false

1 "3" 4 5 6 2
print

-------------------------------------------

j = 3
key = 5
i = 2

arr[i] = 4
i >= 0 and arr[i] > key = false

1 3 4 "5" 6 2 unchanged
print

-------------------------------------------

j = 4
key = 6
i = 3

arr[i] = 5
i >= 0 and arr[i] > key = false

1 3 4 5 "6" 2 unchanged
print

-------------------------------------------

j = 5
key = 2
i = 4

arr[i] = 6
i >= 0 and arr[i] > key = true
1 3 4 5 6 "6" copy arr[i] forward
i = 3 decrease i

arr[i] = 5
i >= 0 and arr[i] > key = true
1 3 4 5 "5" 6
i = 2

arr[i] = 4
i >= 0 and arr[i] > key = true
1 3 4 "4" 5 6
i = 1

arr[i] = 3
i >= 0 and arr[i] > key = true
1 3 "3" 4 5 6
i = 0

arr[i] = 1
i >= 0 and arr[i] > key = false

1 "2" 3 4 5 6
print

```

### Other solutions

```
var insert = function(array, rightIndex, value) {
    for(var j = rightIndex; j >= 0 && array[j] > value; j--) {
        array[j + 1] = array[j];
    }

    array[j + 1] = value;
};

var insertionSort = function(array) {
    for (var i = 1; i < array.length; i++) {
        insert(array, i - 1, array[i]);
    }
};

var array = [22, 11, 99, 88, 9, 7, 42];
insertionSort(array);
```

# Readings

- https://www.geeksforgeeks.org/insertion-sort/
- https://www.hackerrank.com/challenges/insertionsort2/problem?isFullScreen=true
- https://www.khanacademy.org/computing/computer-science/algorithms/insertion-sort/a/analysis-of-insertion-sort
