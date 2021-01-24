# [Consul and Kubernetes Reference Architecture](https://learn.hashicorp.com/tutorials/consul/kubernetes-reference-architecture?in=consul/kubernetes)

### Infrastructure requirement

- Consul server agents are responsible for the datacenter state, responding to RPC queries, and processing all write operations.
- Server sizing is critical for the overall performance, efficiency, and health of the Consul datacenter.

Example snippet of Helm configuration for a Consul server in a large environment:

```
# config.yaml

server:
  resources: |
    requests:
      memory: "32Gi"
      cpu: "4"
    limits:
      memory: "32Gi"
      cpu: "4"

  storage: 50Gi
# ...
```

- You should also set resource limits for Consul clients, so that the client pods do not unexpectedly consume more resources than expected.
- Persistent volumes (PV) allow you to have a fixed disk location for the Consul data.
- Enable RBAC on your Kubernetes cluster.

### Catalog Sync

- Catalog sync allows you to sync services between consul and kubernetes.
- The sync can be unidirectional in either directions or bidirectional.
- Services synced from Consul to Kubernetes will be discoverable with the built-in Kubernetes DNS once a Consul stub domain is deployed.
- When bidirectional catalog sync is enabled, it will behave like the two unidirectional setups.

### Network Connectivity

- When running Consul as a pod inside of Kubernetes, the Consul servers will be automatically configured with the appropriate addresses.
- When running Consul servers outside of the Kubernetes cluster and clients inside Kubernetes as pods, there are additional networking considerations.
