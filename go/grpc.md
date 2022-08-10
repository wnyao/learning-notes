# gRPC

- Abbreviated Remote Procedure Calls, g is a [word](https://github.com/grpc/grpc/blob/master/doc/g_stands_for.md) that stand for each version of the release.
- A RPC is a form of Client-server communication that uses a function call rather than a usual HTTP call.
- Uses IDL (Interface Definition Language) as a form of contract on functions to be called and on the data type.

## What makes gRPC so popular?

- Abstraction is easy (function call)
- Supported in a lot of language
- Very performant
- Simpler compared to http
- Good for microservice issues

## Request/Response Multiplexing

![netowrk layer](https://www.freecodecamp.org/news/content/images/2020/11/Screenshot-from-2020-10-03-15-46-01.png)

- Request/Response Multiplexing made possible with HTTP/2 with ther introduction of HTTP/2 layer called **binary framing**.
- Binary framing encapsulates and encodes data 
- HTTP request is **broken down to two parts, headers and data frame**. Made possible to have multiple data on single connection.
- HTTP/2 uses strategy HPack to resolve heavy header payload.
- It maps header on client and server side; and only send header value that is different from previous value. 

## Protobuf

- Commonly used IDL
- Stores data and function in form of proto file.

```protobuf
message Person {
  required string name = 1;
  required int32 id = 2;
  optional string email = 3;
}
```
- As this is the contract, both client and server need to have same proto file.


## Metadata

- gRPC has metadata instead of using HTTP request header.
- Metadata is type of key-value pair that can be set from either client or server side.

## Streaming

- Made possible by multiplexing in HTTP/2
- **Server Streaming RPC**: Where client send single request and server responds with multiple responses.
- **Client Streaming RPC**: Opposite to server streaming RPC.
- **Bidirectional Streaming RPC**: Where both the client and server send messages to each other at the same time without waiting for a response.

## Interceptor

- Support for request and respoonse.
- Intercept messages and allow to modify them.
- Similar to middleware in HTTP processes on a REST api.

## Load Balancing
 
- Supports methods of load balancing.
- Implemented in GoLang library.

## Cancellation

- Able to cancel call when response is not needed.
- Useful for server side streaming.


### References

- [gRPC](https://grpc.io)
- [What is gRPC protocol buffers stream architecture](https://www.freecodecamp.org/news/what-is-grpc-protocol-buffers-stream-architecture/)
- [The concept of grpc](https://www.wallarm.com/what/the-concept-of-grpc)

