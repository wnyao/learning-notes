# [Required Ports](https://www.consul.io/docs/install/ports)

**Consul requires up to 6 different ports to work properly.** Some on TCP, UDP, or both protocols.

## Ports Table

Before running consul, you should ensure the following bind ports are accessible.

- **8600** - DNS: The DNS server (TCP and UDP)
- **8500** - HTTP: The HTTP API (TCP Only)
- **8501 (disabled)** - HTTPS: The HTTPs API
- **8502 (disabled)** - gRPC: The gRPC API
- **8301** - LAN Serf: The Serf LAN port (TCP and UDP)
- **8302** - WAN Serf: The Serf WAN port (TCP and UDP)
- **8300** - server: Server RPC address (TCP Only)
- **21000** - Sidecar Proxy Min: Inclusive min port number to use for automatically assigned sidecar service registrations.
- **21255** - Sidecar Proxy Max: Inclusive max port number to use for automatically assigned sidecar service registrations.

## Port Information

- **DNS Interface** used to resolve DNS queries.
- **HTTP API** used by clients to talk to the HTTP API.
- **HTTPS API** (Optional) is off by default, but port 8501 is a convention used by various tools as the default.
- **gRPC API** (Optional) is off by default, only used to expose the xDS API to Envoy proxies, but port 8502 is a convention used by various tools as the default. Defaults to 8502 in `-dev` mode.
- **Serf LAN** is used to handle gossip in the LAN. Required by all agents.
- **Serf WAN** is used to handle gossip in the WAN. to other serves.
- **Server RPC** is used by serves to handle incoming requests from other agents.
