# Map vs Object

### Object

Similar to `Map`, object let you:

- set keys to value
- retrieve those values
- delete keys
- detect whether something is store as key

### Map

- holds key-value pairs
- remembers the original insertion of the keys
- iterate its elements in insertion order

## Differences

**Key Collision**
  - **Map**: doesn't contain any keys by default; contains only what is explicitly put into it.
  - **Object**: has prototype; contains default keys that could collide with newly inserted keys.

**Key Types**
  - **Map**: key can be any value (including function, objects or any primitive).
  - **Object**: keys of an Object must be either a String or a Symbol.

**Key Order**
  - **Map**: ordered in straight forward way.
  - **Object**: ordered but not always the case, is complex. Best not rely on property order.

**Size**
  - **Map**: can be retrieved from `size` property.
  - **Object**: must be determine manually.

**Iteration**
  - **Map**: iterable
  - **Object**: doesn't implement an iteration protocol, not directly iterable using `for...of`.

**Performance**
  - **Map**: better in scenario involving frequent additions and removals of key-value pairs.
  - **Object**: Not optimized

**Serialization and parsing**
  - **Map**: No native support
  - **Object**: Native support from Object to JSON

## Usage

Object
```js
// general example
let obj = {
  foo: "bar",
  zee: "zap"
};

obj["hello"] = "world";
delete obj.foo;

// You can spread an array to object which will indexed array values in number order
const indexedObj = { ...[1, 2, 3, 4] };
console.log(indexedObj); // { 0: 1, 1: 2, 2: 3, 3: 4 }

// This changes the original object, given y is referred to x unless clone as new object
const x = { a: 20, b: 22 };
const y = x;
y.a = 30;
delete y.b;
console.log(x.a, x.b); // 30, undefined
```

Map
```js
let contacts = new Map()
contacts.set('Jessie', {phone: "213-555-1234", address: "123 N 1st Ave"})
contacts.has('Jessie') // true
contacts.get('Hilary') // undefined
contacts.set('Hilary', {phone: "617-555-4321", address: "321 S 2nd St"})
contacts.get('Jessie') // {phone: "213-555-1234", address: "123 N 1st Ave"}
contacts.delete('Raymond') // false
contacts.delete('Jessie') // true
console.log(contacts.size) // 1
```

### Reference

- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Map vs Object](https://www.explainthis.io/zh-hant/interview-guides/javascript/map-vs-object)
- [Convert an Object to a Map in JavaScript](https://bobbyhadz.com/blog/javascript-convert-object-to-map#:~:text=To%20convert%20an%20object%20to,entries(obj))%20.)
