# Swapping 2 variables

1. Destructuring assignment

```js
function changeVal(a, b) {
  [a, b] = [b, a]; // a === 'world', b === 'hello'
}

changeVal('hello', 'world');
```

2. Temporary variable

```js
let a = 1;
let b = 2;
let temp;

temp = a;
a = b;
b = temp;
```

3. Addition and Difference

- only apply to number
- without use of additional memory

```js
let a = 1;
let b = 2;

a = a + b;
b = a - b;
a = a - b;

a; // => 2
b; // => 1
```

4. Bitwise XOR operator

- XOR operator performs XOR operation on each bit of n1 and n2 number

Bitwise XOR has 2 interesting properties:

- `n ^ n = 0`: bitwise XOR performed on the same number is 0
- `n ^ 0 = n`: bitwise XOR performed on a number and zero is the same number

```js
┌─────┬─────┬───────┐
│ a   │ b   │ a ^ b │
├─────┼─────┼───────┤
│ 0   │ 0   │   0   │
│ 1   │ 1   │   0   │
│ 0   │ 1   │   1   │
│ 1   │ 0   │   1   │
└─────┴─────┴───────┘

Eg.
-----
1 0 1 (5 in binary)
1 1 1 (7 in binary)
0 1 0 (5 ^ 7 = 2 in binary)
```


### Reference

- [4 Ways to Swap Variables in JavaScript](https://dmitripavlutin.com/swap-variables-javascript/#:~:text=temp%20is%20the%20temporary%20variable,the%20initial%20value%20of%20a%20).)
