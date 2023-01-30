/**
 * NOTE
 * ----
 * Beware of using 'this' keyword
 * there is no 'this' in arrow function
 * 'this' may refer to global object or object of the calling function, dependingly
 * 'let' within class object can be used for abstraction, similar to 'private' keyword used in java
 * getter/setter can be defined using Object.defineProperty
 * be mindful on what variable can be access within scope and closure
 */

// Class object
function Stopwatch() {
  let startTime = null;
  let stopTime = null;
  let duration = 0;
  let hasEnabled = false;

  this.start = function () {
    if (hasEnabled == true) {
      throw new Error("Stopwatch has started");
    } else {
      hasEnabled = true;
      startTime = new Date().getTime(); // Note: new instance of Date to get the current time in ms
    }
  };

  this.stop = function () {
    if (hasEnabled == false) {
      throw new Error("Stopwatch has stopped");
    } else {
      hasEnabled = false;
      stopTime = new Date().getTime();
      calculateDuration();
    }
  };

  // Calculate duration property
  let calculateDuration = function () {
    if (startTime && stopTime) {
      duration = (stopTime - startTime) / 1000;
      return;
    }

    if (!stopTime) {
      stopTime = new Date().getTime();
      duration = (stopTime - startTime) / 1000;
    }
  };

  // Getter definition (can be use for setter as well)
  Object.defineProperty(this, "duration", {
    get: function () {
      calculateDuration();
      return duration;
    },
  });
}

console.log("Hello-World!");
const stopwatch = new Stopwatch();
