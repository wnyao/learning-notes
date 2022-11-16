# NodeJS

#### 1. What is NodeJS?

- **open-source**, **cross-platform**, **javascript runtime environment** that allow application to run outside of client browser.
- to create server-side application. 
- uses **asynchronous**, **event-driven model**.

#### 2. Why use NodeJS?

- makes building scalable network programs easy
- generally fast
- rarely blocks
- offers unified programming language and data type
- asynchronous
- yield great concurrency

#### 3. How does NodeJS work?

- Request was sent to NodeJS web server for processing, **request can be non-blocking or blocking**.
- NodeJS retrieves the incoming requests and adds those to the Event Queue.
- The events are then passed one-by-one through the Event Loop. It checks the request is simple enough not to require external resources.
- The event loop processes simple requests (non-blocking operations), and return the responses to clients.
- A single thread from the thread pool is assigned to single complex request. Once the task is completed, the response is send to event loop that send it back to client.

#### 4. Why is NodeJS single threaded?

- NodeJS is created explicitly as an experiment for async processing. As doing async processing on single threaded is much more performance and scalable.

#### 5. If NodeJS is single threaded how does it handles concurrency?

- NodeJS **adheres to single threaded event loop model**. The NodeJS processing paradigm is heavily influenced by **JavaScript event based model** and **javascript callback system**.
- The event loop is the processing beating heart of in NodeJS

#### 6. What is callback? 

- Callback function, executed after a given task.

#### 7. What is the advantages of using promises instead of callback?

- Asynchronous logic is more structured and specified.
- Coupling is low
- Improved readability

#### 8. Define I/O

- I/O used to describe program, operation, or device that transfer data to or from one medium to another medium.
- The medium can be physical device, network, or file within a system.

#### 9. What is npm?

- Node package manager
- Responsible for managing all the packages and modules
- Provides access to online repository
- Provides command-line utility

#### 10. What are modules in NodeJS?

- JavaScript library which can be used in NodeJS application

#### 11. What are pros and cons of NodeJS?

**Pros**
- Fast processing and uses event-based model
- Best suited for streamline huge amounts of data and I/O intensive operations

**Cons**
- Not suited for heavy computational tasks, due to single treaded model

#### 12. What does event-driven programming mean?

- Uses events to trigger various functions.
- Callback function if any will be registered and executed whenever an event is triggered.

#### 13. What is event loop in NodeJS?

- Uses to handle asynchronous callback in NodeJS
- Foundation of non blocking input/output in NodeJS

#### 14. Difference between `nextTick` vs `setImmediate`?

- `nextTick` postpones the execution of action until the next pass around event loop.
- `setImmediate` executes a callback on the next cycle of the event loop.

#### 15. What is EventEmitter in NodeJS?

- EventEmitter is a class that holds all the objects that can emit event
- Whenever an object from the EventEmitter class throws an error, all attached functions are called upon synchronously.

#### 16. Two types of function in NodeJS?

- Asynchronous, non-blocking function
- Synchronous, blocking function

#### 17. What is package.json file?

- holds the metadata of a particular object.

#### 18. What is ExpressJS?

- web application framework that provide wide range of features to develop web application.

#### 19. What is stream in NodeJS?

- objects that enable you to read or write data continuously
- four types of stream: readable, writable, duplex, transform

#### 20. How do you create simple server in NodeJS?

```js
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world');
}).listen(8080, '127.0.0.1')
```

#### 20. What is REPL in NodeJS?

- stands for **Read Eval Print Loop**
- represented computer environment

```js
Read - read user's input, parse input to data structure and store in memory
Eval - Takes and evaluate data structure
Print - Print the result
Loop - Loops the above command until ctrl-c pressed twice
```

#### 21. What is control flow function?

- a piece of code that runs in between several asynchronous function calls

#### 22. How does control flow manage function calls?

- control the order of execution
- collect data
- limit concurrency
- call next step in a program

#### 23. What is the difference between `fork` and `spawn` methods?

**fork**
- a particular case of spawn that generates new instance of v8 engine
- multiple workers run on a single node code base for multiple tasks

**spawn**
- launches a new process with the available set of command
- doesn't generate new instance of v8 engine, only single copy of node module  is active on the processor

#### 24. What is buffer class in NodeJS?

- Buffer class stores raw data similar to array of integers but correspond to a raw memory allocation outside of v8 heap
- Buffer class is used because javascript is not compatible with binary data

#### 25. What is piping in NodeJS?

- Piping is a mechanism used to connect the output of one stream to another stream.
- usually retrieve data from one stream to another stream

#### 26. What are some flags used in the read/write operations in files?

```js
r - Open file for reading, exception if file not exist.
r+ - Open file for reading and writing, exception if file not exist.
w - Open file for writing, file is created if not exist.
w+ - Open file for reading and writing, file is created if not exist.
a - Open file for appending.
a+ - Open file for reading and appending, file is created if not exist.
```

#### 27. Explain the concept of middleware in NodeJS?

- Middleware is a function that receives request and response object
- Tasks performed by middleware function includes: execute code, udpate req or res object, invoke middleware stack, finish request-response cycle.

#### 30. How would you connect to mongoDB?

```js
const mongoClient = require('mongodb').MongoClient;

mongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log('Database connected');
  db.close();
});
```

#### 31. What is `NODE_ENV`?

- node environment variables in express server

#### 32. What are the various NodeJS timing features?

```js
setTimeout/clearTimeout - scheduled code execution after designated amount of milliseconds.
setInterval/clearInterval - execute block of code multiple times after designated amount of milliseconds.
setImmediate/clearImmediate - execute code at the end of current event loop cycle.
```

#### 32. What is WASI, and why is it being introduced?

- WASI class implements WASI system called API and extra convenience methods for interacting with WASI-based applications. 
- Every WASI instance represents a unique sandbox environment.

### Reference

- [Top 50+ Node.js Interview Questions and Answers for 2023](https://www.simplilearn.com/tutorials/nodejs-tutorial/nodejs-interview-questions)
