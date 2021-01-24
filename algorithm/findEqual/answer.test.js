const { answer } = require("./answer");

test("has equal", () => {
  const numbers = [1, 9, 11, 13, 2, 3, 7, 5];
  const sum = 12;

  const result = answer(numbers, sum);
  expect(result).not.toBeNull();
  expect(result).toBe(true);
});

test("has no equal", () => {
  const numbers = [2, 9, 1, 4];
  const sum = 12;

  const result = answer(numbers, sum);
  expect(result).not.toBeNull();
  expect(result).toBe(false);
});

test("invalid numbers arguments", () => {
  const result = answer(null, 12);
  expect(result).not.toBeNull();
  expect(result).toBeFalsy();
});

test("invalid sum arguments", () => {
  const result = answer([], null);
  expect(result).not.toBeNull();
  expect(result).toBeFalsy();
});
