# Selection Sort

### Sample Input

```
arr = 64 25 12 22 11
```

### Sample Output

```
11 25 12 22 64
11 12 25 22 64
11 12 22 25 64
11 12 22 25 64
11 12 22 25 64
```

### Code

```
def selectionSort(arr)
    for i in range(len(arr)):

        # Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[min_idx] > arr[j]:
                min_idx = j

        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        print(arr);
```

### Execution

```
i = 0
min_idx = 0

-- inner loop --

j = 1
arr[min_idx] = 64
arr[j] = 25
arr[min_idx] > arr[j] = true
min_idx = 1 // assign new found minimum index

j = 2
arr[min_idx] = 64
arr[j] = 12
arr[min_idx] > arr[j] = true
min_idx = 2

j = 3
arr[min_idx] = 12
arr[j] = 22
arr[min_idx] > arr[j] = false

j = 4
arr[min_idx] = 12
arr[j] = 11
arr[min_idx] > arr[j] = true
min_idx = 4

-- out inner loop --

// Swap the found minimum element with the first element
arr[i] = arr[min_idx]
"11" 25 12 22 11
arr[min_idx] = arr[i]
11 25 12 22 "64"

-------------------------------------------------

i = 1
min_idx = 1

-- inner loop --

j = 2
arr[min_idx] = 25
arr[j] = 12
arr[min_idx] > arr[j] = true
min_idx = 2

j = 3
arr[min_idx] = 12
arr[j] = 22
arr[min_idx] > arr[j] = false

j = 4
arr[min_idx] = 12
arr[j] = 64
arr[min_idx] > arr[j] = false

-- out inner loop --

arr[i] = arr[min_idx]
11 "12" 12 22 64
arr[min_idx] = arr[i]
11 12 "25" 22 64

-------------------------------------------------

i = 2
min_idx = 2

-- inner loop --

j = 3
arr[min_idx] = 25
arr[j] = 22
arr[min_idx] > arr[j] = true
min_idx = 3

j = 4
arr[min_idx] = 22
arr[j] = 64
arr[min_idx] > arr[j] = false

-- out inner loop --

arr[i] = arr[min_idx]
11 12 "22" 22 64
arr[min_idx] = arr[i]
11 12 22 "25" 64

-------------------------------------------------

i = 3
min_idx = 3

-- inner loop --

j = 4
arr[min_idx] = 25
arr[j] = 64
arr[min_idx] > arr[j] = false

-- out inner loop --

arr[i] = arr[min_idx]
11 12 22 "25" 64
arr[min_idx] = arr[i]
11 12 22 "25" 64

-------------------------------------------------

i = 4
min_idx = 4

arr[i] = arr[min_idx]
11 12 22 25 "64"
arr[min_idx] = arr[i]
11 12 22 25 "64"
```

# Readings

- https://www.geeksforgeeks.org/selection-sort/
