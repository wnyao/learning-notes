# Floating point representation

![IEEE-754 format](https://www.avioconsulting.com/hubfs/Imported_Blog_Media/2017-11-18%2018_19_11-Clipboard.png)

- JS supports one mathematical type, 64-bit (binary) floating point numbers
- Floating point number are represented as binary (base 2) fractions.
- The representation of floating point follows IEEE-754 format.
- 64 bits is divided in 3 parts, the fraction (aka mantissa) in bits 0 to 51, the exponent in bit 52 to 62, and the sign in bit 63.
- Regrettably, most decimal fractions cannot be represented well as binary fraction, only approximated by the binary floating point number stored in the machine.
- With that, you'll see floating-point arithmetic not 100% accurate.

  ```js
  0.2 + 0.1
  0.30000000000000004

  0.3 - 0.1
  0.19999999999999998
  ```

### Problem

- **losing precision** while performing operations, such as addition and subtraction on decimal numbers with very different absolute number.
- Integer numbers between `-2^53 < x < 2^53` are accurately represented. Beyond this threshold, not all integer numbers can be represented. In short, integer numbers are accurate up to 15 digits.

  ```js
  // NOTE: Number min and max safe integer represented in power of
  Number.MIN_SAFE_INTEGER === Math.pow(-2, 53) + 1
  Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
  ```

### Prevention

The real issue is floating point numbers and how errors can creep in when converted to and from binary format.

##### Strategies for dealing decimal number

- One way to address is to take the floating point aspect of things away and instead work with derived integers and then dividing the result

  ```js
  const result = (0.2 * 10 + 0.1 * 10) / 10; // 0.3
  ```

- Uses a tiny rounding error value as the tolerance for comparison, the tiny value is often called machine epsilon

  ```js
  function numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON
  }

  var a = 0.1 + 0.2
  var b = 0.3

  numbersCloseEnoughToEqual(a, b) // true
  numbersCloseEnoughToEqual(0.0000001, 0.0000002) // false
  ```

- Other way such as delegate the calculation to BE service and passing to FE as string for display purposes
- Library that provide alternative to JS number `big.js, bignumber.js, decimal.js, bigdecimal.js, numeral.js`

##### Strategies for dealing integer number
- In most scenario, it could declare that there is no problem.
- Problem arises when working with obscenely large numbers, but we simply do not use such large numbers.
- Best to reject values outside of the safe range or using custom serializer/unserializer.

### Reference

- [Overcoming JavaScript Numeric Precision Issues](https://www.avioconsulting.com/blog/overcoming-javascript-numeric-precision-issues#:~:text=In%20Javascript%2C%20all%20numbers%20are,the%20sign%20in%20bit%2063.)
- [JavaScript Corner: Math and the Pitfalls of Floating Point Numbers](https://www.codemag.com/article/1811041/JavaScript-Corner-Math-and-the-Pitfalls-of-Floating-Point-Numbers)
