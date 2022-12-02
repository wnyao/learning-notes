const fs = require("fs");

const content = fs.readFileSync(process.argv[2]);
const lines = content.toString().split("\n").length - 1;

console.log(lines);
