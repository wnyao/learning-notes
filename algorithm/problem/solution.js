function reverseCopy(string) {
  let stringArray = [...string];
  let reverseArray = [];

  for (let i = stringArray.length - 1; i >= 0; i--) {
    reverseArray.push(stringArray[i])
  }

  return reverseArray.join("")
}

const result = reverseCopy("hello world");
console.log(`result: `, result); // dlrow olleh
