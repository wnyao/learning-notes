const { Writable } = require("stream");

const writeStream = new Writable({
  write(chunk, _encoding, callback) {
    if (chunk) {
      console.log("writing:", chunk.toString());
      callback();
    } else {
      callback(null);
    }
  },
});

process.stdin.pipe(writeStream);
