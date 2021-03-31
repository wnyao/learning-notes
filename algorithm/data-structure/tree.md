# Tree

- Tree helps you organize data quickly and find it in a shorter time than using other data-storage techniques.
- Tree has just one root node.
- Root node connect to branches or leaves (leaf node)
- can be built top down or bottom up

### Implementation Example

- python doesn't come with a built-in tree object
- use of following simple tree requires that not store anthing other than a reference to another node.

```python
class binaryTree:
    def __init__(self, nodeData, left=None, right=None):
        self.nodeData = nodeData
        self.left = left
        self.right = right

    def __str__(self):
        return str(self.nodeData)

tree = binaryTree("Root")
BranchA = binaryTree("Branch A")
BranchB = binaryTree("Branch B")
tree.left = BranchA
tree.right = BranchB

LeafC = binaryTree("Leaf C")
LeafD = binaryTree("Leaf D")
LeafE = binaryTree("Leaf E")
LeafF = binaryTree("Leaf F")
BranchA.left = LeafC
BranchA.right = LeafD
BranchB.left = LeafE
BranchB.right = LeafF
```

### Traverse

Traversing the tree means checking the links and verifyin that they actually connect as thought out.

```python
def traverse(tree):
    if tree.left != None:
        traverse(tree.left)
    if tree.right != None:
        traverse(tree.right)

    print(tree.nodeData)

traverse(tree)

"""
---Output---
Leaf C
Leaf D
Branch A
Leaf E
Leaf F
Branch B
Root
"""
```

### Reference

- Algorithms for Dummies by Jogn Paul Mueller & Luca Massaron (Chapter 6: Structuring Data)
