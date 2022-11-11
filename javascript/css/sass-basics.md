# Sass

- CSS on its own is fun but can get larger, more complex, and harder to maintain.
- Sass includes features that don't exist in CSS like variables, nesting, mixins, inheritance, etc.
- Preprocessing will take Sass file and save it as a normal CSS file that will be use in website.
- The most direct way is through Sass command, compile Sass to CSS.

## Features

### Variables

- variable is a way to store information
- to reuse throughout stylesheet
- Sass uses the `$` symbol

```sass
$font-stack: Helvetica, sans-serif
$primary-color: #333

body
    font: 100% $font-stack
    color: $primary-color
```

### Nesting

- to have clear nested and visual hierarchy
- nest CSS selectors in way that follows same visual hierarchy of HTML.
- better maintain CSS result

```sass
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 6px 12px
    text-decoration: none
```

### Partials

- partials is Sass file named with a leading underscore, i.e. `_partials.scss`.
- contain snippets of CSS that can include in other Sass files.
- greate to modularize CSS and easier to maintain.
- underscore lets Sass know the file is only partial and should not be generated into CSS file.
- Sass partials are used with `@use` rule.

### Modules

- Sass can be split up into different file.
- rely on `@use` rule.
- This rule loads anothe Sass file as module, which you can refer to its variables, mixins, and functions with a namespace based on filename.

```sass
// _base.sass
$font-stack: Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color

// styles.sass
@use 'base'

.inverse
  background-color: base.$primary-color
  color: white
```

### Mixins

- lets you make groups of CSS declarations for reuse throughout your site.
- allow pass in values to make mixin more flexible.
- good for vendor prefixes.

#### sass

```sass
// mixin
=transform($property)
  -webkit-transform: $property
  -ms-transform: $property
  transform: $property

// use
.box
  +transform(rotate(30deg))

```

#### scss

```scss
@mixin transform($property) {
  -webkit-transform: $property;
  -ms-transform: $property;
  transform: $property;
}

.box {
  @include transform(rotate(30deg));
}
```

### Extend/Inheritance

- let you share of CSS properties from onw selector to another.

```sass
/* This CSS will print because %message-shared is extended */
%message-shared
  border: 1px solid #ccc
  padding: 10px
  color: #333

/* This CSS won't print because %equal-heights is never extended */
%equal-heights
  display: flex
  flex-wrap: wrap

.message
  @extend: %message-shared

.success
  @extend: %message-shared
  border-color: green

.error
  @extend: %message-shared
  border-color: red

.warning
  @extend: %message-shared
  border-color: yellow
```

### Operators

- math operators `+, -, *, /, %`

```sass
.container
  width: 100%

article[role="main"]
  float: left
  width: 600px / 960px * 100%

aside[role="complementary"]
  float: right
  width: 300px / 960px * 100%
```

### Reference

- [Sass Basics](https://sass-lang.com/guide)
