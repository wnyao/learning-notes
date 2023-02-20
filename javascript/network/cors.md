# CORS

![cors-principle](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/cors_principle.png)

- Short for Cross-Origin Resource Sharing
- A HTTP header based mechanism
- Allows server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources
- CORS also relies on mechanism by which browsers make a preflight request to the server hosting the cross-origin resource, to check server permit the actual request.
- For security reason, browser restrict cross-origin HTTP requests initiated from scripts
- XMLHTTPRequest and Fetch API follow the same-origin policy
- For http request methods that can cause side-effects on server with data, the specification mandates that browsers preflight the request

### Simple request

- Don't trigger a CORS preflight
- Motivation being that `form` from HTML 4.0 can submit simple requests to any origin, so server is already be protected against cross-site request forgery
- The pattern of `Origin` and `Access-Control-Allow-Origin` headers is the simplest use of access control protocol

```sh
# Request
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example # Indicates where the invocation is coming from 

# Response
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2
Access-Control-Allow-Origin: * # Indicates that resource can be accessed by any origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml

[…XML Data…]
```

### Preflight request

- Browser first sends http request using `OPTIONS` method to the resource on the other origin
- Not all browser support following redirects after a pre-flighted request

```js
# Example of preflight request
const xhr = new XMLHttpRequest();
xhr.open("POST", "https://bar.other/doc");
xhr.setRequestHeader("X-PINGOTHER", "pingpong"); # Non-standard http request header, not part of HTTP/1.1
xhr.setRequestHeader("Content-Type", "text/xml");
xhr.onreadystatechange = handler;
xhr.send("<person><name>Arun</name></person>"); 
```

```sh
# Preflight request
OPTIONS /doc HTTP/1.1 # preflight request with OPTIONS method
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
Access-Control-Request-Method: POST # Notifies the server as part of a preflight request on the method the actual request used
Access-Control-Request-Headers: X-PINGOTHER, Content-Type # Notifies the server when request is sent, it will do so with X-PINGOTHER and Content-Type custom headers

# Response to preflight request
HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example # Resource restricted to the request origin only
Access-Control-Allow-Methods: POST, GET, OPTIONS # Valid methods to query the resource
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type # Confirming that these are premitted headers to be used
Access-Control-Max-Age: 86400 # How long the preflight request can be cached
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```

### Reference

- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

