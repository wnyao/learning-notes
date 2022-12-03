const http = require("http");
const async = require("async");
const url = process.argv[2];

async.reduce(
  ["one", "two", "three"],
  0,
  (acc, item, callback) => {
    let result = acc;

    http
      .get(`${url}?number=${item}`, (res) => {
        res.on("data", (chunk) => (result += Number(chunk)));
        res.on("end", () => callback(null, result));
      })
      .on("error", (err) => console.error(err));
  },
  (err, data) => {
    if (err) console.error(err);
    console.log(data);
  }
);

// var http = require('http')
//   , async = require('async');

// async.reduce(['one', 'two', 'three'], 0, function(memo, item, done){
//   var body = '';

//   http.get(process.argv[2] + "?number=" + item, function(res){
//     res.on('data', function(chunk){
//       body += chunk.toString();
//     });

//     res.on('end', function(){
//       done(null, memo + Number(body));
//     });
//   }).on('error', done);

// }, function done(err, result){
//   if (err) return console.log(err);
//   console.log(result);
// });
