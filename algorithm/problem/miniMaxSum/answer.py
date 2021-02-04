# Anwser 1
def miniMaxSumOne(arr):
  minNum = min(arr)
  maxNum = max(arr)

  minSum = 0
  maxSum = 0
  for i in range(0, len(arr)):
    value = arr[i]
    if value != minNum:
      maxSum += value
    if value != maxNum:
      minSum += value

  print(str(minSum) + " " + str(maxSum))

# Anwser 2
def miniMaxSumTwo(arr):
  sums = []

  for i in range(0, len(arr)):
    cloneArr = list.copy(arr)
    del cloneArr[i]
    sums.append(sum(cloneArr))

  minSum = min(sums)
  maxSum = max(sums)
  print(str(minSum) + " " + str(maxSum))
