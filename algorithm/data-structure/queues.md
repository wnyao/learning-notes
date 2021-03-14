# Queues

- queues are first in/first out (FIFO) data structures

### Implementation Example

```python
import queue

MyQueue = queue.Queue(3)
print("Queue empty: ", MyQueue.empty())

MyQueue.put(1)
MyQueue.put(2)
MyQueue.put(3)
print("Queue full: ", MyQueue.full())

print("Popping: ", MyQueue.get())
print("Queue full: ", MyQueue.full())

print("Popping: ", MyQueue.get())
print("Popping: ", MyQueue.get())
print("Queue empty: ", MyQueue.empty())

"""
Queue empty:  True
Queue full:  True
Popping:  1
Queue full:  False
Popping:  2
Popping:  3
Queue empty:  True
"""
```

### Reference

- Algorithms for Dummies by Jogn Paul Mueller & Luca Massaron (Chapter 6: Structuring Data)
