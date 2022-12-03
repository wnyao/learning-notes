const http = require("http");
const async = require("async");
const urls = process.argv.slice(2);

async.map(
  urls,
  (url, done) => {
    let result = "";

    http.get(url, (res) => {
      res.on("data", (chunk) => (result += chunk.toString()));
      res.on("end", () => done(null, result));
    });
  },
  (err, results) => {
    if (err) console.error(err);
    console.log(results);
  }
);
