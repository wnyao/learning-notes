# Merge Sort

- Worse-case sort speed is `O(n log n)`
- Requires use of two functions
- The first function works recursively to split the pieces and pieced them in sorted array; involves recursion
- The second function performs task of merging the two sides using iterative process
- Unlike quick sort comparatively, merge sort requires `O(n)` extra storage which make it expensive. Allocating and de-allocating the extra space used increase the running time of the algorithm.

### Concept

The sort begins by breaking the dataset into individual pieces and sorting the pieces. It then merges the pieces in a manner that ensures that it has sorted the merged piece, The sorting and merging continues until the entire dataset is again a single piece.

---

### Code

```python
data = [9, 5, 7, 4, 2, 8, 1, 10, 6, 3]

def mergeSort(list):
    # Determine whether the list is broken into individual pieces.
    if len(list) < 2:
        return list

    # Find the middle of the list.
    middle = len(list)//2

    # Break the list into two pieces.
    left = mergeSort(list[:middle])
    right = mergeSort(list[middle:])

    # Merge the two sorted pieces into a larger piece.
    print("Left side: ", left)
    print("Right side: ", right)

    merged = merge(left, right)
    print("Merged ", merged)
    print("")
    return merged

# Caveat: 
# Both arrays pass as argument of merge function
# has to be sorted, else the result of merge will be invalid
def merge(left, right):
    # When the left side or the right side is empty,
    # it means that this is an individual item and is
    # already sorted.
    if not len(left):
        return left
    if not len(right):
        return right

    # Define variables used to merge the two pieces.
    result = []
    leftIndex = 0
    rightIndex = 0
    totalLen = len(left) + len(right)

    # Keep working until all of the items are merged.
    while (len(result) < totalLen):
        # Perform the required comparisons and merge
        # the pieces according to value.
        if left[leftIndex] < right[rightIndex]:
            result.append(left[leftIndex])
            leftIndex += 1 
        else:
            result.append(right[rightIndex]) 
            rightIndex+= 1

        # When it finish loop either of the array,
        # add the remaining elements of leftover array to the result.
        if leftIndex == len(left) or rightIndex == len(right):
            result.extend(left[leftIndex:] or right[rightIndex:])
            break

    return result

mergeSort(data)
```

# Readings

- Algorithms for Dummies, Chapter 7: Arranging and Searching Data
- [Why Quick Sort preferred for Arrays and Merge Sort for Linked Lists?](https://www.geeksforgeeks.org/why-quick-sort-preferred-for-arrays-and-merge-sort-for-linked-lists/)
