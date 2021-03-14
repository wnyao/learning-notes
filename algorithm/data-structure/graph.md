# Graph

- Graph is a sort of tree extension
- Can have more than one or two connections. Graph nodes often have a multitude of connections.
- Graph can include the concept of directionality.
- Unlike a tree, which has parent/child relationships, A graph node can connect to any other node with a specific direction in mind.

### Implementation Details

- Most developers use dictionaries (sometimes lists) to build graphs.
- Dictionary makes building graph easy because key is the node name and values are the connections for that node.

```python
graph = {
    'A': ['B', 'F'],
    'B': ['A', 'C'],
    'C': ['B', 'D'],
    'D': ['C', 'E'],
    'E': ['D', 'F'],
    'F': ['E', 'A']
}
```

### Traverse

Below example find on ly a path. It begins by building the path node by node. As with all recursive routines, this one requires exit strategy, which is that when the start value matches the end value, the path ends.

Because each node in the graph can connect to multiple nodes, you need a for loop to check each of the potential connections. When the node in question already appears in the path, the code skips it. Otherwise, the code tracks the current path and recursively calls `find_path` to locate the next node in the path

```python
def find_path(graph, start, end, path=[]):
    path = path + [start]

    if start == end:
        print("Ending")
        return path

    for node in graph[start]:
        print("Checking Node ", node)

        if node not in path:
            print("Path so far ", path)

            newp = find_path(graph, node, end, path)
            if newp:
                return newp f

find_path(graph, 'B', 'E')

"""
---Output---
Checking Node A
Path so far ['B']
Checking Node B
Checking Node F
Path so far ['B', 'A']
Checking Node E
Path so far ['B', 'A', 'F']
Ending
['B', 'A', 'F', 'E']
"""
```

### Reference

- Algorithms for Dummies by Jogn Paul Mueller & Luca Massaron (Chapter 6: Structuring Data)
