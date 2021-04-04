# Binary Search

- Best case time complexity at `O(n log n)`

### Concept

Search a sorted array by repeatedly dividing the search interval in half, narrow the interval to lower or upper half.

Basic process:

1. Compare x with middle element.
2. If x matches with middle element, we return the mid index.
3. Else If x is greater than the mid element, then x can only lie in right half subarray after mid element. So we recur for right half.
4. Else (x is smaller) recur for the left half.

---

### Code

#### Sample Input

```python
primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
targetValue = 73
```

#### Sample Output

```python
20
```

#### Example

```python
"""
Returns either the index of the location in the array,
or -1 if the array did not contain the targetValue.
"""
def binarySearch(arr, target):
    start = 0
    end = len(arr) - 1

    while end >= start:
        mid =  (start + end) // 2

        # check if mid point matches target
        if arr[mid] == target:
            return mid

        if arr[mid] < target:
            # increase start so will increase mid on next loop
            start = mid + 1
        else:
            # decrease end so will decrease mid on next loop
            end = mid - 1

    return -1
```

### Execution

```
primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
targetValue = 73

start = 0
end = 24

end >= start = true
mid = 12
(arr[mid] === targetValue) = (41 === 73) = false
(arr[mid] < targetValue) = (41 < 73) = true
start = 13

end >= start = true
mid = 19
(arr[mid] === targetValue) = (71 === 73) = false
(arr[mid] < targetValue) = (71 < 73) = true
start = 20

end >= start = true
guess = 22
(arr[mid] === targetValue) = (83 === 73) = false
(arr[mid] < targetValue) = (83 < 73) = false
end = 21

end >= start = true
guess = 21
(arr[mid] === targetValue) = (79 === 73) = false
(arr[mid] < targetValue) = (79 < 73) = false
end = 20

end >= start = true
mid = 20
(arr[mid] === targetValue) = (73 === 73) = true
return 20
```

# Readings

- [Running time of binary search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/running-time-of-binary-search)
- [Binary search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)
