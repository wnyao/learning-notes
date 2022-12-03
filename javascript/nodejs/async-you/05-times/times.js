const http = require("http");
const async = require("async");

const hostname = process.argv[2];
const port = process.argv[3];

async.series(
  [
    ...[...new Array(5).keys()].map((index) => {
      return function (done) {
        const opt = {
          hostname,
          port,
          path: "/users/create",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const req = http
          .request(opt, (res) => {
            res.on("data", () => console.log(chunk));
            res.on("end", () => done());
          })
          .on("error", (err) => console.error(err));

        req.write(JSON.stringify({ user_id: index + 1 }));
        req.end();
      };
    }),
    function (done) {
      const opt = {
        hostname,
        port,
        path: "/users",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const req = http
        .request(opt, (res) => {
          let body = "";
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => done(null, body));
        })
        .on("error", (err) => console.error(err));

      req.end();
    },
  ],
  (err, result) => {
    if (err) return console.error(err);
    console.log(result[5]);
  }
);
