def insertionSort2(n, arr):
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
