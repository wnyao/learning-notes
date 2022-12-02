const fs = require("fs");
const http = require("http");
const port = process.argv[2];
const file = process.argv[3];

const server = http.createServer((_req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  fs.createReadStream(file).pipe(res);
});

server.listen(port);
