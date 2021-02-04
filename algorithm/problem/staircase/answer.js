function staircase(n) {
  for (let i = 1; i <= n; i++) {
    const spaces = new Array(n - i).fill(" ").join("");
    const hashes = new Array(i).fill("#").join("");
    console.log(spaces + hashes);
  }
}
