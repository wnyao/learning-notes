const filePath = process.argv[2];
const filterByExtension = process.argv[3];

const fs = require("fs");

fs.readdir(filePath, (err, files) => {
  if (err) {
    throw new Error(err);
  }

  files.forEach((file) => {
    if (filterByExtension && file.includes(`.${filterByExtension}`)) {
      console.log(file);
    }
  });
});
