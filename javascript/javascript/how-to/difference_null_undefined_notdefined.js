/**
 * Different between null, undefined, and not defined
 * Refer: https://bit.ly/2Y7xpxi
 */

console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"

// undefined ------------------------------------------------

function typeOfA() {
  var a;
  console.log(typeof a, "a"); // "undefined"
}

function typeOfUndefinedInArray() {
  let numArray = [1, 2, , 4];
  console.log(numArray); // [1, 2, empty, 4]

  const type = typeof numArray[2];
  console.log("type: ", type); // "undefined"
}

// not defined ------------------------------------------------
// A not defined is a variable which is not declared at a given point of time with declaration keyword like var, let or const.

function notDefinedA() {
  // NOTE: It is undefined because of variable hoisting
  console.log(a); // undefined
  var a = 5;
}

function notDefinedVar() {
  console.log(b);
  const b = 5;
  // "ReferenceError: b is not defined
}

// null ------------------------------------------------------

function nullArithmetic() {
  // NOTE: Any arithmetic operation with null value will result in integer value
  let a = 7 + null;
  console.log(a); // 7

  let b = 7 * null;
  console.log(b); // 0

  // NOTE: any arithmetic operation with undefined with result in value of variable being changed to NaN
  let c = 8 + undefined;
  console.log(c); //NaN

  let d = 8 * undefined;
  console.log(d); //NaN
}
