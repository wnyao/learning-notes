## HTML STREAM (Exercise 12 of 17)

Your program will get some html written to stdin. Convert all the inner html to upper-case for elements with a class name of "loud", and pipe all the html to stdout.

You can use trumpet and through2 to solve this adventure.

With trumpet you can create a transform stream from a css selector:

```js
const trumpet = require('trumpet')
const fs = require('fs')
const tr = trumpet()
fs.createReadStream('input.html').pipe(tr)

const stream = tr.select('.beep').createStream()
```

Now stream outputs all the inner html content at '.beep' and the data you write to stream will appear as the new inner html content.

Make sure to npm install trumpet through2 in the directory where your solution file lives.
