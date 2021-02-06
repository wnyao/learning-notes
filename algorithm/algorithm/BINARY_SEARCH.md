# Binary Search

### Sample Input

```
array = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
targetValue = 73
```

### Sample Output

```
20
```

### Code

```
/**
 * Returns either the index of the location in the array,
 * or -1 if the array did not contain the targetValue.
 */
function doSearch(array, targetValue) {
    var min = 0;
    var max = array.length - 1;
    var guess;

    while (max >= min) {
        guess = Math.floor((max + min) / 2);

        if (array[guess] === targetValue) {
            return guess;
        }

        if (array[guess] < targetValue) {
            min = guess + 1;
        } else {
            max = guess - 1;
        }
    }

    return -1;
};

var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

var result = doSearch(primes, 73);
println("Found prime at index " + result);

Program.assertEqual(doSearch(primes, 73), 20);
Program.assertEqual(doSearch(primes, 2), 0);
Program.assertEqual(doSearch(primes, 97), primes.length - 1);
```

### Execution

```
primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
targetValue = 73

min = 0
max = 24
guess = undefined

max >= min = true
guess = 12
(arr[guess] === targetValue) = (41 === 73) = false
(arr[guess] < targetValue) = (41 < 73) = true
min = 13

max >= min = true
guess = 19
(arr[guess] === targetValue) = (71 === 73) = false
(arr[guess] < targetValue) = (71 < 73) = true
min = 20

max >= min = true
guess = 22
(arr[guess] === targetValue) = (83 === 73) = false
(arr[guess] < targetValue) = (83 < 73) = false
max = 21

max >= min = true
guess = 21
(arr[guess] === targetValue) = (79 === 73) = false
(arr[guess] < targetValue) = (79 < 73) = false
max = 20

max >= min = true
guess = 20
(arr[guess] === targetValue) = (73 === 73) = true
return 20
```

# Readings

- [Running time of binary search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/running-time-of-binary-search)
- [Binary search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)
