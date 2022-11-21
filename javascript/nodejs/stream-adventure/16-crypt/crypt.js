const crypto = require("crypto");
const stream = crypto.createDecipheriv(
  "aes256",
  process.argv[2],
  process.argv[3]
);

process.stdin.pipe(stream).pipe(process.stdout);
