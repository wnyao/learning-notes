# [Secure Applications with Service Sidecar Proxies](https://learn.hashicorp.com/tutorials/consul/service-mesh-application-secure-networking?in=consul/gs-consul-service-mesh)

- Consul service mesh let you deploy applications into zero-trust network
- Zero-trust network is network where nothing is trusted automatically; all connections must be verify and authorized
- In this example, the `web` frontend service depends on the `api` backend service to operate properly.
  - The `web` frontend service is downstream from the `api` service.
  - The `api` service is upstream from the `api` service.

**Guide**

1. Define api deployment
   ```
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: api-deployment-v1
     labels:
       app: api-v1
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: api-v1
     template:
       metadata:
         labels:
           app: api-v1
         annotations:
           'consul.hashicorp.com/connect-inject': 'true'
       spec:
         containers:
           - name: api
             image: nicholasjackson/fake-service:v0.7.8
             ports:
               - containerPort: 9090
             env:
               - name: 'LISTEN_ADDR'
                 value: '127.0.0.1:9090'
               - name: 'NAME'
                 value: 'api-v1'
               - name: 'MESSAGE'
                 value: 'Response from API v1'
   ```
2. Define web deployment

   ```
   ---
   # Web frontend

   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: web-deployment
     labels:
       app: web
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: web
     template:
       metadata:
         labels:
           app: web
         annotations:
           'consul.hashicorp.com/connect-inject': 'true'
           'consul.hashicorp.com/connect-service-upstreams': 'api:9091' # explicitly declaring upstream of web service
       spec:
         containers:
           - name: web
             image: nicholasjackson/fake-service:v0.7.8
             ports:
               - containerPort: 9090
             env:
               - name: 'LISTEN_ADDR'
                 value: '0.0.0.0:9090'
               - name: 'UPSTREAM_URIS'
                 value: 'http://localhost:9091'
               - name: 'NAME'
                 value: 'web'
               - name: 'MESSAGE'
                 value: 'Hello World'

   ---
   # Service to expose web frontend

   apiVersion: v1
   kind: Service
   metadata:
     name: web
   spec:
     selector:
       app: web
     ports:
       - name: http
         protocol: TCP
         port: 9090
         targetPort: 9090
   ```

   Using the format `name:addr`, such as `api:9091` will make the api service available on `localhost:9091` in the web service pod. When the web service makes a request to `localhost:9091`, the sidecar proxy will establish a secure mTLS connection with the api service and forward the request.

   ### Understand the upstream concept

   In this example, the web frontend service depends on the api backend service to operate properly. You can define this by stating that:

   - The web frontend service is downstream from the api service.
   - The api service is upstream from the web service.

3. Deploy thes services
   ```
   k apply -f web.yml -f api.yml
   ```
4. Access the services via port forward
   ```
   kubectl port-forward service/web 9090:9090 --address 0.0.0.0
   ```
