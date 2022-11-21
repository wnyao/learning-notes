const { Transform } = require("stream");
const http = require("http");

const ts = new Transform({
  transform(chunk, _encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

const server = http.createServer(function (req, res) {
  if (req.method === "POST") {
    req.pipe(ts).pipe(res);
  }
});

server.listen(process.argv[2]);

// SOLUTION 2
// ----------
// const http = require('http')
// const through = require('through2')

// const server = http.createServer(function (req, res) {
//   if (req.method === 'POST') {
//     req.pipe(through(function (buf, _, next) {
//       this.push(buf.toString().toUpperCase())
//       next()
//     })).pipe(res)
//   } else res.end('send me a POST\n')
// })

// server.listen(parseInt(process.argv[2]))
