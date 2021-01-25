// Answer 1
function miniMaxSumOld(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  let maxSum = 0;
  let minSum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (value !== max) minSum += arr[i];
    if (value !== min) maxSum += arr[i];
  }

  console.log(`${minSum} ${maxSum}`);
}

// Answer 2
function miniMaxSum(arr) {
  let sums = [];

  for (let i = 0; i < arr.length; i++) {
    const total = arr.reduce((acc, cur) => {
      if (cur !== arr[i]) return acc + cur;
      else return acc;
    }, 0);
    sums.push(total);
  }

  console.log(`${Math.min(...sums)} ${Math.max(...sums)}`);
}
