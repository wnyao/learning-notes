# Quick Sort

### Description

QuickSort is a **Divide and Conquer algoritm**. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivott in different ways:

1. Always pick first element as pivot.
2. Always pick last element as pivot (as below).
3. Pick a random element as pivot.
4. Pick median as pivot.

### Sample Input

```
arr = {10, 80, 30, 90, 40, 50, 70}
low = 0
high = 6
```

### Code

```
/**
 * low  --> Starting index,
 * high  --> Ending index
 */
quickSort(arr, low, high) {
    if (low < high) {
        // pi is partitioning index, arr[pi] is now at right place
        pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);  // Before pi
        quickSort(arr, pi + 1, high); // After pi
    }
}
```

```
/**
 * This function takes last element as pivot, places
 * the pivot element at its correct position in sorted
 * array, and places all smaller (smaller than pivot)
 * to left of pivot and all greater elements to right
 * of pivot
 */
partition(arr, low, high) {
    pivot = arr[high]; // pivot (Element to be placed at right position)
    i = (low - 1) // Index of smaller element

    for (j = low; j <= high- 1; j++) {
        // If current element is smaller than the pivot
        if (arr[j] < pivot) {
            i++; // increment index of smaller element
            swap arr[i] and arr[j]
        }
    }

    swap arr[i + 1] and arr[high])
    return (i + 1)
}
```

### Execution

```
arr[] = { 10, 80, 30, 90, 40, 50, 70 }
Indexes:  0   1   2   3   4   5   6

low = 0
high =  6
pivot = arr[h] = 70
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

# Readings

- https://www.geeksforgeeks.org/quick-sort/
