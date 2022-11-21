// SOLUTION 1
// ----------
const { Transform } = require("stream");
const trumpet = require("trumpet");
const tr = trumpet();

const loud = tr.select(".loud").createStream();

const transformStream = new Transform({
  transform(chunk, _encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

loud.pipe(transformStream).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);

// SOLUTION 2
// ----------
// const trumpet = require('trumpet')
// const through = require('through2')
// const tr = trumpet()

// const loud = tr.select('.loud').createStream()
// loud.pipe(through(function (buf, _, next) {
//   this.push(buf.toString().toUpperCase())
//   next()
// })).pipe(loud)

// process.stdin.pipe(tr).pipe(process.stdout)
