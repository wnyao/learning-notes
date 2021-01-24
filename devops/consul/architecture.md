# [Consul Architecture](https://www.consul.io/docs/internals/architecture)

### 10,000 foot view

![10000-foot-view](https://www.consul.io/img/consul-arch.png)

Consul has **first class support for multiple datacenters** and expects this to be the common case.

Within **each datacenter** (mix of clients and servers), it is **expected that there be between three to five servers**. **This strikes a balance between availability in the case of failure and performance**, as consensus gets progressively slower as more machines are added. There is no limits to the number of clients.

**All the agents that are in datacenter participate in [gossip protocol](https://www.consul.io/docs/internals/gossip)**. This means there is a gossip pool that contains all the agents for a given datacenter. This serves few purposes:

- **No need to configure clients with the addresses of servers; discovery is done automatically**.
- **Detecting agent failure is not placed on the serves but distributed**. This makes failure detection much more scalable than naive heartbeating schemes. It also provides failure detection for the nodes.
- It is **used as a messaging layer to notify when important events such as leader election take place.**

The servers in each datacenter work together to elect a single leader. The **leader is responsible for processing all queries and transactions**. **Transactions must also be replicated to all peers as part of [consensus protocol](https://www.consul.io/docs/internals/consensus)**. Because of this, a non-leader server receives an RPC request, it forwards to the cluster leader.

The **server agents also operate as part of WAN gossip pool**. This pool is different from the LAN pool as it is **optimized for the higher latency of the internet and is expected to contain only other Consul agents**. The purpose of this pool is to allow datacenters to discover each other in a low-touch manner. Bringing a new datacenter online is as easy as joining the existing WAN gossip protocol. It also enables cross-datacenter requests.

**Data is not replicated between different Consul datacenters**. If the remote datacenter is not available, the resources will also not be available, but that won't otherwise affect the local datacenter. There are some special situations where alimited subset of data can be replicated, such as with Consul's built-in [ACL replication](https://learn.hashicorp.com/consul/day-2-operations/acl-replication) capability, or external tools like [consul-replicate](https://github.com/hashicorp/consul-replicate).

In some places, client agents may cache data from the servers to make it available locally for performance and reliability. Eg. Connect certificates and intentions.
