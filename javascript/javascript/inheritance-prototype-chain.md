# Inheritance & Prototype Chain

- Javascript uses The Prototypical Inheritance Model
- JavaScript only has one construct: object
- Each object has a private property which holds a link to another object called its prototype
- In JS, an object can inherit properties of another object, allow sharing of method and reduce duplication
- Member of the prototype is mutable
- The prototype of an object is a way to store common attributes across all instances of a class, but in way that is overwritable.

To inherit prototype in function object

```js
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function () {
  return this.name;
}

function Bar(name, label) {
  // IMPORTANT without this a.myName() will be undefined
  Foo.call(this, name);
  this.label = label;
}

// inherit Foo prototype
Bar.prototype = Object.create(Foo.prototype);

// to assign Bar constructor, given constructor is replaced to Foo when Object.create
Bar.prototype.constructor = Bar;

 // has to be after reassigning constructor
Bar.prototype.myLabel = function () {
  return this.label;
}

var a = new Bar("a", "obj a");

a.myName(); // "a"
a.myLabel(); // "obj a"
```

### The prototype chain

- The prototype object has prototype of its own, and so on until it is reached with null as its prototype
- null has no prototype, and act as link in this prototype chain
- When object searches for property, if it does not find it in itself, it will search for its own prototype, the prototype of prototype and so on.

### Function object

- In function object, `this` keyword depends dynamically on the invocation

```js
function greeting() {
  this.name = "Jessie";
}

greeting.prototype.greet = function () {
  console.log("Hello", this.name);
};

const greetObj = new greeting();
greetObj.greet(); // Hello Jessie
```

### Class object

- Class is represented using prototypical inheritance model
- JS doesn't support classes like any other language
- Class keyword is a syntactic sugar that facilitate the way to organize code
- Classes are always strict mode code. 
- Because of strict mode, calling methods with an undefined `this` will throw an error.

```js
class greeting {
  name = 'Jessie'

  greet(){
    console.log('Hello', this.name);
  }

  logThat() {
    function logThis() {
      console.log(this); // undefined
    }

    logThis()
  }
}

const greetObj = new greeting()
greetObj.greet() // Hello Jessie
```

### Reference

- [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Understanding the JavaScript Prototype Chain & Inheritance](https://blog.risingstack.com/,javascript-prototype-chain-inheritance,/)
- [JavaScript Prototypes and Inheritance – and Why They Say Everything in JS is an Object](https://www.freecodecamp.org/news/,prototypes-and-inheritance-in-javascript,/)
