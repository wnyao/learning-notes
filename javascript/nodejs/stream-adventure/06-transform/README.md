## TRANSFORM (Exercise 6 of 17)

Convert data from `process.stdin` to upper-case data on `process.stdout` using the through2 module.

To get the through2 module you'll need to do:

```js
$ npm install through2
```

A transform stream takes input data and applies an operation to the datato produce the output data.
 
Create a through stream with a write and end function:

```js
const through = require('through2')
const stream = through(write, end)
```

The write function is called for every buffer of available input:

```js
function write (buffer, encoding, next) {
 // ...
}
```

and the end function is called when there is no more data:

```js
function end () {
   // ...
}
```

Inside the write function, call `this.push()` to produce output data and call `next()` when you're ready to receive the next chunk:

```js
function write (buffer, encoding, next) {
 this.push('I got some data: ' + buffer + '\n')
 next()
}
```

and call done() to finish the output:

```js
function end (done) {
 done()
}
```

write and end are both optional.

If write is not specified, the default implementation passes the input data to the output unmodified.

If end is not specified, the default implementation calls this.push(null) to close the output side when the input side ends.
 
Make sure to pipe process.stdin into your transform stream and pipe your transform stream into `process.stdout`, like this:

```js
process.stdin.pipe(stream).pipe(process.stdout)
```

To convert a buffer to a string, call buffer.toString().
