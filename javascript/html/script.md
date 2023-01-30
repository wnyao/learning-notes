# Scripts

```js
<script src="..."></script>
```

## Defer & Async

- In modern websites, scripts are often heavier than HTML
- When HTML comes across `<script>` tag, it will wait for it to download, which block DOM build if script is above the page
- The browser must wait for it to download, execute and then continue to process the rest
- Alternative is to place scripts below the page, but far from perfect. It executes the download on after rendering the page HTML.
- For long document, that may be noticeable delay.

#### defer

- defer tells browser not to wait for the script
- the script will load at the background and then run when the DOM is fully built
- `DOMContentLoaded` waits for the deferred script, It only triggers when the script is downloaded and executed
- Browser download defer scripts in parallel, to improve performance
- Defer scripts will ensure relative order for execution

```js
<script defer src="..."></script>
```

#### async

- async means the script is completely independent
- the browser doesn't block on async script
- Other scripts dont wait for async script, vice versa
- `DOMContentLoaded` and async script don't wait for each other

```js
<script async src="..."></script>
```

### Questions

Q1: The external js file is loaded first or `onload` is loaded first?
A1: `onload` is loaded after the loading of external js file is complete.

### Reference

- [Scripts: async, defer](https://javascript.info/script-async-defer)
