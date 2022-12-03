const http = require("http");
const async = require("async");
const url = process.argv[2];

let result = "";
let count = 0;

async.whilst(
  function (callback) {
    callback(null, !result.includes("meerkat"));
  },
  function (callback) {
    count++;

    http.get(url, (res) => {
      res.on("data", (chunk) => (result = chunk.toString()));
      res.on("end", () => callback(null, count));
    });
  },
  function (err, data) {
    if (err) console.error(err);
    console.log(data);
  }
);
