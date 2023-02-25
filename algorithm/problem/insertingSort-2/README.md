# Insertion Sort

```js
function insertionSort2(n, arr) {
  for (let i = 1; i < n; i++) {
    let previous = arr[i - 1];
    let current = arr[i];

    while (previous > current) {
      // swap places (execution order is important)
      arr[arr.indexOf(current)] = previous;
      arr[arr.indexOf(previous)] = current;

      // handle index previous go beyond index 0
      if (arr.indexOf(current) - 1 < 0) break;

      // switch [previous, current] 1 place backward
      previous = arr[arr.indexOf(current) - 1];
      current = arr[arr.indexOf(current)];
    }

    console.log(arr.join(" "));
  }
}
```

```js
# answer2 (personal attempt) ---------------------------------------

def insertionSort1(n, arr):
    for i in range(1, n):
        previous = arr[i - 1]
        current = arr[i]

    while previous > current:
        # swap places (execution order is important)
        arr[arr.index(current)] = previous
        arr[arr.index(previous)] = current

      # handle index previous go beyond index 0
      if arr.index(current) - 1 < 0: break

      # switch [previous, current] 1 place backward
      previous = arr[arr.index(current) - 1]
      current = arr[arr.index(current)]

    print(" ".join(map(str, arr)))



# answer2 ------------------------------------------------------
# https://yourbasic.org/algorithms/loop-invariants-explained/

def insertionSort2(n, arr):

  for j in range(1, n):
    key = arr[j]
    i = j - 1

    while i >= 0 and arr[i] > key:
      arr[i + 1] = arr[i]
      i = i - 1

    arr[i + 1] = key
    print(" ".join(map(str, arr)));
```
