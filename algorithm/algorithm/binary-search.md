# Binary Search

### Sample Input

```python
primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
targetValue = 73
```

### Sample Output

```python
20
```

### Code

```python
"""
Returns either the index of the location in the array,
or -1 if the array did not contain the targetValue.
"""
def binarySearch(arr, target):
    start = 0
    end = len(arr) - 1

    while end >= start:
        guess =  (start + end) // 2

        # check if mid point matches target
        if arr[guess] == target:
            return guess

        if arr[guess] < target:
            # increase start so will increase guess on next loop
            start = guess + 1
        else:
            # decrease end so will decrease guess on next loop
            end = guess - 1

    return -1
```

### Execution

```
primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
targetValue = 73

start = 0
end = 24
guess = undefined

end >= start = true
guess = 12
(arr[guess] === targetValue) = (41 === 73) = false
(arr[guess] < targetValue) = (41 < 73) = true
start = 13

end >= start = true
guess = 19
(arr[guess] === targetValue) = (71 === 73) = false
(arr[guess] < targetValue) = (71 < 73) = true
start = 20

end >= start = true
guess = 22
(arr[guess] === targetValue) = (83 === 73) = false
(arr[guess] < targetValue) = (83 < 73) = false
end = 21

end >= start = true
guess = 21
(arr[guess] === targetValue) = (79 === 73) = false
(arr[guess] < targetValue) = (79 < 73) = false
end = 20

end >= start = true
guess = 20
(arr[guess] === targetValue) = (73 === 73) = true
return 20
```

# Readings

- [Running time of binary search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/running-time-of-binary-search)
- [Binary search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)
