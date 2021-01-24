# Basic

## Increment

```
// Case 1:
var i = 0, r = i++;
console.log(i, r); // 1, 0
```

```
// Case 2:
var i = 0, r = ++i;
console.log(i, r); // 1, 1
```

```
// Case 3:
var i = 0, r = (i += 1);
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
