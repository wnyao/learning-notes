# [Consesus Protocol](https://www.consul.io/docs/internals/consensus)

**Consul uses a consensus protocol to provide Consistency**.

- [Raft: Insearch of an Understandable Consesus Algorithm](https://raft.github.io/raft.pdf)
- [The Secret Lives of Data](http://thesecretlivesofdata.com/raft)

## [Raft Protocol Overview](https://www.consul.io/docs/internals/consensus#raft-protocol-overview)

**Raft is a consensus algorithm that is based on Paxos.** Designed to have fewer states and a simpler, more understandable algorithm.

Few key terms to know when discussing Raft:

- **Log** - Primary unit of work in a Raft system is a log entry. The problem of consistency can be decomposed into a replicated log. A log is an ordered sequence of entries. Entries includes any cluster change: adding nodes, adding services, new key-value pairs etc. Log consistent if all members agree on the entries and their order.

- **FSM (Finite State Machine)** - An FSM is a collection of finite states with transitions between them. As new logs are applied, the FSM is allowed to transition between states. Application of the same sequence of logs must result in the same state, meaning behavior must be deterministic.

- **Peer set** - The peer set is the set of all members participating in log replication. For Consul, all server nodes are in the peer set of the local datacenter.

- **Quorum** - A quorum is a majority of members from a peer set: for a set of size `n`, quorum required at least `(n + 1) / 2` members. If a quorum of nodes is unavailable for any reason, the cluster becomes unavailable and no new logs can be committed.

- **Committed Entry** - An entry is considered committed when it is durably stored on a quorum of nodes.

- **Leader** - At any given time, the peer set elects a single node to be the leader. Leader is responsible for ingesting new log entries, replicating to followers, and managing when an entry is considered committed.

## [Raft in Consul](https://www.consul.io/docs/internals/consensus#raft-in-consul)

## [Consistency Modes](https://www.consul.io/docs/internals/consensus#consistency-modes)

**All writes to the replicated log go through Raft, reads are more flexible.** Consul supports 3 different consistency modes for reads:

- **default** - Raft makes use of leader leasing, providing a time window in which the leader assumes its role is stable. However, if a leader is partitioned from the remaining peers, a new leader may be elected while the old leader is holding the lease. This means there are 2 leader nodes. The old leader will be unable to commit new logs. However, if the old leader services any reads, the values are potentially stale. The default consistency mode relies only on leader leasing, exposing clients to potentially state values. The time window of stale reads is also bounded since the leader will step down due to the partition.

- **consistent** - Strongly consistent without caveats. It requires that a leader verify with a quorum of peers that it is still leader. This introduces additional round-trip to all server nodes. The trade-off is always consistent reads but increased latency due to the extra round trip.

- **Stale** - Allows any server to service the read regardless of whether it is leader. Reads can be arbitrarily stale but are generally within 50 milliseconds of the leader. The trade-off is very fast and scalable reads but with stale values. This mode allows reads without a leader meaning a cluster that is unavailable will still be able to respond.

To switch these modes, either `stale` or `consistent` query parameters should be provided on requests. It is and error to provide both.

Note that some endpoints support a cached parameter which has some of the same semantics as stale but different trade offs.

To support bounding the acceptable staleness of data, responses provide the `X-Consul-LastContact` header containing the time in milliseconds that a server was last contacted by the leader node. The `X-Consul-KnownLeader` header also indicates if there is a known leader. These can be used by clients to gauge the staleness of a result and take appropriate action.
