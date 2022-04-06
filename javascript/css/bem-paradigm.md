# BEM

- BEM stands for **Block, Element, Modifier** methodology
- Its goal is to help developers better understand the relationship between the HTML and CSS of given project.

```
// Block component
.btn {}

// Element that depends upon the block
.btn__price {}

// Modifier that changes the style of the block
.btn--orange {}
.btn--big {}
```

- **Block** is a top-level abstraction of a new component, should be thought of as a parent.
- **Elements** can be placed inside and these are denoted by two underscores following the name of the block.
- **Modifier** can manipulate the block so that we can theme or style that particular component without inflicting changes on completely unrelated module.

```
<a class="btn btn--big btn--orange" href="https://css-tricks.com">
  <span class="btn__price">$9.99</span>
  <span class="btn__text">Subscribe</span>
</a>
```

### Why should we consider BEM?

1. If we want to make a new style of a component, we can easily see which modifiers and children already exist. We might even realize we don’t need to write any CSS in the first place because there is a pre-existing modifier that does what we need.
2. If we are reading the markup instead of CSS, we should be able to quickly get an idea of which element depends on another (in the previous example we can see that .btn\_\_price depends on .btn, even if we don’t know what that does just yet.)
3. Designers and developers can consistently name components for easier communication between team members. In other words, BEM gives everyone on a project a declarative syntax that they can share so that they’re on the same page.

> "This is the main reason we end up with bloated code bases, full of legacy and unknown CSS that we daren’t touch. We lack the confidence to be able to work with and modify existing styles because we fear the consequences of CSS’ globally operating and leaky nature. Almost all problems with CSS at scale boil down to confidence (or lack thereof): People don’t know what things do any more. People daren’t make changes because they don’t know how far reaching the effects will be." - Harry Roberts

### Problems with BEM CSS

```
.nav .nav__listItem .btn--orange {
  background-color: green;
}

<a class="btn" href="https://css-tricks.com">
  <div class="nav__listItem">Item one</div>
  <div class="nav__listItem">Item two</div>
</a>

```

- A block should never override the styles of another block or modifier. This would make it almost impossible to read the HTML and understand what this component does; This goes for HTML.
- Never overriding modifiers in an unrelated block.
- Avoiding making unnecessary parent elements when the child can exist quite happily by itself.

### Reference

- [BEM 101](https://css-tricks.com/bem-101/#:~:text=The%20Block%2C%20Element%2C%20Modifier%20methodology,CSS%20in%20a%20given%20project.)
- [More transparent ui code with namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
