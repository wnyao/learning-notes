/*
 * AS SOLVED IN KHAN ACADEMY
 *
 * Returns either the index of the location in the array,
 * or -1 if the array did not contain the targetValue
 * */

const doSearch = (array, targetValue) => {
  var min = 0;
  var max = array.length - 1;
  var guess;

  while (max >= min) {
    guess = Math.floor((max - min) / 2 + min); // round down the number instead of up

    if (array[guess] === targetValue) {
      return guess;
    } else if (array[guess] < targetValue) {
      min = guess + 1;
    } else {
      max = guess - 1;
    }
  }

  return -1;
};

module.exports = {
  answer: doSearch,
};
