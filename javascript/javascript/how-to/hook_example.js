/**
 * Example of a simple javascript hook system
 *
 * From:
 * http://www.velvetcache.org/2010/08/19/a-simple-javascript-hooks-system
 *
 * Description:
 * Hook is described as essentially a place in code that allows you to tap in to
 * a module to either provide different behavior or to react when something happens.
 *
 * Read More:
 * https://en.wikipedia.org/wiki/Hooking
 *
 * Note to self:
 * I haven't went on to research more regarding a good usage of such hook system.
 * Thus, research on better usage of such hook system will be required. You may want
 * to try asking question (What is the case scenario in using such hook) in Stach Overflow
 *
 */

var Hook = {
  hooks: {},

  register: function (name, callback) {
    if (!Hook.hooks[name]) Hook.hooks[name] = [];
    Hook.hooks[name].push(callback);
  },

  call: function (name, arguments) {
    if (!Hook.hooks[name]) return;

    // Loop throught registered callbacks with arguments
    for (i = 0; i < Hook.hooks[name].length; ++i) {
      if (true != Hook.hooks[name][i](arguments)) {
        break;
      }
    }
  },
};

function test() {
  // Set up the hooks
  Hook.register("one", function () {
    console.log("One");
    return true;
  });

  Hook.register("one", function () {
    console.log("Two");
    return true;
  });

  Hook.register("one", function () {
    console.log(args[0]);
    args[0] = "Six";
    return true;
  });

  Hook.register("one", function () {
    console.log("Four");
    return false;
  });

  Hook.register("one", function () {
    console.log("Five");
    return true;
  });

  // Set up the arguments
  arguments = ["Three"];

  // Call the hooks
  Hook.call("one", arguments);

  // Prove the arguments were changed
  console.log(arguments[0]);
}

test();
