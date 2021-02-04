function plusMinus(arr) {
  let [posCount, negCount, neuCount] = [0, 0, 0];

  for (let i = 0; i < arr.length; i++) {
    let number = arr[i];
    if (number > 0) posCount += 1;
    if (number < 0) negCount += 1;
    if (number === 0) neuCount += 1;
  }

  const posR = posCount / arr.length;
  const negR = negCount / arr.length;
  const neuR = neuCount / arr.length;
  console.log(posR.toFixed(6));
  console.log(negR.toFixed(6));
  console.log(neuR.toFixed(6));
}
