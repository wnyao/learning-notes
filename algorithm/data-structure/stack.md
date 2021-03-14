# Stack

- Stack provides last in/first out (LIFO) data storage.

### Implementation Example

```python
MyStack = []
StackSize = 3

def DisplayStack():
    print("Stack currently contains:")
    for Item in MyStack:
        print(Item)

def Push(Value):
    if len(MyStack) < StackSize:
        MyStack.append(Value)
    else:
        print("Stack id full!")

def Pop():
    if len(MyStack) > 0:
        print("Popping: ", MyStack.pop())
    else:
        print("Stack is empty.")

Push(1)
Push(2)
Push(3)
DisplayStack()

Push(4)

Pop()
DisplayStack()

Pop()
Pop()
Pop()

"""
--- Output ---
Stack currently contains:
1
2
3
Stack is full!
Popping: 3
Stack currently contains:
1
2
Popping: 2
Popping: 1
Stack is empty.
"""

```

### Reference

- Algorithms for Dummies by Jogn Paul Mueller & Luca Massaron (Chapter 6: Structuring Data)
