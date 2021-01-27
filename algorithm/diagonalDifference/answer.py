import math
import os
import random
import re
import sys

def diagonalDifference(arr):
    total = 0

    for i in range(0, len(arr)):
      row = arr[i]
      total += row[i] - row[len(row) - (i + 1)]

    return abs(total)
