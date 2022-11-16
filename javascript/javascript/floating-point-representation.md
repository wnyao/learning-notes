# Floating point representation

JavaScript follows a **32bit floating point representation** for numbers.

Out of 32bits:
- 1 is sign bit
- 8 bits indicate the exponent of value
- 23 bits represents fraction value

> floating point representation causes some rounding errors. Thus, `0.1 + 0.2 !== 0.3` yields false.

### Reference

- [Why 0.1 + 0.2 == 0.3 is false in JS? Mystery Unsolved With Solution](https://gauravkk22.medium.com/why-0-1-0-2-0-3-is-false-in-js-mystery-unsolved-with-solution-4f7db2755f18#:~:text=With%20decimal%20fractions%2C%20this%20floating,0.2%20%3D%3D%3D%200.3%20yields%20false.)


