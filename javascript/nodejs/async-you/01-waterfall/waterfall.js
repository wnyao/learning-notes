const fs = require("fs");
const http = require("http");
const async = require("async");
const filePath = process.argv[2];

async.waterfall(
  [
    function (done) {
      fs.readFile(filePath, (err, data) => {
        if (err) throw console.error(err);
        done(null, data);
      });
    },
    function (data, done) {
      let result = "";

      http.get(data.toString().trim(), (res) => {
        res.on("data", (chunk) => (result += chunk.toString()));
        res.on("end", () => done(null, result));
        res.on("error", (err) => done(err));
      });
    },
  ],
  (err, data) => {
    if (err) console.error(err);
    console.log(data);
  }
);
