### Question

Given two strings, find the number of common characters between them.

### Example

For `s1 = "aabcc"` and `s2 = "adcaa"`, the output should be `solution(s1, s2) = 3`.

Strings have `3` common characters - `2` "a"s and `1` "c".

### Input/Output

- [execution time limit] 4 seconds (js)
- [input] string s1 - A string consisting of lowercase English letters.
- [input] string s2 - A string consisting of lowercase English letters.
- [output] integer

### Solution

```js
const solution = (s1, s2) => {
  for (let i = 0; i < s1.length; i++) {
    s2 = s2.replace(s1[i], "!")
  }

  return s2.replace(/[^!]/g, '').length
}
```
