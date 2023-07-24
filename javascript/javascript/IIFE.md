# IIFE

- Immediately invoked function expression or self executing anonymous function
- JS function that runs as soon as it is defined
- Prevent accessing variables within the IIFE idiom
- Prevent polluting the global scope

```js
(function() {
  console.log('Hello world!');
})();

(async () => {
  console.log('Hello world!');
})();
```

- Can create private and public variables

```js
const makeWithdraw = (balance) =>
  ((copyBalance) => {
    let balance = copyBalance; // This variable is private

    const doBadThings = () => {
      console.log("I will do bad things with your money");
    };

    doBadThings();

    return {
      withdraw(amount) {
        if (balance >= amount) {
          balance -= amount;
          return balance;
        }

        return "Insufficient money";
      },
    };
  })(balance);
```

### Reference

- [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
