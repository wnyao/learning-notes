const http = require("http");
const urls = process.argv.slice(2);

const getData = (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let results = "";
      response.on("data", (data) => (results += data));
      response.on("end", () => resolve(results));
      response.on("error", () => reject(results));
    });
  });
};

(async () => {
  for (let i = 0; i < urls.length; i++) {
    const data = await getData(urls[i]);
    console.log(data);
  }
})();

// const http = require('http')
// const bl = require('bl')
// const results = []
// let count = 0

// function printResults () {
//   for (let i = 0; i < 3; i++) {
//     console.log(results[i])
//   }
// }

// function httpGet (index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err) {
//         return console.error(err)
//       }

//       results[index] = data.toString()
//       count++

//       if (count === 3) {
//         printResults()
//       }
//     }))
//   })
// }

// for (let i = 0; i < 3; i++) {
//   httpGet(i)
// }
