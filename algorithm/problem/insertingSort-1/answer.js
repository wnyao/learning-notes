// answer 1 ------------------------------------
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

// answer 2 ------------------------------------
function insertionSort2(n, arr) {
  target = arr[n - 1];
  idx = n - 2;

  while (idx >= 0 && target < arr[idx]) {
    arr[idx + 1] = arr[idx];
    console.log(arr.join(" "));
    idx -= 1;
  }

  arr[idx + 1] = target;
  console.log(arr.join(" "));
}

// answer 3 ------------------------------------
// Note: below solution modify given array instead of create anew

const insert = (array, rightIndex, value) => {
  for (var j = rightIndex; j >= 0 && array[j] > value; j--) {
    array[j + 1] = array[j];
  }

  array[j + 1] = value;
};

const insertionSort = (array) => {
  for (var i = 1; i < array.length; i++) {
    insert(array, i - 1, array[i]);
  }
};

var array = [22, 11, 99, 88, 9, 7, 42];
insertionSort(array);
