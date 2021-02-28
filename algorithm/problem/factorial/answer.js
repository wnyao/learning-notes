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
