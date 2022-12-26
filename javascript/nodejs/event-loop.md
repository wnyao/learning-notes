# Event Loop

![event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop/the_javascript_runtime_environment_example.svg)

### Why event loop

- Javascript is a single threaded language
- To support asynchronous, event loop mechanism is created to prevent main thread from executing other code

### The composition of event loop

execution stack and task queue

- **Heap**: A heap is a data structure used to store objects
- **Stack**: Last-in-first-out rule is adopted. When a function is executed, it will be added to the top of the stack. When execution is completed, it will be removed from the top of the stack.
- **Queue**: Also a data structure, characterized by first-in-first-out. In javascript execution environment, the tasks waiting to be processed will be placed in the queue, and when the waiting stack is cleared, the first task will be taken out from the queue.
- **Event Loop**: Will constantly check whether the stack is empty. If empty, it will put the task from queue to stack for execution.

### The steps of event loop

1. All tasks will be executed on the main thread, forming the execution stack.
2. If an asynchronous task is encountered, the execution environment will call the relevant API, wait for the result of this asynchronous task, and then be placed in the task queue.
3. Once all synchronous tasks are completed. The task queue will be read, and the first task queue will be added to the execution stack to run.
4. As long as the execution stack is empty, the task queue will be read and this step will be repeated until all tasks are completed. This process is call event loop.

### Macro task and micro task

- Asynchronous tasks in javascript is divided into macro and micro tasks
- in event loop, only one macrotask is extracted at a time

```js
console.log(1);

setTimeout(function () {
  console.log(2);
}, 0);

Promise.resolve()
  .then(function () {
    console.log(3);
  })
  .then(function () {
    console.log(4);
  })

// 1
// 3
// 4
// 2
```

Common macro task and micro task are:

- Macro tasks: `script (overall code), setTimeout, setInterval, I/O events, postMessage, MessageChannel, setImmediate (Node.js)`
- Micro tasks: `Promise.then, MutationObserver, process.nextTick (Node.js)`

### Reference

- [Summary of the most common Even Loop interview questions](https://www.explainthis.io/zh-hant/interview-guides/javascript/js-event-loop-questions)
- [Please explain the event loop in the browser (Event Loop)](https://www.explainthis.io/zh-hant/interview-guides/javascript/what-is-event-loop)
- [The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)



