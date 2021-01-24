# [Run the Consul Agent](https://learn.hashicorp.com/tutorials/consul/get-started-agent?in=consul/getting-started)

- Consul agent can be run in either server or client mode.
- Consul server is responsible for maintaining Consul's state. It is require at least one.
- To make sure consul's state is preserved even if serve fails, you should always run either three or five serves in production.
- The `members` command run against the Consul client, which gets its information via [gossip protocol](https://www.consul.io/docs/internals/gossip.html).
- Consul client runs health checks, register services, and forwards queries to servers.

```
# start the agent
consul agent -dev

# discover nodes
consul catalog nodes

# discover services
consul catalog services

# discover datacenter members
consul members

# discover nodes via HTTP API
curl localhost:8500/v1/catalog/nodes

# discover nodes via DNS
dig @127.0.0.1 -p 8600 Judiths-MBP.node.consul

# stop the agent
consul leave
```

Note: Consul by default expose on port 8500 and DNS server on 8600.
