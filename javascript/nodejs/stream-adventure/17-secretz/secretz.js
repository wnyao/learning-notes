const concat = require("concat-stream");
const crypto = require("crypto");
const tar = require("tar");

const parser = new tar.Parse();

// on each entry
parser.on("entry", function (e) {
  if (e.type !== "File") return e.resume(); // check for e.type is File; e is a stream

  const hash = crypto.createHash("md5", { encoding: "hex" });

  e.pipe(hash).pipe(
    concat(function (hash) {
      console.log(`${hash} ${e.path}`);
    })
  );
});

const decipher = crypto.createDecipheriv(
  process.argv[2],
  process.argv[3],
  process.argv[4]
);

process.stdin.pipe(decipher).pipe(parser);
