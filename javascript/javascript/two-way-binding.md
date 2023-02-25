# Two Way Binding

```js
let obj = {};
let input = document.getElementsByTagName("input")[0];
let span = document.getElementsByTagName("span")[0];

Object.defineProperty(obj, "prop", {
  get: function () {
    return this.value;
  },
  set: function (value) {
    this.value = value;
  },
});

input.addEventListener("input", (evt) => {
  obj.prop = evt.target.value;
  span.innerText = obj.prop;
});
```

### Reference

- [Two-way data binding in Vanilla JavaScript without Angular or React](https://medium.com/developers-arena/two-way-data-binding-in-vanilla-javascript-without-angular-or-react-223ddbb1252d)

