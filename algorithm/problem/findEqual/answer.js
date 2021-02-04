const findEqual = (numbers, sum) => {
  if (!numbers || !sum || numbers.length === 0) return false;
  let nums = numbers.filter((x) => x < sum);

  for (let i = 0; i < nums.length; i++) {
    const num1 = nums[i];
    const diff = sum - num1;
    if (nums.includes(diff)) return true;
  }

  return false;
};

module.exports = { answer: findEqual };
