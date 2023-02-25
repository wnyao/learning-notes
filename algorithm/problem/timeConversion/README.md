# Time Conversion

Given a time in 12-hour AM/PM format, convert it to military (24-hour) time.

**Note:**

- 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock.
- 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.

### Example

```
s = '12:01:00PM'
Return '12:01:00'.
```

```
s = '12:01:00AM'
Return '00:01:00'.
```

### Function Description

Complete the timeConversion function in the editor below. It should return a new string representing the input time in 24 hour format.

timeConversion has the following parameter(s):

- string s: a time in 12 hour format

### Returns

- string: the time in hour format

### Input Format

A single string `s` that represents a time in 12-hour clock format (i.e.: `hh:mm:ssAM` or `hh:mm:ssPM`).

### Constraints

- All input times are valid

**Sample Input 0**

```
07:05:45PM
```

**Sample Output 0**

```
19:05:45
```

### Solution

```js
// answer 1 ------------------------------------------------------

function timeConversion(s) {
  let [hour, minute, second] = s.split(":");

  let hourInt = parseInt(hour);
  if (second.includes("AM") && hourInt == 12) hour = "00";
  if (second.includes("PM") && hourInt !== 12) {
    hourInt += 12;
    hour = hourInt.toString();
  }

  second = second.replace(/\D/g, "");
  return `${hour}:${minute}:${second}`;
}

// answer 2 ------------------------------------------------------

function timeConversion(s) {
  let [hour, minute, second] = s.replace(/\D/g, " ").split(" ");

  hour = parseInt(hour);
  hour = (hour % 12) + s.includes("PM") * 12;

  const time = `${formatToTwoDigits(hour)}:${minute}:${second}`;
  return time;
}

function formatToTwoDigits(num) {
  return num.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
```

```py
def timeConversion(s):
  hh, mm, ss = map(int, s[:-2].split(':'))
  aa = s[-2:]

  hh = hh % 12 + (aa.upper() == 'PM') * 12
  print(('%02d:%02d:%02d') % (hh, mm, ss))

  mTime = "{0:02d}:{1:02d}:{2:02d}".format(hh, mm, ss)
  return mTime
```

```java
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
```
