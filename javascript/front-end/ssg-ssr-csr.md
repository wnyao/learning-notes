## Application Models

### Single Page Application (SPA)

- work inside browser
- focus on making outstanding UX, to imitate natural environment, no page reload, no extra wait time.
- SPA requests the markup and data independently and render pages straight in the browser.

#### Pros

- SPA is fast, as most resources are only loaded once throughout the lifespan of application.
- Development is simplified and streamlined.
- SPA can cache any local storage effectively.

#### Cons

- Tricky and not easy to make SEO optimisation.
- It is slow to download because of heavy client frameworks required to be loaded on client.
- It requires JavaScript to be loaded and enabled on client browser.
- SPA is less secure, enables attachker to inject client side script into web application.
- Memory leak in JavaScript can cause slow down.

### Multi page Application (MPA)

- Work in traditional way
- Every change (e.g. display data or submit data back to server) requests rendering a new page from the server in the browser
- Application is large, bigger than SPA.
- more complex and more difficult to build than SPA.

#### Pros

- Very good and easy for proper SEO managemnt.

#### Cons

- Front-end and back-end are tightly coupled.
- Longer development due to complexity.

# Rendering of the web

### Static Site Generation (SSG) / Static Generation

- Static Generation describes the process of compiling and rendering a website or app at build time.
- The output is bunch of static files, including HTML, JavaScript, and CSS.
- Static generation render page like it would in the browser at compile time, give ability to serve entire content at first load.
- Scripts still hydrate pages during process, but ideally with fewer changes or no changes at all.
- JavaScript allow static sites to be more dynamic.
- Framework includes, Next.js and Gatsby.js.

### Server Side Rendering (SSR)

- back-end web development
- process involve in creating the requested page are handled on a remote server hosting the application.
- process includes querying database for infomation, processing logic required, create HTML page, etc.

### Client Side Rendering (SSR)

- front-end web development
- rendering of content happens in user browser instead of remote server.
- server is only require to serve the raw web application, presentation logic are handled on the client-side.

#### Isomorphic rendering

- Also called universal rendering.
- New technique on modern web development.
- The idea is to render a web application developed with a JavaScript framework, process on the server-side the first time a page is loaded and on the client-side afterward.

### Reference

- [What is Static Site Generation? How Next.js Uses SSG for Dynamic Web Apps](https://www.freecodecamp.org/news/static-site-generation-with-nextjs/)
- [Frontend vs. backend: what's the difference?](https://www.pluralsight.com/blog/software-development/front-end-vs-back-end)
