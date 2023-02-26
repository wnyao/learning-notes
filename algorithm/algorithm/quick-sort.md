# Quick Sort

- Divide and conquer algorithm.
- Useful for sorting array data structure.
- Unlike merge sort, quick sort in general form is an in-place sort (i.e. it doesn't require any extra storage)
- Also a cache friendly sorting algorithm as it has good locality of reference when used for arrays.
- The average sort time of a QuickSort is `O(n log n)`, but the worst-case sort time is `O(n^2)`.

## Performance

The time taken by quick sort depends upon the input array and partition strategy.

##### Best case

The best case occurs when the partition process always picks the middle element as pivot.

##### Worst case

The worst case occurs when the partition process always picks greatest or smallest element as pivot. If we consider partition strategy where last element is always picked as pivot, the worst case would occur when the array is already sorted in increasing or decreasing order.

Even modified versions of the QuickSort can have a worst-case sort time of `O(n^2)` when one of these events occurs:

- The dataset is already sorted in the desired order
- The dataset is sorted in reverse order
- All the elements in the dataset are the same

## Concept

It picks an element as pivot and partitioned the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways:

- First element as pivot
- Last element as pivot
- Random element as pivot
- Median as pivot

Basic process:

1. Find a “pivot” item in the array. This item is the basis for comparison for a single round.
2. Start a pointer (depends on strategy; left pointer if first item as pivot or right pointer if last item as pivot).
3. While the value at the left pointer in the array is less than the pivot value, move the left pointer to the right (add 1). Continue until the value at the left pointer is greater than or equal to the pivot value.
4. While the value at the right pointer in the array is greater than the pivot value, move the right pointer to the left (subtract 1). Continue until the value at the right pointer is less than or equal to the pivot value.
5. If the left pointer is less than or equal to the right pointer, then swap the values at these locations in the array.
6. Move the left pointer to the right by one and the right pointer to the left by one.
7. If the left pointer and right pointer don’t meet, go to step 1.

## Code

### [Iterative Quick Sort (Last element as pivot)](https://www.geeksforgeeks.org/iterative-quick-sort/)

- Last element as pivot
- At worst case sort time `O(n^2)`, as subsequent arr will get called to quick sort
- Picking last element as pivot causes worst-case behavior on already sorted arrays. Can be solved by choosing either a random index as pivot, or choosing middle index or choosing the median of the first, middle and last element of the partition as pivot

```py
def partition(arr, low, high):
    i = (low - 1)         # index of smaller element
    pivot = arr[high]     # last element as pivot

    # Sort less than and equal to element 
    # to left of pivot index and vice versa
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        # place element to head of array
        if arr[j] <= pivot:
            # increment index of smaller element
            # and swap current element with arr[i]
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    # Put pivot to the end of left partition
    # where smaller elements were allocated
    i += 1
    arr[i], arr[high] = arr[high], arr[i]
    return i

def quickSort(arr, low, high):
    if low < high:
        # partitioning index
        pi = partition(arr, low, high)

        # Separately sort elements on left and right partitions
        quickSort(arr, low, pi-1)
        quickSort(arr, pi + 1, high)

if __name__ == '__main__':
    arr = [4, 2, 3, 9, 6]
    quickSort(arr, 0, len(arr) - 1)
    print(arr)
```

### [Iterative Sort (First element as pivot)](https://g.co/kgs/oM2Z3y)

The inner loop of this example continuously searches for elements that are in the wrong place and swaps them. When the code can no longer swap items, it breaks out of the loop and sets a new pivot point, which it returns to the caller. This is the iterative part of the process. The recursive part of the process handles the left and right side of the dataset,

```py
def partition(arr, low, right):
    pivot = arr[low]
    lIndex = low + 1 # Given 1st element is used as pivit we start at low + 1
    rIndex = right

    while True:
        # If lIndex not go over rIndex and
        # left index element less than or equal to pivot
        while lIndex <= rIndex and arr[lIndex] <= pivot:
            lIndex += 1

        # If rIndex not go over lIndex and
        # right index element more than or equal to pivot
        while rIndex >= lIndex and arr[rIndex] >= pivot:
            rIndex -= 1

        # If rIndex crossed lIndex
        if rIndex <= lIndex:
            break

        # if both indexes not cross the other (imply unfinished traverse)
        # swap unmet elements with both rIndex and lIndex element
        arr[lIndex], arr[rIndex] = arr[rIndex], arr[lIndex]

    # Replace pivot with rIndex element
    arr[low], arr[rIndex] = arr[rIndex], arr[low]
    return rIndex

def quickSort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)

if __name__ == '__main__' :
  arr = [9, 5, 7, 4, 2, 8]
  quickSort(arr, 0, len(arr) - 1)
  print(arr)
```

### [Iterative Sort (Randomized element as pivot)](https://www.youtube.com/watch?v=SLauY6PpjW4&t=477s&ab_channel=HackerRank)

```py
def partition(arr, low, high):
    pivot = arr[(low + high) // 2]
    lIndex = low
    rIndex = high

    while lIndex <= rIndex:
        while arr[lIndex] < pivot:
            lIndex += 1

        while arr[rIndex] > pivot:
            rIndex -= 1

        if lIndex <= rIndex:
            arr[lIndex], arr[rIndex] = arr[rIndex], arr[lIndex]

    return lIndex
 
def quickSort(arr, low, high):
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)

if __name__ == '__main__' :
  arr = [9, 5, 7, 4, 2, 8]
  quickSort(arr, 0, len(arr) - 1)
  print(arr)
```

```java
Public class Solution {
    public static void quickSort(int[] array) {
        quickSort(array, 0, array.length - 1)
    }

    public static void quickSort(int[] array, int left, int right) {
        if (left < right) {
          int pivot = array[(left + right) / 2]; // pick a pivot
          int index = partition(array, left, right, pivot); // partition array around this pivot
          quicksort(array, left, index - 1); // Sort left-sided array of pivot
          quicksort(array, index, right); // Sort right-sided array of pivot
        }
    }

    public static int partition(int[] array, int left, int right, int pivot) {
        while(left <= right) {

            // Move left index inward until an out of order element is found
            while (array[left] < pivot) {
                left++;
            }

            // Move right index inward until an out of order element is found
            while (array[right] > pivot) {
                right--;
            }

            // if traverse undone, swap right and left index element then continue inward toward pivot
            // if left >= right, it imply that all smaller elements are left of pivot and larger elements are right of pivot
            if (left <= right) {
                swap(array, left, right);
                left++;
                right--;
            }
        }

        // New partition point
        return left;
    }
}
```

### Readings

- [Quick Sort](https://www.geeksforgeeks.org/quick-sort/)
- [Iterative Quick Sort](https://www.geeksforgeeks.org/iterative-quick-sort/)
- [Quick Sort - Computerphile](https://www.youtube.com/watch?v=XE4VP_8Y0BU&ab_channel=Computerphile)
- [Why Quick Sort preferred for Arrays and Merge Sort for Linked Lists?](https://www.geeksforgeeks.org/why-quick-sort-preferred-for-arrays-and-merge-sort-for-linked-lists/)
