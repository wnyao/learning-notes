# Storage

## Local Storage

- Web storage API
- Storage limit is maximum
- Saved for infinity or until user manually deletes it (clear by JS, or browser cache).
- Persist even when the browser is closed and reopened.
- Share across tabs.

**Example**

```javascript
const data = { greet: "Hello", name: "World" };

// set single item
Window.localStorage.setItem("data", JSON.stringify(data));

// get single item
Window.localStorage.getItem("data");

// remove single item
Window.localStorage.removeItem("data");

// clear all localStorage items
Window.localStorage.clear();
```

## Session Storage

- Web storage API
- at most 5mb
- Saved for the life of the current tab, for the duration of the page session (as long as the browser is open, including page reloads and restores).
- Stores data only for a session, until the browser or tab is closed.
- Not share across tabs.

**Example**

```javascript
const data = { greet: "Hello", name: "World" };

// set single item
Window.sessionStorage.setItem("data", JSON.stringify(data));

// get single item
Window.sessionStorage.getItem("data");

// remove single item
Window.sessionStorage.removeItem("data");

// clear all localStorage items
Window.sessionStorage.clear();
```

## [Cookie](https://en.wikipedia.org/wiki/HTTP_cookie)

- A small piece of information left on a visitor's computer by a website, via a browser.
- Used to personalize user's web experience with a website.
- Can be set and modified at the server level using the `Set-Cookie` HTTP header, or with JS using `document.cookie`
- 4kb, can be saved up to infinity.
- Will continue to live after closing the tab and the browser.

```javascript
// client
document.cookie = "username=John Doe";

// server
app.use(function (req, res, next) {
  res.cookie("username", "John Doe", {
    maxAge: 900000,
    httpOnly: true,
  });

  next();
});
```

### Session Cookie

- Also known as in-memmory cookie, transient cookie or non-persistent cookie.
- Do not have an expiration date assigned to them, which is how browser knows to treat them as session cookies.
- 4kb, deleted when the user close the browser (not always deleted).
- Will continue to live after closing the tab and the browser.

```javascript
// server
var cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);
```

### Persistent Cookie

- Sometimes referred to as tracking cookies.
- Expires at a specific date or after a specific length of time.
- Information will be transmitted to the server every time user visits the website that it belongs to, or views a resource belonging to that website from another website.

### Secure cookie

- Can only be transmitted over an encrypted connection (HTTPS).
- They cannot be transmitted over unencrypted connnection (HTTP).
- Cookie is made secure by adding the `Secure` flag to the cookie.

```javascript
res.cookie("<cookie name>", "<cookie value>", {
  expires: new Date(Date.now() + 900000),
  httpOnly: false,
  secure: true,
});
```

### HTTP-only cookie

- Cannot be accessed by client-side APIs, such as JS.
- Eliminates the threat of cookie theft via cross-site scripting (XSS).
- Vulnerable to cross-site tracing (XST) and cross-site request forgery (CSRF) attacks.
- Cookie is given this chareacteristic by adding the `HttpOnly` flag to the cookie.

### Third-party cookie

- belongs to a domain different from the one shown in the address bar.
- typically appears when web page feature content from external websites, such as banner advertisements.

### Reference

- [Sharing sessionStorage between tabs for secure multitab authentication](https://blog.guya.net/2015/06/12/sharing-sessionstorage-between-tabs-for-secure-multi-tab-authentication/#:~:text=The%20benefit%20of%20the%20sessionStorage,and%20still%20remain%20logged%2Din.&text=When%20the%20user%20closes%20the%20tab%20%E2%80%93%20it's%20gone.)
- [HTTP Cookie](https://en.wikipedia.org/wiki/HTTP_cookie)
