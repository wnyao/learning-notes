const directoryName = process.argv[2];
const filterBy = process.argv[3];

const func = require("./mymodule");

func(directoryName, filterBy, (err, data) => {
  if (err) {
    return console.error(err);
  }

  data.forEach((file) => {
    console.log(file);
  });
});
