const findPossibleSum = (numbers, sum) => {
  // early return
  if (!numbers || !sum || numbers.length < 2) return [];

  // filter number larger than sum
  let nums = numbers.filter((x) => x < sum);
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    const num1 = nums[i];
    const diff = sum - num1;

    // check is diff included in the list
    const hasDiff = nums.includes(diff);

    if (!hasDiff) {
      // filter out non pairable number
      nums = nums.filter((x) => x !== num1);
    } else {
      // filter out pairable numbers
      nums = nums.filter((x) => x !== diff && x !== num1);
      result.push([num1, diff]);
    }

    // reset i to biginning index
    i = -1;
  }

  return result;
};

module.exports = { answer: findPossibleSum };
