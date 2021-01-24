# [Consul and Kubernetes Deployment Guide](https://learn.hashicorp.com/tutorials/consul/kubernetes-deployment-guide?in=consul/kubernetes)

This tutorial covers the necessary steps to install and configure a new Consul datacenter on Kubernetes.

### Global key

The value under global key will affect all other parameter in the chart

- To enable all consul components, set `enabled` to `true`. (Server, client, DNS, UI)
- Set the following global parameters based on your specific environment requirements.

  - `image` is the name and tag of the Consul Docker image.
  - `datacenter` the name of your Consul datacenter.
  - `domain` the domain Consul uses for DNS queries.

- For security, set the bootstrapACLs parameter to true. This will enable Kubernetes to initially setup Consul's ACL system.

### Consul UI

- To enable the Consul web UI update the ui section to your values file and set enabled to true.

### Consul Server

- For production, you will need 3-5 servers for quorum and failure tolerant
- In the server section set both replicas and bootstrapExpect to 3. This will deploy three servers and cause Consul to wait to perform leader election until all three are healthy

**Affinity**

_To ensure the Consul servers are placed on different Kubernetes nodes, you will need to configure affinity._ Otherwise, the failure of one Kubernetes node could cause the loss of multiple Consul servers, and result in quorum loss. The default values.yaml has affinity configured correctly.

**Enterprise license**

If you have an Enterprise license you should reference the Kubernetes secret in the `enterpriseLicense` parameter.

### Consul Client

- Consul client is deployed on every kubernetes node
- You will need to specify resources

### Consul Connect injection security

- To enable Consul Connect service mesh set `enabled` under the `connectInject` key to `true`
- Enabling the `default` parameter will allow the injector to automatically inject the Connect sidecar proxy into all pods.
- Setting the `aclBindingRuleSelector` parameter to `serviceaccount.name!=default` ensures that new services do not all receive the same token if you are only using a default service account. This setting is only necessary if you have enabled ACLs in the global section.

## Example

```
# config.yaml

# Configure global settings in this section.
global:
  # Specify the Consul image to use
  image: 'consul:1.5.0'
  domain: consul
  datacenter: primarydc
  # Bootstrap ACLs within Consul. This is highly recommended.
  bootstrapACLs: true
  # Gossip encryption
  gossipEncryption:
    secretName: 'encrypt-key'
    secretKey: 'key'
# Configure your Consul servers in this section.
server:
  # Specify three servers that wait until all are healthy to bootstrap the Consul cluster.
  replicas: 3
  bootstrapExpect: 3
  # Specify the resources that servers request for placement. These values will serve a large environment.
  resources: |
    requests:
      memory: "32Gi"
      cpu: "4"
      disk: "50Gi"
    limits:
      memory: "32Gi"
      cpu: "4"
      disk: "50Gi"
  # If using Enterprise, reference the Kubernetes secret that holds your license here
  enterpriseLicense:
    secretName: 'consul-license'
    secretKey: 'key'
  # Prevent Consul servers from co-location on Kubernetes nodes.
  affinity: |
    podAntiAffinity:
     requiredDuringSchedulingIgnoredDuringExecution:
       - labelSelector:
           matchLabels:
             app: {{ template "consul.name" . }}
             release: "{{ .Release.Name }}"
             component: server
       topologyKey: kubernetes.io/hostname
# Configure Consul clients in this section
client:
  # Specify the resources that clients request for deployment.
  resources: |
    requests:
      memory: "8Gi"
      cpu: "2"
      disk: "15Gi"
    limits:
      memory: "8Gi"
      cpu: "2"
      disk: "15Gi"
# Enable and configure the Consul UI.
ui:
  enabled: true
# Configure security for Consul Connect pod injection
connectInject:
  enabled: true
  default: true
  aclBindingRuleSelector: “serviceaccount.name!=default”
```
