const async = require("async");
const http = require("http");

async.series(
  {
    requestOne: function (done) {
      let body = "";

      http.get(process.argv[2], (res) => {
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => done(null, body));
      });
    },

    requestTwo: function (done) {
      let body = "";

      http.get(process.argv[3], (res) => {
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => done(null, body));
      });
    },
  },
  (err, result) => {
    if (err) return console.error(err);
    console.log(result);
  }
);
