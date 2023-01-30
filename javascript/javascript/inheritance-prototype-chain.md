# Inheritance & Prototype Chain

- Javascript uses The Prototypical Inheritance Modal
- JavaScript only has one construct: object
- Each object has a private property which holds a link to another object called its prototype
- In JS, an object can inherit properties of another object, allow sharing of method and reduce duplication
- Member of the prototype is mutable
- The prototype of an object is a way to store common attributes across all instances of a class, but in way that is overwritable.

```js
function MyClass(props) {
  this.a = props.a
  this.b = props.b
}

MyClass.prototype.getProperties = function() {
  console.log(this)
}

const myClass = new MyClass({ a: 'hello', b: 'world' });
```

### The prototype chain

- The prototype object has prototype of its own, and so on until it is reached with null as its prototype
- null has no prototype, and act as link in this prototype chain

### Function object

- In function object, this keyword depends dynamically on the invocation

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
- Because of strict mode, calling methods with an undefined this will throw an error.

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
- [Understanding the JavaScript Prototype Chain & Inheritance](https://blog.risingstack.com/javascript-prototype-chain-inheritance/)
- [JavaScript Prototypes and Inheritance – and Why They Say Everything in JS is an Object](https://www.freecodecamp.org/news/prototypes-and-inheritance-in-javascript/)
