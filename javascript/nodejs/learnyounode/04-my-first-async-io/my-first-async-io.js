const fs = require("fs");

fs.readFile(process.argv[2], (err, buf) => {
  if (err) {
    throw new Error(err);
  }

  const lines = buf.toString().split("\n").length - 1;
  console.log(lines);
});
