# [Consul Reference Architecture](https://learn.hashicorp.com/tutorials/consul/reference-architecture)

## Consul servers

**Consul server agents maintain the datacenter state, respond to RPC queries (read operations), and process all write operations.** Because Consul server agents do most of the heavy lifting, their host sizing is critical for overall performance, efficiency, and health of Consul datacenter.

### Hardware sizing considerations

- The small size would be appropriate for most initial production deployments, or for development/testing environments.
- The large size is for production environments where there is a consistently high workload.

## Datacenter design

You may deploy a Consul datcenter (typically 3 or 5 servers plus client agents) in a single physical datacenter across multiple datacenters. **For a large datacenter with high runtime reads and writes, deploying servers in the same physical location improves performance**.

### Single datacenter

It is recommend a single consul datacenter for applications deployed in the same datacenter. Consul supports traditional three-tier applications as well as microservices.

You will need 3 to 5 servers to balance between availability and performance. These servers together run teh Raft-driven consistent state store for updating catalog, session, prepared query, ACL, and KV state.

**The recommended maximum size for a single datacenter is 5000 nodes.** For write-heavy and/or read-heavy datacenter, you may need to reduce the maximum number of nodes further, depending on the number and the size of KV pairs and the number of watches. **As you add more client machines it takes more time to gossip to converge**. Similarly, when a new server joins an existing multi-thousand node datacenter with a large KV store it may take more time to replicate the store to the new server's log, and the update rate may increase.

> **TIP**: For write-heavy datacenters, consider scaling vertically with larger machine instances and lower latency storage.

**Service tags help make necessary queries against your datacenter.** Without them, node searches based on a specific service are impossible.

**In cases where agents can't contact each other due to network segmentation, you can use Consul's [network segments](https://learn.hashicorp.com/consul/day-2-operations/network-segments) (Consul Enterprise only) to create multiple tenants that share Raft servers in the same datacenter**. Each tenant has its own gossip pool and doesn't communicate with the agents outside the pool. All the tenants, however, do share the KV store.

### Multiple datacenters

You can join consul datacenters running the same service in different datacenters by WAN links, communicate over WAN on port `8302`. **Unless configured via CLI or API, Consul servers will only return results from their local datacenter**. **Consul doesn't replicate date between multiple datacenters, but you can use the [consul-replicate](https://github.com/hashicorp/consul-replicate) tool to replicate the KV data periodically**.

> It is good practice to enable TLS server name checking in order to avoid accidental cross-joining of agents.
