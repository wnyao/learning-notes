# HTTP

...

### HTTPS

- HTTPS establishes a security layer between HTTP and TCP
- When HTTP communicates with TCP, it must pass through a security layer, encrypted data packet, then transmit the encrypted packets

1. The browser transmit a client random and a list of encryption methods to the server.
2. After the server receives it, it transmits a server random, a list of encryption methods and a digital certificate (including the public key to the browser)
3. Then browser perform legal verification, if passed, generate a pre random and encrypt it with public key and send it to the server
4. The server uses client random, server random, pre random to generate secret using public key encryption, and then uses this secret key for data encryption and decryption for subsequent mechanism

### TCP 

- Transmission control protocol
- Provides a secure and reliable connection between two devices using 3 way handshake
- Uses full-duplex connection to synchronize and acknowledge each other on both sides

### TCP Sliding Window

- Two types of TCP sliding window: Sending Window and Receiving Window
- TCP needs to send data into send buffer and receive data into the receiving buffer
- There are often situation where the sender sends too much and the receiver cannot sigest it, so flow control is needed.
- If the receiving buffer of the party is full, the flow control process needs to maintain sending window at sending end and receiving window at receiving end.

##### 3 way handshakes

- Three way handshake is used to confirm the sending and receiving capabilities of the other party
- SYN (Synchronization Sequence Number)
- The ACK indicates the response of the segment it received and SYN indicates with what sequence number it will start the segment

1. When client want to connect to server, then it sends the message to the server by setting the SYN flag as 1
2. The message carries some additional information like the sequence number (32-bit random number)
3. The ACK is set to 0. The maximum segment size and the window size are also set
4. The server acknowledge the request by setting ACK = 1
5. The server will set the SYN = 1 and send to client if it wants to establish the connection
6. The sequence number used for SYN on server will be different from the clients SYN
7. The client send ACK after receiving server SYN
8. After getting ACK from client the connection will be established

1. At the beginning, both parties are in the CLOSED state, and then the server starts to listen to a port and enters the LISTEN state
2. Then the client actively initiates the connection, send `SYN`, and then becomes `SYN-SENT` itself, `seq = x`
3. After the server receives it, it returns `SYN seq = Y` and `ack = x + 1` (for the SYN sent by the client), and it becomes SYN-READ
4. Afterwards, the client sends `ACK seq = x + 1`, `ack = y + 1` to the server again, and becomes `ESTABLISHED` state, and the server also enters `ESTABLISHED` after receiving the `ACK`.

#### Why is it not two way or four way handshake?

...

### Reference

- [字节跳动最爱考的前端面试题：计算机网络基础](https://juejin.cn/post/6939691851746279437)
- [TCP 3 way handshake](https://www.tutorialspoint.com/tcp-3-way-handshake-process)
- [面试官，不要再问我三次握手和四次挥手](https://zhuanlan.zhihu.com/p/86426969)
