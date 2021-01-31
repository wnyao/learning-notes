import math

# answer 1 -----------------------------------------------------
def insertionSort1(n, arr):
  lastNum = arr[-1]
  subArr = arr[:-1]
  finish = False

  # for loop in reverse
  for i in range(len(subArr) - 1, -2, -1):

    if i < 0 or subArr[i] < lastNum:
      arr[i + 1] = lastNum
      finish = True
    else:
      arr[i + 1] = subArr[i]

    # convert int[] to string[], then jon
    strArr = map(str, arr)
    print(" ".join(strArr))
    if finish: break

# answer 2 -----------------------------------------------------
def insertionSort2(n, arr):
  target = arr[-1]
  idx = n-2

  while (target < arr[idx]) and (idx >= 0):
      arr[idx+1] = arr[idx]
      print(' '.join(map(str, arr)))
      idx -= 1

  arr[idx+1] = target
  print(' '.join(map(str, arr)))
