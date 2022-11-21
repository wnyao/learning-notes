const { Readable } = require("stream");

const readableStream = new Readable();
readableStream._read = () => {};
readableStream.push(process.argv[2]);
readableStream.pipe(process.stdout);
