# [Consul Service Discovery and Mesh on Minikube](https://learn.hashicorp.com/tutorials/consul/kubernetes-minikube?in=consul/kubernetes)

**Prerequisite**

- kubernetes-cli
- helm
- minikube

### Deploy consul on minikube

1. Start minikube

   ```
   minikube start --memory 4096
   ```

2. Download demo codes and helm charts

   ```
   helm repo add hashicorp https://helm.releases.hashicorp.com
   ```

3. Create `consul-values.yaml` file

   ```
   # Choose an optional name for the datacenter
   global:
     datacenter: minidc

   # Enable the Consul Web UI via a NodePort
   ui:
     service:
       type: 'NodePort'

   # Enable Connect for secure communication between nodes
   connectInject:
     enabled: true

   client:
     enabled: true

   # Use only one Consul server for local development
   server:
     replicas: 1
     bootstrapExpect: 1
     disruptionBudget:
       enabled: true
       maxUnavailable: 0
   ```

4. Deploy Consul on kubernetes
   ```
   helm install hashicorp hashicorp/consul -f consul-values.yaml
   ```
5. Access consul ui
   ```
   minikube service list
   ```

### Deploy services

1. Create a pod definition and service account for the counting service named `counting.yaml`.

   ```
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     name: counting

   ---

   apiVersion: v1
   kind: Pod
   metadata:
     name: counting
     annotations:
       'consul.hashicorp.com/connect-inject': 'true'
   spec:
     containers:
       - name: counting
         image: hashicorp/counting-service:0.0.2
         ports:
           - containerPort: 9001
             name: http
     serviceAccountName: counting
   ```

2. Create a pod definition and service account for the counting service named `dashboard.yaml`.

   ```
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     name: dashboard

   ---

   apiVersion: v1
   kind: Pod
   metadata:
     name: dashboard
     labels:
       app: 'dashboard'
     annotations:
       'consul.hashicorp.com/connect-inject': 'true'
       'consul.hashicorp.com/connect-service-upstreams': 'counting:9001'
   spec:
     containers:
       - name: dashboard
         image: hashicorp/dashboard-service:0.0.4
         ports:
           - containerPort: 9002
             name: http
         env:
           - name: COUNTING_SERVICE_URL
             value: 'http://localhost:9001'
     serviceAccountName: dashboard

   ---

   apiVersion: 'v1'
   kind: 'Service'
   metadata:
     name: 'dashboard-service-load-balancer'
     namespace: 'default'
     labels:
       app: 'dashboard'
   spec:
     ports:
       - protocol: 'TCP'
         port: 80
         targetPort: 9002
     selector:
       app: 'dashboard'
     type: 'LoadBalancer'
     loadBalancerIP: ''
   ```

3. Deploy both services
   ```
   kubectl create -f counting.yaml -f dashboard.yaml
   ```
4. Access dashboard service
   ```
   kubectl port-forward dashboard 9002:9002
   ```

### Secure service communication with intentions

- Consul service mesh secure service-to-service communication with authorization and encryption.

**Create intention that deny communication**

1. Access consul server
   ```
   kubectl exec -it hashicorp/hashicorp-consul-server-0 /bin/sh
   ```
2. Create intention
   ```
   consul intention create -deny dashboard counting
   ```
3. Delete intention
   ```
   consul intention delete dashboard counting
   ```

### Rolling update

Use `helm upgrade` to increase agents, enable additional features, and upgrade consul version.

1. Update `consul-values.yaml`

   ```
   syncCatalog:
     enabled: true
   ```

   The **catalog sync** feature allows Consul to discover services deployed in Kubernetes, without an operator creating Consul registration files. With catalog sync and Connect inject enabled, you will no longer need to manually register services when they are hosted on a Kubernetes node.

2) Initiate upgrade of new values file
   ```
   helm upgrade hashicorp hashicorp/consul -f consul-values.yaml
   ```
