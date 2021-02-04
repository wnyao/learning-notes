function insertionSort1(n, arr) {
  let finish = false;
  const lastValue = arr[n - 1];
  const subArray = arr.slice(0, n - 1);

  for (let i = subArray.length - 1; i >= -1; i--) {
    // handle index 0 comparison
    if (i < 0 || subArray[i] < lastValue) {
      subArray.splice(i + 1, 1, lastValue);
      finish = true;
    } else {
      subArray.splice(i + 1, 1, subArray[i]);
    }

    console.log(subArray.join(" "));
    if (finish) break;
  }
}
