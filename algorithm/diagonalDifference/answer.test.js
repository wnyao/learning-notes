const { answer } = require("./answer");

const numbers = [[3], [11, 2, 4], [4, 5, 6], [10, 8, -12]];
const outcome = 15;

test("find possible sum", () => {
  const result = answer(numbers);
  expect(result).not.toBeNull();
  expect(result).toBe(outcome);
});

test("invalid argument", () => {
  const result = answer(null);
  expect(result).not.toBeNull();
  expect(result).toBe(0);
});
