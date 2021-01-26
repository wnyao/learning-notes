import math
import os
import random
import re
import sys

def birthdayCakeCandles(candles):
    maxNum = max(candles)
    totalMax = 0

    for i in range(0, len(candles)):
      if candles[i] == maxNum:
        totalMax += 1

    return totalMax
