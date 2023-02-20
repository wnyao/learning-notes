# Insertion Sort

- Considered a brute-force method
- Insertion sort has best-case sort speed of `O(n)` and worst case sort speed of `O(n^2)`
- Example of best-case sort speed when the entire dataset is already sorted because the insertion sort wont have to move any values.
- Example of worst-case is when dataset is sorted in reverse order because the insertion sort require to move every value.

## Concept

Insertion sort works by using a single item as a starting point and adding items to the left or right of it based on whether these items are less than or greater than the selected item. As the number of sorted items builds, the algorithm checks new items against the sorted items and inserts the new item into the right position in the list.

## Code

### Sample Input

```py
data = [9, 5, 7, 4, 2, 8, 1, 10, 6, 3]
```

### Sample Output

```
5 9 7 4 2 8 1 10 6 3
5 7 9 4 2 8 1 10 6 3
4 5 7 9 2 8 1 10 6 3
2 4 5 7 9 8 1 10 6 3
2 4 5 7 8 9 1 10 6 3
1 2 4 5 7 8 9 10 6 3
1 2 4 5 7 8 9 10 6 3
1 2 4 5 6 7 8 9 10 3
1 2 3 4 5 6 7 8 9 10
```

### Example 1

```py
def insertionSort(arr):
  data = arr.copy()

  for index in range(1, len(data)):
    value = data[index]
    minIndex = index
    
    # minIndex more than 0 and current value less than previous value
    while minIndex > 0 and value < data[minIndex - 1]:
      data[minIndex] = data[minIndex - 1] # move previous element forward
      minIndex -= 1 # move min index one step backward

    data[minIndex] = value

  return data
```

### Example 2

```js
const insertionSort = (arr) => {
  for (var i = 1; i < arr.length; i++) {
    let value = arr[i];

    // run backward if condition met and find the right position to insert
    for (var j = i - 1; j >= 0 && arr[j] > value; j--) {
      arr[j + 1] = arr[j]; // move bigger element forward
    }

    arr[j + 1] = value;
  }
};
```

### Readings

- [Insertion Sort](https://www.geeksforgeeks.org/insertion-sort/)
- [Insertion Sort 2](https://www.hackerrank.com/challenges/insertionsort2/problem?isFullScreen=true)
- [Analysis of insertion sort](https://www.khanacademy.org/computing/computer-science/algorithms/insertion-sort/a/analysis-of-insertion-sort)
- Algorithms for Dummies, Chapter 7: Arranging and Searching Data
