# Dictionaries

- must define key and value pair.
- can quickly provide access to specific data items using the key.
- key must be unique, else first entry replaces by the second duplicated key
- key is be immutable

### Implementation Example

```python
Colors = {"Sam": "Blue", "Amy": "Red", "Sarah": "Yellow"}

print(Colors["Sarah"])
print(Colors.keys())

for Item in Colors.keys():
    print("{0} likes the color {1}.".format(Item, Colors[Item]))

Colors["Sarah"] = "Purple"
Colors.update({"Harry": "Orange"})
del Colors["Sam"]

print(Colors)

"""
--- Output ---
Yellow
dict_keys(['Sarah', 'Amy', 'Sam'])
Sarah likes the color Yellow.
Amy likes the color Red.
 Sam likes the color Blue.
{'Harry': 'Orange', 'Sarah': 'Purple', 'Amy': 'Red'}
"""
```

### Reference

- Algorithms for Dummies by Jogn Paul Mueller & Luca Massaron (Chapter 6: Structuring Data)
