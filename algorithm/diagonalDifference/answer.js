const diagonalDifference = (arr) => {
  if (!arr || arr.length === 0) return 0;

  let sum1 = 0;
  let sum2 = 0;

  // i start from 1
  arr.forEach((row, i) => {
    const length = row.length;
    if (length === 1) return;
    const index = i - 1;

    // add number diagonally
    sum1 += row[index];
    sum2 += row[length - 1 - index];
  });

  return Math.abs(sum2 - sum1);
};

module.exports = { answer: diagonalDifference };
