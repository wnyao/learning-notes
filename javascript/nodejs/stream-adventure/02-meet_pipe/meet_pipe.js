const fs = require("fs");

const readStream = fs.createReadStream(process.argv[2]);

readStream.pipe(process.stdout);
