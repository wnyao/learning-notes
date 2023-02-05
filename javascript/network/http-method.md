# HTTP Request Method

- Request methods indicate the desired action to be performed for a given resource.
- Also referred as HTTP Verbs

##### GET
- general access of data
- requests a representation of the specified resources

##### HEAD
- get the meta information of the resource
- asks for a response identical to `GET` but without response body

##### POST
- submit data
- submit an entity to the specified resource, often causing a change in state or side effects on the server

##### PUT
- modify data
- replaces all current representation of the target resource with the request payload

##### DELETE
- delete data

##### CONNECT
- establish a connection tunnel for the target resource

##### OPTIONS
- describe the communication options for the target resource
- list the request methods that can be executed on resources, often used for cross-domain

##### TRACE
- trace request-response transmission path
- perform a message loop-back test along the path to the target resource

##### PATCH
- applied partial modificatioln to a resource

### Reference

- [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
