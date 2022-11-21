const combine = require("stream-combiner");
const through = require("through2");
const split2 = require("split2");
const zlib = require("zlib");

module.exports = function () {
  let current;

  function write(line, _, next) {
    if (line.length === 0) return next();
    const row = JSON.parse(line); // parse buffer

    if (row.type === "genre") {
      // if at second group of genre, push group to writable stream
      if (current) {
        this.push(JSON.stringify(current) + "\n");
      }

      // assign new group to current
      current = { name: row.name, books: [] };
    }

    // append book to group
    if (row.type === "book") {
      current.books.push(row.name);
    }

    next();
  }

  function end(next) {
    if (current) {
      this.push(JSON.stringify(current) + "\n");
    }

    next();
  }

  const grouper = through(write, end);
  return combine(split2(), grouper, zlib.createGzip());
};
