const http = require("http");
const async = require("async");
const urls = process.argv.slice(2);

async.each(
  urls,
  (url, done) => {
    http.get(url, (res) => {
      res.on("data", () => {});
      res.on("end", () => done(null));
    });
  },
  (err, data) => {
    if (err) console.log(err);
    console.log(data);
  }
);
