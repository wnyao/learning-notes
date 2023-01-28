# Floating point representation

![IEEE-754 format](https://www.avioconsulting.com/hubfs/Imported_Blog_Media/2017-11-18%2018_19_11-Clipboard.png)

- In JS, all numbers are encoded as double precision floating point numbers.
- The representation of floating point follows IEEE-754 format.
- This format stores numbers in 64 bits, where the number, the fraction (aka mantissa), is stored in bits 0 to 51, the exponent in bit 52 to 62, and the sign in bit 63.

- Floating point number are represented as binary (base 2) fractions.
- Regrettably, most decimal fractions cannot be represented exactly as binary fraction, only approximated by the binary floating point number stored in the machine.
- With that, you'll see floating-point arithmetic is not 100% accurate.

```js
0.2 + 0.1
0.30000000000000004

0.3 - 0.1
0.19999999999999998
```

## Problem

- **losing precision** while performing operations, such as addition and subtraction on decimal numbers with very different absolute number.
- Integer numbers between `-2^53 < x < 2^53` are accurately represented. Beyond this threshold, not all integer numbers can be represented. In short, integer numbers are accurate up to 15 digits.

## Prevention

**Strategies for decimal number**
- To prevent losing precision, decimal values must be serialized as strings and not as JSON numbers.
- There should also be way to tell if JSON string corresponds to a decimal number or is merely a string.
- Library that provide alternative to JS number, big.js, bignumber.js, decimal.js, and bigdecimal.js

**Strategies for integer number**
- In most scenario, it could declare that there is no problem.
- Problem arises when working with obscenely large numbers, but we simply do not use such large numbers.
- Best to reject values outside of the safe range or using custom serializer/unserializer.

### Reference

- [Overcoming JavaScript Numeric Precision Issues](https://www.avioconsulting.com/blog/overcoming-javascript-numeric-precision-issues#:~:text=In%20Javascript%2C%20all%20numbers%20are,the%20sign%20in%20bit%2063.)


