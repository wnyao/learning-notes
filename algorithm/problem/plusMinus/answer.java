
import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {
  
    static String fixedDecimal(float value, int to) {
      return String.format("%." + to + "f", value);
    }

    static void plusMinus(int[] arr) {
      int arrLength = arr.length ;
      float posCount = 0;
      float negCount = 0;
      float neuCount = 0;

      for (int i = 0; i < arrLength; i++) {
        int value = arr[i];
        
        if (value > 0) posCount++;
        else if (value < 0) negCount++;
        else if (value == 0) neuCount++;
      }
      
      float posRatio = posCount / arrLength;
      float negRatio = negCount / arrLength;
      float neuRatio = neuCount / arrLength;
      System.out.println(fixedDecimal(posRatio, 6));
      System.out.println(fixedDecimal(negRatio, 6));
      System.out.println(fixedDecimal(neuRatio, 6));
    }
}
