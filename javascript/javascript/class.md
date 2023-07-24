# Classes

- Template for create objects
- build on prototypes with syntax and semantics unique to class
- can be declare in two ways: class expression and class declaration
- code within the class body is always executed in strict mode

```js
// Declaration
class Rectangle {
  constructor(height, width) {
    ...
  }
}

// Expression: with anonymous name
const Rectangle = class {
  constructor(height, width) {
    ...
  }
}

// Expression: has it own name
const Rectangle = class RectangleClass {
  constructor(height, width) {
    ...
  }
}
```

### Inheritance

- `extends` keyword is used to create class as a child of another constructor
- call `super()` before using `this`, if there is a constructor present in the subclass
- can also use the `super` keyword to call corresponding methods of super class

### Constructor

- special method for creating and initializing an object created with a class
- can only have one special method with the name constructor
- can use `super` keyword to call the constructor of the super class

### Methods

- defined on the prototype of each class instance
- shared with all instances

### Fields

- Class fields is similar to object properties, not variables.
- Can be `public` or `private`. Private field has a special identifier syntax.

```js
class ClassWithPrivateField {
  #privateField;

  constructor() {
    this.#privateField = 42;

    // syntax error to attempt to remove declared properties with delete
    delete this.#privateField; // Syntax error

    // syntax error given it is not declared in the class body
    this.#undeclaredField = 444; // Syntax error
  }
}

const instance = new ClassWithPrivateField();

// syntax error to refer # names outside of class
instance.#privateField === 42; // Syntax error
```

### Static

- `static` keyword defines a public static method or field for a class.
- Statie properties cannot be directly accessed on instances of a class. They're accessed on the class itself.
- Are often utility functions.
- Useful for caches, fixed-configurations, or any other data that don't need to be replicated across instances.
- Static fields without initializers are initialized to undefined.
- Public static fields are not reinitialized on subclasses, but can be accessed via the prototype chain.

```js
class ClassWithStaticField {
  static staticField;
  static staticFieldWitInitializer = "static field";
  
  static greet() {
    console.log('hello world');
  }
}

class SubClassWithStaticField extends ClassWithStaticField {
  static subStaticField = "subclass field"
}

const tb = new ClassWithStaticField();

Object.hasOwn(ClassWithStaticField, "staticField"); // true
ClassWithStaticField.staticField // undefined
ClassWithStaticField.staticFieldWitInitializer // "static field"
SubClassWithStaticField.staticFieldWitInitializer // "static field"
SubClassWithStaticField.subStaticField // "subclass field"
tb.greet(); // tb.greet() is not a function
```

- In the field initializer, this refer to current class
- super refer to the base constructor class

```js
class ClassWithStaticField {
  static baseStaticField = "base static field";
  static anotherBaseStaticField = this.baseStaticField;

  static baseStaticField {
    return "base static method output";
  }
}

class SubClassWithStaticField extends ClassWithStaticField {
  static subStaticField = super.baseStaticField();
}

ClassWithStaticField.anotherBaseStaticField // "base static field"
SubClassWithStaticField.subStaticField // ""
```

### Reference

- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Static](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)
- [Private class features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [Does JavaScript function order matter?](https://www.jsdiaries.com/does-javascript-function-order-matter/#:~:text=The%20JavaScript%20compiler%20will%20process,of%20when%20they%20are%20called.)
