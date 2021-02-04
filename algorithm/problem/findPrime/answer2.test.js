const { answer } = require("./answer2");

const primes = [
  2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97,
];

test("has equal 73", () => {
  const index = answer(primes, 73);
  expect(index).not.toBeNull();
  expect(index).toBe(20);
});

test("has equal 97", () => {
  const index = answer(primes, 97);
  expect(index).not.toBeNull();
  expect(index).toBe(24);
});

test("given even number", () => {
  const index = answer(primes, 4);
  expect(index).not.toBeNull();
  expect(index).toBe(-1);
});
