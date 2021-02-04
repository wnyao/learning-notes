
public class Solution {

    static String timeConversion(String s) {
      String[] time = s.split(":");
      String hour = time[0];
      String minit = time[1];
      String second = time[2];
      
      // parse strig to int
      int hourInt = Integer.parseInt(hour);
      
      // 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.
      if (second.contains("PM") && hourInt != 12) {
        hourInt += 12;
        hour = String.valueOf(hourInt);
      }

      // 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock.
      if (second.contains("AM") && hourInt == 12) {
        hour = "00";
      }
      
      // replace PM/AM
      second  = second.replaceAll("[^\\d.]", "");
      String convertedTime = hour + ":" + minit + ":" + second;
      return convertedTime;
    }
}
