# Function vs Class object

## Function object

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

- In function object, this keyword depends dynamically on the invocation

## Class object

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

- Classes are always strict mode code. 
- Because of strict mode, calling methods with an undefined this will throw an error.
