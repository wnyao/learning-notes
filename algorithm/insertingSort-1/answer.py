import math
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

