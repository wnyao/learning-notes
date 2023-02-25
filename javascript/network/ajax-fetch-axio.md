# Ajax vs. Fetch vs. Axios

- API work on CRUD principle
- CRUD is the standardized use of HTTP Action Verbs
- commonly use API technologies are XMLHTTPRequest, Ajax, FetchAPI, Axios

### XMLHTTPRequest

- Godfather of all API technologies

```js
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  console.log(this.response);
};

// the third argument specified whether to fetch data async or synchronously
xhr.open("GET", url, true);
xhr.send();
```

### Fetch API

- Created on xhr with built-in promises
- Make network request similar to XMLHttpRequest
- Uses promises; enables simpler and clearer api
- Avoid callback hell
- Allow you to asynchronously request a resource
- 

```js
fetch(url, config).then(function(response) {
    console.log(response.json());
  }).catch(function(err) {
    console.log(error.message);
  });
```

### JQuery AJAX

- Stands for Asynchronous Javascript and XML
- provides a condensed format to make XMLHttpRequest
- Cross-browser support, Simple methods 

```js
$.ajax({ 
  url: "https://google.com",
  type: "get",
  success: function(result) {
    result = JSON.parse(result);
    console.log(result);
  }
});
```

### Axios

- Popular promise-based 3rd party libary
- Provides easy to use API and can used both in browser and node.js
- Supports promises
- Additional feature such as cancel requests and automatically transform JSON data

```js
import axios from 'axios';

const getData = () => {
  return axios.get(url).then(function(response) {
    console.log(response);
  }).catch(function(err) {
    console.log(err);
  });
}
```

### Reference

- [XHR v/s fetch v/s ajax v/s Axios for API requests](https://medium.com/adg-vit/xhr-vs-fetch-vs-ajax-vs-axios-for-api-requests-f06e6bd56b32)
