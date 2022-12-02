const http = require("http");
const url = process.argv[2];

http.get(url, (res) => {
  let dataStr = "";

  res.on("data", (data) => {
    dataStr += data;
  });

  res.on("end", () => {
    console.log(dataStr.length);
    console.log(dataStr);
  });
});

// const http = require('http')
// const bl = require('bl')

// http.get(process.argv[2], function (response) {
//   response.pipe(bl(function (err, data) {
//     if (err) {
//       return console.error(err)
//     }
//     data = data.toString()
//     console.log(data.length)
//     console.log(data)
//   }))
// })
