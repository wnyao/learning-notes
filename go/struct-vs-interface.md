# Struct

- struct is a type which contains named fields.

```go
type Circle struct {
  x float64
  y float64
  r float64
}

// we can create instance of circle type
// c will be default to 0; 0 for int, 0.0 for float, "" for string
var c Circle 

// we can also use new function
// This allocates memory for all the fields, sets each of them to their zero value and returns a pointer *Circle
c := new(Circle)

// or specify each field
c := Circle{
  x: 0,
  y: 0,
  r: 0,
}
```

# Interface

- similar to struct, instead of containing named fields it contains "method set".

```go
type Shape interface {
  area() float64
}
```

- interface can also be used as fields

```go
type MultiShape struct {
  shapes []Shape
}

func (m *MultiShape) area() float64 {
  var area float64

  for _, s := range m.shapes {
    area += s.area()
  }

  return area
}
```
