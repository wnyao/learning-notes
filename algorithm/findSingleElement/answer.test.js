const { answer } = require("./answer");

test("find single element (test 1)", () => {
  const numbers = [1, 1, 2, 2, 3];
  const result = answer(numbers);

  expect(result).not.toBeNull();
  expect(result.length === 1).toBeTruthy();
  expect(result.includes(3)).toBeTruthy();
});

test("find single element (test 2)", () => {
  const numbers = [1, 1, 3, 2, 4, 2];
  const result = answer(numbers);

  expect(result).not.toBeNull();
  expect(result.length === 2).toBeTruthy();
  expect(result.includes(3)).toBeTruthy();
  expect(result.includes(4)).toBeTruthy();
});

test("find single element (test 3)", () => {
  const numbers = [1, 1, 3, 2, 4, 4, 4, 5, 7];
  const result = answer(numbers);

  expect(result).not.toBeNull();
  expect(result.length === 4).toBeTruthy();
  expect(result.includes(3)).toBeTruthy();
  expect(result.includes(2)).toBeTruthy();
  expect(result.includes(5)).toBeTruthy();
  expect(result.includes(7)).toBeTruthy();
});

test("invalid argument", () => {
  const result = answer(null);
  expect(result).not.toBeNull();
  expect(typeof result).toBe("object");
  expect(result.length).toBe(0);
});
