# [Register a service with Consul Service Discovery](https://learn.hashicorp.com/tutorials/consul/get-started-service-discovery?in=consul/getting-started)

- Consul's service discovery. Consul provides a DNS interface that downstream services can use to find the IP addresses of their upstream dependencies.
- You can register services by **service definition** or by **making call to HTTP API**
- Consul load configs from config directory, common convention on Unix systems is directory `/etc/consul.d`
- Consul can register services that aren't running yet. It correlates each running service with its registration based on the service's port.
- Each service would register with its local Consul client and client forward registration to Consul sever

**Task**

1. Write a service definition config file `./consul.d/web.json

   ```
    {
      "service": {
        "name": "web",
        "tags": [
          "rails"
        ],
        "port": 80
      }
    }
   ```

2. Run command

   ```
   # instance level
   consul agent -dev -enable-local-script-checks -config-dir=./consul.d

   # docker
   docker run -d -e CONSUL_BIND_INTERFACE=eth0 -v ~/Desktop/consul/consul.d:/etc/consul.d -p 8500:8500 -p 8600:8600 -p 80:80 consul agent -dev -config-dir=./consul.d
   ```

3. Query services

   ```
   # query via DNS
   dig @127.0.0.1 -p 8600 web.service.consul

   # use the DNS interface to retrieve the entire address/port pair as a SRV record.
   dig @127.0.0.1 -p 8600 web.service.consul SRV

   # use the DNS interface to filter services by tags.
   dig @127.0.0.1 -p 8600 rails.web.service.consul

   # query via HTTP API
   curl http://localhost:8500/v1/catalog/service/web

   # filter your query for only healthy service instances
   curl 'http://localhost:8500/v1/health/service/web?passing'
   ```

Update service by registering health check

1. Update config in `./consul.d/web.json`

   ```
   {
     "service": {
       "name": "web",
       "tags": [
         "rails"
       ],
       "port": 80,
       "check": {
         "args": [
           "curl",
           "localhost"
         ],
         "interval": "10s"
       }
     }
   }
   ```

2. Reload
   ```
   consul reload
   ```
