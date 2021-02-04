const { answer } = require("./answer");

const numbers = [1, 9, 11, 13, 2, 3, 7, 5];
const sum = 12;
const outcome = [
  [1, 11],
  [9, 3],
  [7, 5],
];

test("find possible sum", () => {
  const result = answer(numbers, sum);
  expect(result).not.toBeNull();
  expect(result.length).toBe(3);

  const sortedAnswer = outcome.map((x) => x.sort);
  result.forEach((x) => {
    const sortedX = x.sort();
    const indexOf = sortedAnswer.includes(sortedAnswer);

    expect(indexOf > -1).toBeTruthy();
  });
});

test("invalid numbers arguments", () => {
  const result = answer(null, sum);
  expect(result).not.toBeNull();
  expect(result.length).toBe(0);
});

test("invalid sum arguments", () => {
  const result = answer(numbers);
  expect(result).not.toBeNull();
  expect(result.length).toBe(0);
});
