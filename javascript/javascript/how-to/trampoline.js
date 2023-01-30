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

// #1 - Thunk and Trampoline

// Thunk
var thunk = function (f, lst) {
  return { tag: "thunk", func: f, args: lst };
};

// Thunk
var thunkValue = function (x) {
  return { tag: "value", val: x };
};

var thunkFactorial = function (n, cont) {
  if (n < 2) {
    return thunk(cont, [n]);
  } else {
    var new_cont = function (v) {
      var result = v * n;
      return thunk(cont, [result]); // Return continuation function
    };
    return thunk(thunkFactorial, [n - 1, new_cont]); // Return continuation function
  }
};

// Trampoline method that execute task according to return value
var trampoline = function (thk) {
  while (true) {
    if (thk.tag === "value") {
      return thk.val;
    }
    if (thk.tag === "thunk") {
      thk = thk.func.apply(null, thk.args);
    }
  }
};

// Calling stack
trampoline(thunkFactorial(5, thunkValue));

// #2 - Trampoline example by Kyle Simpson
var sumTrampolined = trampoline(function f(sum, num, ...nums) {
  sum += num;
  if (nums.length === 0) {
    // Baseline / ending condition for the trampoline util
    return sum;
  } else {
    return function () {
      // Continuation function
      return f(sum, ...nums); // definition of these parameters help in decrementing the length of passing arraylist
    };
  }
});

// Trampoline method
function trampoline(fn) {
  return function trampolined(...args) {
    var result = fn(...args);

    while (typeof result == "function") {
      // Keep looping if result is continuation function
      result = result();
    }

    return result; // This line is call when result equal total sum; jumping off the trampoline
  };
}

sumTrampolined(3, 4, 5, 6, 7, 8, 9); // Calling

