# [Deploy consul service mesh in kubernetes](https://learn.hashicorp.com/tutorials/consul/service-mesh-deploy?in=consul/gs-consul-service-mesh)

1. start minikube

   ```
   minikube start --memory 4096
   ```

2. HELM install hashicorp consul

   ```
   # command to install
   helm install hashicorp hashicorp/consul -f consul-values.yml
   ```

   ```
   # consul configurations - consul-values.yaml
   global:
     domain: consul
     datacenter: hashidc1
     image: 'consul:1.7.0'

   server:
     replicas: 1
     bootstrapExpect: 1
     storage: 64Mi
     storageClass: local-path

   client:
     enabled: true
     grpc: true

   ui:
     enabled: true

   connectInject:
     enabled: true
     imageEnvoy: envoyproxy/envoy:v1.13.1
   ```

3. Create persistent volume for pod/consul-server-0 (troubleshoot for status pod/consul-server stuck at pending status)

   ```
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: consul-server-0
     labels:
       type: local
   spec:
     storageClassName: local-path
     capacity:
       storage: 5Gi
     accessModes:
       - ReadWriteOnce
     hostPath:
       path: "/mnt/data"
   ```

4. Forward consul-ui port
   ```
   kubectl port-forward service/hashicorp-consul-ui 18500:80 --address 0.0.0.0
   ```
5. access localhost
   ```
   http://localhost:1850
   ```
6. interact with consul datacenter directly on local machine

   ```
   # export env to consul-ui
   export CONSUL_HTTP_ADDR="http://localhost:18500"

   # test
   consul members
   ```
