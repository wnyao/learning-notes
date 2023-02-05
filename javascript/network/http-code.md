# HTTP Response Code

### Common HTTP Code

- 1xx: Informational Responses - Indicates that the protocol is currently in an intermediate state, and subsequent requests are required
- 2xx: Successful Responses - Indicates that the request was successful
- 3xx: Redirection Responses - Indicates the redirection status and needs to be re-requested
- 4xx: Client error Responses - Indicates that the request message is wrong
- 5xx: Server Error Responses - server-side error

### Common status code

##### 101 
- Switch protocols, switch from HTTP to WebSocket
- Indicates a protocol in which the server switches
- Specified in the `Upgrade` request header received from a client
- The server includes `Upgrade` in the response to indicate the protocol it switches to

```sh
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
```

##### 200 
- The request is successful and there is a response body

```sh
200 OK
```

##### 301 
- Permanent redirect; will be cached
- Moved Permanently; Indicates the requested resource has been indefinitely moved to the URL given by the `Location` headers

```sh
GET /index.php HTTP/1.1
Host: www.example.org

HTTP/1.1 301 Moved Permanently
Location: http://www.example.org/index.asp
```

##### 302
- Temporary redirect; no caching
- Found; Indicates the requested resource has been definitely moved to the URL given by the `Location` headers

```sh
302 Found
```

##### 304
- Indicates that there is no need to retransmit the requested resources
- It is an implicit redirection to the cached resource

```sh
304 Not Modified
```

##### 400 
- Bad Request
- Indicates that the server cannot or will not process the request due to something that is perceived to be a client error

##### 403
- Server Forbidden
- Indicates server understand the request but failed to authorize it

```sh
403 Forbidden
```

##### 404
- Resource not found

```
404 Not Found
```

##### 500
- Server Side Error
- Indicates server encountered an unexpected condition that prevented it from fulfilling the request
- A generic "catch-all" response

```
500 Internal Server Error
```

##### 504
- Gateway Timeout
- Indicates the server did not get a response in time from the upstream server that it needed to complete the request


### Reference

- [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
