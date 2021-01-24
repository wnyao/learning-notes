# [Connect Services with COnsul Service Mesh](https://learn.hashicorp.com/tutorials/consul/get-started-service-discovery?in=consul/getting-started)

- Consul can connect services via sidecar proxy, deployed locally with service instance
- Consul configures sidecar proxy to establish mTLS between your services
- Consul does not automatically start the proxy process for you. This is because Consul Conect service mesh allows you to chose the proxy you'd like to use.

**Task**

1. Start a simple socat service.

   ```
   # start service
   socat -v tcp-l:8181,fork exec:"/bin/cat"

   # verify using netcat
   nc localhost 8181
   ```

2. Register service with additional connect stanza.
   ```
   {
     "service": {
       "name": "socat",
       "port": 8181,
        # register a sidecar proxy for this process on a dynamically allocated port
       "connect": {
         "sidecar_service": {}
       }
     }
   }
   ```
3. Reload
   ```
   consul reload
   ```
4. Start sidecar proxies process.
   ```
   consul connect proxy -sidecar-for web
   ```
5. Blocking the connection to the service by creating an intention. Intentions define which services are allowed communicate with which other services.

   ```
   # create intention
   consul intention create -deny web socat

   # delete intention
   consul intention delete web socat
   ```
