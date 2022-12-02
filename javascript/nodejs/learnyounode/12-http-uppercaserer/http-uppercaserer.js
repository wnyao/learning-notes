const http = require("http");
const port = process.argv[2];

const { Transform } = require("stream");

const transformStream = new Transform({
  transform(chunk, _encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    res.writeHead(200, { "content-type": "text/plain" });
    req.pipe(transformStream).pipe(res);
  }
});

server.listen(port);

// const http = require('http')
// const map = require('through2-map')

// const server = http.createServer(function (req, res) {
//   if (req.method !== 'POST') {
//     return res.end('send me a POST\n')
//   }

//   req.pipe(map(function (chunk) {
//     return chunk.toString().toUpperCase()
//   })).pipe(res)
// })

// server.listen(Number(process.argv[2]))
