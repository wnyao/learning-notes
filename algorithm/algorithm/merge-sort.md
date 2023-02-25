# Merge Sort

- Divide and conquer algorithm
- Worse-case sort speed is `O(n log n)`
- Requires use of two functions
- The first function works recursively to split the piece into pieces and pieced them in a sorted array; involved recursion
- The second function performs task of merging the two sides using iterative process
- Unlike quick sort, merge sort requires `O(n)` extra storage which make it expensive. Allocating and de-allocating the extra space used increase the running time of the algorithm.
- As said, merge sort isn't functioned efficiently for array but linked list

## Concept

The sort begins by breaking the array into individual pieces. The given unsorted array with `n` elements, is divided into `n` sub-arrays, each having one element and sorting the pieces. It merges the pieces in a manner that ensures that it has sorted the merged piece, The sorting and merging continues until the entire dataset is again a single piece.

## Code

### Example 1

```py
def mergeSort(list):
  # Determine whether the list is broken into individual pieces.
  if len(list) < 2:
    return list

  # Find the middle of the list.
  middle = len(list) // 2

  # Break the list into two pieces.
  left = mergeSort(list[:middle])
  right = mergeSort(list[middle:])

  # Merge the two sorted pieces into a larger piece.
  merged = merge(left, right)
  return merged

# Caveat:
# Both arrays pass as argument of merge function
# has to be sorted, else the result of merge will be invalid
def merge(left, right):
  # When the left side or the right side is empty,
  # it means that this is an single item and is
  # already sorted.
  if not len(left):
    return left

  if not len(right):
    return right

  # Define variables used to merge the two pieces.
  result = []
  leftIndex = 0
  rightIndex = 0
  totalLength = len(left) + len(right)

  # Keep working until all of the items are merged.
  while (len(result) < totalLength):
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

data = [9, 5, 7, 4, 2, 8, 1, 10, 6, 3]
mergeSort(data)
```

### [Example 2](https://www.youtube.com/watch?v=KF2j-9iSf4Q&ab_channel=HackerRank)

Process:

1. Create base condition for `mergeSort` recursion.
2. Get mid point of the array.
3. Use `mergeSort` recursion break left and right half of array.
4. Merged both left and right half with `merged` method.
5. On `merge` method, initiate required variables: `leftStart, leftEnd, rightStart, rightEnd, size (size of array)`.
6. On `merge` method, initiate other required indices: `left, right, index`.
7. While `left` and `right` indices are in bound of `leftEnd` and `rightEnd`, compare left and right elements.
8. If left element is smaller than right element, insert into `index` of sorted array and increase left and index.
9. If right element is smaller than right element, insert into `index` of sorted array and increase right and index.
10. Out of while loop, copy leftover elements on left half of array to sorted array.
11. Out of while loop, copy leftover elements on right half of array to sorted array.

```java
public class Solution {
  public static void mergeSort(int[] array) {
    /**
     * This array will be used by merged method,
     * to facilitate or storage allocation when creating
     * array on merge method.
     * */
    int[] temp = new int[array.length];
    mergeSort(array, temp, 0, array.length - 1);
  }

  public static void mergeSort(int[] array, int[] temp, int leftStart, int rightEnd) {
    // If left start go out of bound
    if (leftStart >= rightEnd) {
      return;
    }

    int middle = (leftStart + rightEnd) / 2;
    mergeSort(array, temp, leftStart, middle); // break down left half
    mergeSort(array, temp, middle + 1, rightEnd); // break down right hald
    merged(array, temp, leftStart, rightEnd);
  }

  public static void merged(int[] array, int[] temp, int leftStart, int rightEnd) {
    int leftEnd = (rightEnd + leftStart) / 2;
    int rightStart = leftEnd + 1;
    int size = (rightEnd - leftStart) + 1;

    // indices
    int left = leftStart;
    int right = rightStart;
    int index = leftStart;

    // if left or right indices ara within array length bound
    while (left <= leftEnd && right <= rightEnd) {

      // compare value of left and right element
      if (array[left] <= array[right]) {
        temp[index] = array[left];
        left++;
      } else {
        temp[index] = array[right];
        right++;
      }

      index++; // increase index for temp array
    }

    /**
     * Notes:
     * System.arraycopy(sourceArray, startFrom, destinationArray, startFrom, copyHowManyElements)
     * Given two array copy one array to the other with specific boundary.
     *
     * Notes:
     * either left or right pointer is at end, so only one
     * of these lines will have an effect.
     * */
    System.arraycopy(array, left, temp, index, leftEnd - left + 1); // copy remaining elements from the left side
    System.arraycopy(array, right, temp, index, rightEnd - right + 1); // copy remaining elements from right side
    System.arraycopy(temp, leftStart, array, leftStart, size); // copy everything from temp back to array
  }
}
```

### Readings

- Algorithms for Dummies, Chapter 7: Arranging and Searching Data
- [Why Quick Sort preferred for Arrays and Merge Sort for Linked Lists?](https://www.geeksforgeeks.org/why-quick-sort-preferred-for-arrays-and-merge-sort-for-linked-lists/?ref=gcse)
- [Algorithms: Merge Sort](https://www.youtube.com/watch?v=KF2j-9iSf4Q&ab_channel=HackerRank)
