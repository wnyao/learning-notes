# Quick Sort

- QuickSort is a **Divide and Conquer algoritm**.
- Useful for sorting array data structure.
- Unlike merge sort comparatively, quick sort in general form is an in-place sort (i.e. it doesn't require any extra storage)
- Also a cache friendly sorting algorithm as it has good locality of reference when used for arrays.
- The average sort time of a Quicksort is `O(n log n)`, but the worst-case sort time is `O(n^2)`.

## Performance

The time taken by quick sort depends upon the input array and partition strategy.

### Best case

The best case occurs when the partition process always picks the middle element as pivot.

### Worst case

The worst case occurs when the partition process always picks greatest or smallest element as pivot. If we consider partition strategy where last element is always picked as pivot, the worst case would occur when the array is already sorted in increasing or decreasing order.

Even modified versions of the Quicksort can have a worst-case sort time of `O(n^2)` when one of these events occurs:

- The dataset is already sorted in the desired order.
- The dataset is sorted in reverse order.
- All the elements in the dataset are the same.

## Concept

It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways:

- Always pick first element as pivot.
- Always pick last element as pivot (as below).
- Pick a random element as pivot.
- Pick median as pivot.

Basic process:

1. Find a “pivot” item in the array. This item is the basis for comparison for a single round.
2. Start a pointer (the left pointer) at the first item in the array.
3. Start a pointer (the right pointer) at the last item in the array.
4. While the value at the left pointer in the array is less than the pivot value, move the left pointer to the right (add 1). Continue until the value at the left pointer is greater than or equal to the pivot value.
5. While the value at the right pointer in the array is greater than the pivot value, move the right pointer to the left (subtract 1). Continue until the value at the right pointer is less than or equal to the pivot value.
6. If the left pointer is less than or equal to the right pointer, then swap the values at these locations in the array.
7. Move the left pointer to the right by one and the right pointer to the left by one.
8. If the left pointer and right pointer don’t meet, go to step 1.

## Code

### [Iterative Quick Sort (Last element as pivot)](https://www.geeksforgeeks.org/iterative-quick-sort/)

- Last elemenet as pivot
- At worst case sort time `O(n^2)`, as subsequent arr will get called to quick sort
- Picking last element as pivot causes worst-case behavior on already sorted arrays. It can be solved by choosing either a random index for the pivot, or choosing the middle index of the partition or choosing the median of the first, middle and last element of the partition for the pivot

```python
# A typical recursive Python
# implementation of QuickSort

# Function takes last element as pivot,
# places the pivot element at its correct
# position in sorted array, and places all
# smaller (smaller than pivot) to left of
# pivot and all greater elements to right
# of pivot
def partition(arr, low, high):
    i = (low - 1)         # index of smaller element
    pivot = arr[high]     # pivot last element

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
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return (i + 1)

# The main function that implements QuickSort
# arr[] --> Array to be sorted,
# low --> Starting index,
# high --> Ending index

# Function to do Quick sort
def quickSort(arr, low, high):
    if low < high:

        # pi is partitioning index, arr[p] is now
        # at right place
        pi = partition(arr, low, high)

        # Separately sort elements before
        # partition and after partition
        quickSort(arr, low, pi-1)
        quickSort(arr, pi + 1, high)

# Driver Code
if __name__ == '__main__' :

    arr = [4, 2, 6, 9, 2]
    n = len(arr)

    # Calling quickSort function
    quickSort(arr, 0, n - 1)

    for i in range(n):
        print(arr[i], end = " ")
```

#### Explanation

```text
arr[] = { 10, 80, 30, 90, 40, 50, 70 }
Indexes:  0   1   2   3   4   5   6

low = 0
high =  6
pivot = arr[h] = 70 Pivot last element
i = -1 Initialize index of smaller element

Traverse elements from j = low to high-1
j = 0 : Since arr[j] <= pivot, do i++ and swap(arr[i], arr[j])
i = 0
arr[] = { "10", 80, 30, 90, 40, 50, 70 } No change as i and j are same

j = 1 : Since arr[j] > pivot, do nothing
No change in i and arr[]

j = 2 : Since arr[j] <= pivot, do i++ and swap(arr[i], arr[j])
i = 1
arr[] = { 10, "30", "80", 90, 40, 50, 70 } We swap 80 and 30

j = 3 : Since arr[j] > pivot, do nothing
No change in i and arr[]

j = 4 : Since arr[j] <= pivot, do i++ and swap(arr[i], arr[j])
i = 2
arr[] = {10, 30, "40", 90, "80", 50, 70} 80 and 40 Swapped

j = 5 : Since arr[j] <= pivot, do i++ and swap arr[i] with arr[j]
i = 3
arr[] = {10, 30, 40, "50", 80, "90", 70} // 90 and 50 Swapped

We come out of loop because j is now equal to high-1.
Finally we place pivot at correct position by swapping

arr[i+1] and arr[high] (or pivot)
arr[] = {10, 30, 40, 50, "70", 90, "80"} 80 and 70 Swapped

Now 70 is at its correct place. All elements smaller than
70 are before it and all elements greater than 70 are after
it.
```

### [Iterative Sort (First element as pivot)](https://g.co/kgs/oM2Z3y)

The inner loop of this example continuously searches for elements that are in the wrong place and swaps them. When the code can no longer swap items, it breaks out of the loop and sets a new pivot point, which it returns to the caller. This is the iterative part of the process. The recursive part of the process handles the left and right side of the dataset,

```python
data = [9, 5, 7, 4, 2, 8]

def partition(data, left, right):
    pivot = data[left]
    lIndex = left + 1 # Given 1st element is used as pivit we start at left + 1
    rIndex = right

    while True:
        # If lIndex not go over rIndex and
        # left index element less than or equal to pivot
        while lIndex <= rIndex and data[lIndex] <= pivot:
            lIndex += 1

        # If rIndex not go over lIndex and
        # right index element more than or equal to pivot
        while rIndex >= lIndex and data[rIndex] >= pivot:
            rIndex -= 1

        # If rIndex crossed lIndex
        if rIndex <= lIndex:
            break

        # if both indexes not cross the other (imply unfinished traverse)
        # swap unmet elements with both rIndex and lIndex element
        data[lIndex], data[rIndex] = data[rIndex], data[lIndex]

    # Replace pivot with rIndex element
    data[left], data[rIndex] = data[rIndex], data[left]
    return rIndex

def quickSort(data, left, right):
    if right <= left:
        return
    else:
        pivot = partition(data, left, right)
        quickSort(data, left, pivot-1)
        quickSort(data, pivot+1, right)

    return data

# Execution
quickSort(data, 0, len(data)-1)
```

### [Iterative Sort (Randomized element as pivot)](https://www.youtube.com/watch?v=SLauY6PpjW4&t=477s&ab_channel=HackerRank)

```java

Public class Solution {

    public static void quickSort(int[] array) {
        quickSort(array, 0, array.length - 1)
    }

    public static void quickSort(int[] array, int left, int right) {
        if (left >= right) {
            return;
        }

        int pivot = array[(left + right) / 2]; // pick a pivot
        int index = partition(array, left, right, pivot); // partition array around this pivot
        quicksort(array, left, index - 1); // Sort left-sided array of pivot
        quicksort(array, index, right); // Sort right-sided array of pivot
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
            if (left <= right) {
                swap(array, left, right);
                left++;
                right--;
            }
        }

        # New partition point
        return left;
    }
}

```

### Readings

- [Quick Sort](https://www.geeksforgeeks.org/quick-sort/)
- [Iterative Quick Sort](https://www.geeksforgeeks.org/iterative-quick-sort/)
- [Quick Sort - Computerphile](https://www.youtube.com/watch?v=XE4VP_8Y0BU&ab_channel=Computerphile)
- [Why Quick Sort preferred for Arrays and Merge Sort for Linked Lists?](https://www.geeksforgeeks.org/why-quick-sort-preferred-for-arrays-and-merge-sort-for-linked-lists/)
