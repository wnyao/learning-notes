# Flexbox

- css module since 2017
- Aims at providing efficient way to lay out, align and distribute space among items in a container, even when size is unknown and/or dynamic.
- To accomodate all kind of display devices and screen sizes.
- A flex container expands items to fill available free space or shrinks them to prevent overflow.
- As opposed to regular layout like block (vertically-based) and inline (horizontally-based). While those work well for pages, they lack flexibility to support large or complex applications when it comes to orientation changing, resizing, stretching, shrinking, etc.

### Basics and Terminology

![00-basic-terminology](https://css-tricks.com/wp-content/uploads/2018/11/00-basic-terminology.svg)

- Reugular layout is based on both block and inline flow directions.
- Flex layout is based on flex-flow direction.
- Items will be laid out following either main axis or cross-axis (depends on the `flex-direction`).

## Properties (flex container)

#### display

```css
.container {
  display: flex;
}
```

- Defines a flex container; inline or block depending on the given value.
- Enables flex context for all its direct children.

#### flex-diretion

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}

// row: left to right
// row-reverse: right to left
// column: same as row but top to bottom
// column-reverse: same as row-reverse but bottonm to top
```

- Establish the main-axis.
- Defines the direction flex items are placed in container.

#### flex-wrap

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;
}

// nowrap: all flex items will be on one line.
// wrap: flex items will wrap onto multiple lines, from top to bottom.
// wrap-reverse: flex items will wrap onto multiple lines, from bottom to top.
```

- flex items will try to fit onto one line.
- Can be change to allow items to wrap as needed with this property.

#### flex-flow

```css
.container {
  flex-flow: column wrap;
}
```

- shorthand for `flex-direction` and `flex-wrap`.
- together define the flex container's axes.

#### justify-content

```css
.container {
  justify-content: flex-start | flex-end | center | space-around | space-evenly
    | start | end | left | right;
}

// flex-start: items packed toward start of flex-direction
// flex-end: items packed toward end of flex-direction
// start: items packed toward start of writing-mode direction
// end: items packed toward end of writing-mode direction
// left: items packed toward left edge of container
// right: items packed toward right edge of container
// center: items are centered along the line
// space-between: items are evenly distributed with space between
// space-around: items are evenly distributed with space around
// space-evenly: items are distributed so that spacing between two items is equal
```

- defines alignment along main axis.

#### align-items

```css
.container {
  align-items: stretch | flex-start | flex-end | center | baseline | first
    baseline | last baseline | start | end | self-start | self-end;
}

// stretch: stretch to fill container
// flex-start / start / self-start: items are placed at start of cross axis
// flex-end / end / self-end: items are placed at end of cross axis
// center: items are centered in the cross-axis
// baseline: items are aligned such as their baseline align
```

- defined how flex items are laid out along cross axis

#### align-content

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around |
    space-evenly | streatch | start | end | baseline | first baseline | last
    baseline;
}

// normal: items packed in thrie default position
// flex-start / start: items packed to start of container
// flex-end / end: items packed to end of container
// center: items entered in the container
// space-between: items evenly distributed with equal space between
// space-around: items evenly distributed with equal space around each line
// space-evenly: items evenly distributed with equal space around them
// stretch: lines stretch to take up the remaining space
```

- Aligns a flex container's lines within when there is extra space in the cross-axis.
- Similary to `justify-content` aligns individual items within the main-axis.

## Properties (flex items)

#### order

```css
.item {
  order: 5; /* default is 0 */
}
```

- flex items are laid out in source order.
- order property control the order in which their appears.

#### flex-grow

```css
.item {
  flex-grow: 4; /* default to 0 */
}
```

- defines ability for flex item to grow.
- accepts a unitless value that serves as proportion.

#### flex-shrink

```css
.item {
  flex-shrink: 3; /* default to 1 */
}
```

- defines the ability for flex item to shrink

#### flex-basic

```css
.item {
  flex-basic: content | auto | 20% | 5rem | etc;
}

// content: size it based on the item's content
// auto: size it by item's width and height property
```

- defines the default size of element before the remaining space is distributed.

#### flex

```css
.item {
  flex: 0 1 auto;
}
```

- shorthand for `flex-grow`, `flex-shrink`, and `flex-basis` combined.
- default to `0 1 auto`

#### align-self

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

- allows the default alignment to be overridden for individual flex items.

### Reference

- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
