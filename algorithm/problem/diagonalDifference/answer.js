// answer 1
function diagonalDifference(arr) {
  let [sumF, sumB] = [0, 0];

  for (let i = 0; i < arr.length; i++) {
    const nums = arr[i];
    sumF += nums[i];
    sumB += nums[nums.length - (i + 1)];
  }

  return Math.abs(sumF - sumB);
}

// answer 2
function diagonalDifference(arr) {
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    const numbers = arr[i];

    const f = numbers[i];
    const b = numbers[numbers.length - (i + 1)];
    total -= f - b;
  }

  return Math.abs(total);
}
