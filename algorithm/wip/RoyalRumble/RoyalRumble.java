import java.util.List;
import java.util.Collections;

public class RoyalRumble {
    public List<String> getSortedList(List<String> names) {
        // Sort list in aphabetical order
        Collections.sort(names);

        String[] currentFullname = new String[2];
        String[] nextFullname = new String[2];
        String currentRomanNum, nextRomanNum, currentName, nextName;
        Integer currentNum = 0;
        Integer nextNum = 0;
        Integer index = 0;
        Integer nextIndex = 1;
        Integer namesSize = names.size();

        while (index < namesSize) {
            // Break at max
            if (namesSize.equals(nextIndex)) {
                break;
            }

            // Name at current index
            currentFullname = names.get(index).split("\\s+");
            currentName = currentFullname[0];
            currentRomanNum = currentFullname[1];

            // Name at next index
            nextFullname = names.get(nextIndex).split("\\s+");
            nextName = nextFullname[0];
            nextRomanNum = nextFullname[1];

            // Check for similar name
            if (currentName.equals(nextName)) {
                currentNum = RomanNumeralsToInt(currentRomanNum);
                nextNum = RomanNumeralsToInt(nextRomanNum);

                // Compare number and swap forward
                if (nextNum < currentNum) {
                    Collections.swap(names, index, nextIndex);
                }
            }

            index++;
            nextIndex++;
        }

        return names;
    }

    public static Integer RomanNumeralsToInt(String romanNum) {
        int result = 0;
        int[] number = { 50, 40, 10, 9, 5, 4, 1 };
        String[] roman = { "L", "XL", "X", "IX", "V", "IV", "I" };

        for (int i = 0; i < number.length; i++) {
            while (romanNum.indexOf(roman[i]) == 0) {
                result += number[i];
                romanNum = romanNum.substring(roman[i].length());
            }
        }
        return result;
    }

}
