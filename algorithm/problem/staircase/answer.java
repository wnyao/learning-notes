import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {
    // Complete the staircase function below.
    static void staircase(int n) {
      String space = " ";
      String symbol = "#";
     
      for (int i = 1; i <= n; i++) {
        // create a string made up of n copies of string s
        String spaces = String.join("", Collections.nCopies(n - i, " "));
        String symbols = String.join("", Collections.nCopies(i, "#"));
        System.out.println(spaces + symbols);
      }
    }
}
