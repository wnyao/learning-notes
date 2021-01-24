const findPrime = (numbers, primeNum) => {
  if (
    !numbers ||
    !primeNum ||
    !numbers.includes(primeNum) ||
    numbers.length === 0
  ) {
    return 0;
  }

  let min = 0;
  let max = numbers.length - 1;
  let pointerIndex = Math.floor(max / 2);
  let pointer = numbers[pointerIndex];

  const primes = numbers.sort((a, b) => (b > a ? -1 : 1)); // sort number in ascending order
  if (primeNum > primes[numbers.length - 1]) return 0; // check given argument larger than last index of number

  while (pointer !== primeNum) {
    if (pointer < primeNum) {
      min = pointerIndex + 1;
    } else {
      max = pointerIndex - 1;
    }

    pointerIndex = Math.floor((max - min) / 2 + min);
    pointer = numbers[pointerIndex];
  }

  return pointerIndex;
};

module.exports = { answer: findPrime };
