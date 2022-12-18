## Increment

```
// Case 1:
let i = 0
let r = i++;
console.log(i, r); // 1, 0
```

```
// Case 2:
let i = 0
let r = ++i;
console.log(i, r); // 1, 1
```

```
// Case 3:
let i = 0
let r = (i += 1);
console.log(i, r); // 1, 1
```

## Increment within for loop

```
for (var i = 0; i < 4; i++) {
  console.log("i: ", i); // 0, 1, 2, 3
}

for (var i = 0; i < 4; ++i) {
  console.log("i: ", i); // 0, 1, 2, 3
}
```
