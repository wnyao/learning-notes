# [Bootstrapping a Datacenter](https://www.consul.io/docs/install/bootstrapping)

**An agent can run in either client or server mode.** **Server nodes are responsible for running the consensus protocol and storing the cluster state**. The **client nodes are mostly stateless** and rely heavily on the server nodes.

Before a Consul cluster can begin to service requests, a server node must be elected leader. **Bootstrapping is the process of joining these initial server nodes into a cluster**.

It is recommended to have three to five total servers per datacenter. A single server deployment is highly discouraged as data loss is inevitable in a failure scenario.

# [Boostrapping the severs](https://www.consul.io/docs/install/bootstrapping/#bootstrapping-the-servers)

To bootstrap the servers is to use the `-bootstrap-expect` configuration option. This option informs Consul of the expected number of server nodes and automatically bootstraps when that many servers are available. To prevent inconsistencies and split-brain (clusters where multiple servers consider themselves leader) situations, you should either specify the same value for `bootstrap-expect` or specify no value at all on all the servers.

### Creating the cluster

You can trigger leader election by joining the servers together, to create a cluster. You can either configure the nodes to join automatically or manually

### Automatically join the servers

Multiple options for joining the servers.

- specify a list of servers with `-join` and `start_join` options.
- specify a list of servers with `-retry-join` option.
- use automatic joining by tag for supported cloud environments with the `-retry-join` option.

All three methods can be set in the agent configuration file or the command line flag.

### Manually join the servers

To manually create a cluster, you should connect to one of the servers and run the `consul join` command.

```
consul join <Node A Address> <Node B address> <Node C address>
```

Since a join operation is symmetric, it does not matter which node initiates it.

### Verifying the cluster and connect the clients

As a sanity check, `consul info` command is a useful tool. It can be used to verify the `raft.num_peers` and to view the latest log index under `raft.last_log_index`.
