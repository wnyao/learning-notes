function insertionSort2(n, arr) {
  for (let i = 1; i < n; i++) {
    let previous = arr[i - 1];
    let current = arr[i];

    while (previous > current) {
      // swap places (execution order is important)
      arr[arr.indexOf(current)] = previous;
      arr[arr.indexOf(previous)] = current;

      // handle index previous go beyond index 0
      if (arr.indexOf(current) - 1 < 0) break;

      // switch [previous, current] 1 place backward
      previous = arr[arr.indexOf(current) - 1];
      current = arr[arr.indexOf(current)];
    }

    console.log(arr.join(" "));
  }
}
