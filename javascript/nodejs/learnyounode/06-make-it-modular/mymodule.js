const fs = require("fs");

module.exports = (directoryName, extension, callback) => {
  fs.readdir(directoryName, (err, files) => {
    if (err) {
      return callback(err);
    }

    const filteredFiles = files.filter((file) =>
      file.includes(`.${extension}`)
    );

    callback(null, filteredFiles);
  });
};
