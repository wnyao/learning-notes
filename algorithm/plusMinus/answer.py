def plusMinus(arr):
  length = len(arr)
  posVal = 0.0
  negVal = 0.0
  neuVal = 0.0

  for num in arr:
    if num == 0:
      neuVal += 1
    elif num > 0:
      posVal += 1
    elif num < 0:
      negVal += 1

  posRatio = round(posVal / length, 6)
  negRatio = round(negVal / length, 6)
  neuRatio = round(neuVal / length, 6)
  print(str(posRatio) + "\n" + str(negRatio) + "\n" + str(neuRatio))
