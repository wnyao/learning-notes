// Get http module from  node global scope
let http = require("http");

// Serve multiple requests from client
let server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World!!");
    res.end();
  }

  // Serve response based on the url location
  if (req.url === "/app/this") {
    res.write(__dirname);
    res.end();
  }
});

server.listen(3000); // Access using localhost:3000

/**
 * Note: framework such as Express.js can be used for web application to efficiently handle these action,
 * as handling requests using above way is not recommended.
 * Src: https://www.youtube.com/watch?v=TlB_eWDSMt4
 */
