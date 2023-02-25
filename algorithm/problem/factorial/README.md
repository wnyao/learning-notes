### Factorial function

### Description

We indicate factorial of `n` by `n!`. It's the product of integers 1 through n. For example, `5!` equals `1 * 2 * 3 * 4 * 5`, or 120.

Factorial function is useful for when trying to count how many different orders there are for things or how many different ways we can combine things (permutation and combinations).

The factorial function is defined for all positive integers, along with 0. What value should `0!` have? It's the product of intergers greater than or equal to 1 and less than or equal to 0. But there are no such integers. Therefore, `0!` is defined to equal the identity of multiplication, which is 1.

`n!` is the product (multiplication) of all the whole numbers from n to 1

```
e.g.
3! = 3 * 2 * 1
2! = 2 * 1
1! = 1
```

`0!` is a special case. We say that `0! = 1`.

We use factorials when we look at permutations and combinations. Permutations tell us how many different ways we can arrange things if their order matters. Combinations tells us how many ways we can choose k item from n items if their order does not matter. If we have n different items, then we can permute (arrange) them in `n!` different arrangements.

e.g.
If we have 3 items: `A,B,C` then there are `3! = 3 * 2 * 1 = 6` different permutations.

Here they are:
ABC, ACB, BAC, BCA, CAB, CBA

If we have n items there are `n!/(k! * (n-k)!)` different combinations of choosing k items from those n items.

e.g.
If we 5 items: `A,B,C,D,E` and we want to choose 2 items at a time then there are:
`5!/( 2! * (5-2)!) = 5! / (2! * 3!) = 120/(2 * 6) = 10` different combinations

Here they are:
AB, AC, AD, AE, BC, BD, BE, CD, CE, DE

**Note:** CB would be considered as the same combination as BC, because order doesn't matter

### Solution

```js
// Recursive approach
const factorial1 = (num) => {
  return 0 ? 1 : num * factorial1(num - 1)
}

// Iterative approach
const factorial = (n) => {
  let result = 1;

  for (let i = result; i <= n; i++) {
    result *= i;
  }

  return result;
};

console.log("The value of 5! should be " + 5 * 4 * 3 * 2 * 1);
console.log("The value of 5! is " + factorial(5));

console.log("The value of 0! should be 1");
console.log("The value of 0! is " + factorial(0));
```

### Reference

- [The factorial function](https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/the-factorial-function)
