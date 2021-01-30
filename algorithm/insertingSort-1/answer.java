import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {

    static void insertionSort1(int n, int[] arr) {    
      int lastValue = arr[n - 1];
      boolean finish = false;
      
      for (int i = n - 2; i >= -1; i--) {
        if (i < 0 || arr[i] < lastValue) {
          arr[i + 1] = lastValue;
          finish = true;
        } else {
          arr[i + 1] = arr[i];
        }
        
        String[] strArray = Arrays.stream(arr).mapToObj(String::valueOf).toArray(String[]::new);
        String joinedString = String.join(" ", strArray);
        System.out.println(joinedString);
        if (finish) break;
      }
    }
}
