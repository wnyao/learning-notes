import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

class Result {

    private static int getMax(List<Integer> intergers) {
      int maxNum = 0;
      
      // find maximum in List
      for (int i = 0; i < intergers.size(); i++) {
        int value = intergers.get(i);
        if (value > maxNum) {
          maxNum = value;
        }
      }
      return maxNum;
    }

    public static int birthdayCakeCandles(List<Integer> candles) {
      int totalHighest = 0;
      int maxValue = getMax(candles);
      
      for (int j= 0; j < candles.size(); j++) {
        int value = candles.get(j);
        if (value != maxValue) {
          totalHighest++;
        }
      }
     
      return totalHighest;
    }
}
