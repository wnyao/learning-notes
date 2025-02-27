/** Functional programming - techniques on recursion
 *
 * Techniques:
 * - Normal type of recursion
 * - PTC (Proper Tail Call)
 * - CPS (Continuation Passing Style)
 * - Trampoline
 *
 * Visit to understand more:
 * - https://www.youtube.com/watch?v=EwFFoLIypn8
 * - https://www.youtube.com/watch?v=6VVJibU6gPs
 * */

// #1
var recursiveFactorial = function (n) {
  var recur = function (x, y) {
    if (y === n) {
      return x * y;
    } else {
      return recur(x * y, y + 1);
    }
  };

  return recur(1, 1); // Starting point
};

recursiveFactorial(5);

/**
 * #2
 * CPS (continuation passing style)
 * Be mindful on the avaiable variables to be used on closure, to understand it
 */
var CPSFactorial = function (n, cont) {
  if (n < 2) {
    // Ending condition of the continuation
    return cont(n);
  } else {
    var new_cont = function (v) {
      var result = v * n;
      return cont(result); // cont() refers to continuation function of the previous link (access through the closure of this function)
    };
    return CPSFactorial(n - 1, new_cont); // Return continuation function
  }
};

let num = CPSFactorial(5, function (v) {
  // Starting point
  return v;
});
