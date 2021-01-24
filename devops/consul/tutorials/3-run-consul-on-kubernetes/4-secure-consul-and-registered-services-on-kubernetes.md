# [Secure consul and registered services on kubernetes](https://learn.hashicorp.com/tutorials/consul/kubernetes-secure-agents?in=consul/kubernetes)

When operating on pre-production environment, it's common to initialize an environment without security feature enabled.

### Prerequisite

- helm
- kubectl
- Consul-helm

### Types of consul service mesh traffic

The diagram depicts the conceptual model of an active consul service mesh on kubernetes

![k8s-consul-simple](https://learn.hashicorp.com/img/consul/k8s-consul-simple.png)

- Consul uses a `gossip protocol` to manage membership and broadcast messages to the service mesh
- Consul uses the **remote procedure call** (`RPC`) pattern for communication between client and server nodes. Each server provides an HTTP API that supports read and write operations on the catalog which tracks the status of the nodes, services, and other state information.
- Consul uses ACL to secure the UI, API, CLI, service communications, and agent communications. At the core, ACL operate by grouping rules into policies, then asoociate one or more policies with a token.
- Consul uses `intentions` to control which services may establlish connections. Intentions can be managed via the API, CLI, or UI.

**How**

1. Download helm repo

   ```
   helm add repo hashicorp http://helm.releases.hashicorp.com
   ```

2. Create an unsecured config file `dc1.yaml`

   ```
   global:
     name: consul
     enabled: true
     datacenter: dc1

   server:
     replicas: 1
     bootstrapExpect: 1

   connectInject:
     enabled: true
   ```

3. Apply the chart
   ```
   helm install tutorial hashicorp/consul -f dc1.yaml --wait
   ```
4. Verify installation
   ```
   watch kubectl get pods
   ```

At this point, the Consul service mesh has been installed in the Kubernetes cluster, but no security features have been enabled. This means that:

- All gossip traffic between agents is in clear text
- All RPC communications between agents is in clear text
- There are no Access Controls in place
- No intentions have been defined

### Verify security not enabled

To verify that network traffic is in cleartext inspect it

**View service traffic**

1. Connect to consul server container
   ```
   kubetctl exec -it pod/consul-server-0 /bin/sh
   ```
2. Install `tcpdump`
   ```
   apk update && apk add tcpdump
   ```
3. Start `tcpdump` to view traffic to the server container on terminal output

   ```
   tcpdump -an portrange 8300-8700 -A
   ```

   Inspect the output and observe that the traffic is in cleartext. Note the UDP operations, these entries are the gossip protocol at work. This proves that gossip encryption is not enabled.

   Next, issue a Consul CLI command to prove two things:

   - RPC traffic is currently unencrypted
   - ACLs are not enabled

4. Write result to log file
   ```
   tcpdump -an portrange 8300-8700 -A > /tmp/tcpdump.log
   ```
5. Generate consul traffic in different terminal

   ```
   kubectl exec $(kubectl get pods -l component=client -o jsonpath='{.items[0].metadata.name}') -- consul catalog services
   ```

   Note. The command succeeds, but notice that you did not pass a `-token` option nor did you set the `CONSUL_HTTP_TOKEN` environment variable. One or the other is required when ACLs are enabled. **This proves that ACLs are not enabled.**

6. Search the log file for the CLI operation with the following command:
   ```
   grep 'ServiceMethod' /tmp/tcpdump.log
   ```
   Note. you are able to see the RPC operation in cleartext. **This proves that RPC traffic is not encrypted.**

### Upgrade to a secured consul service mesh

Upgrade consul service mesh to enable gossip encryption, TLS, and ACLs.

1.  Create secrure config `secure-dc1.yaml`

    ```
    global:
      name: consul
      enabled: true
      datacenter: dc1

      gossipEncryption:
        # This stanza provides the helm chart with the name
        # of a Kubernetes secret to retrieve
        # and use as the gossip encryption key at runtime.
        # You must create a valid key and register it
        # as a secret with Kubernetes.
        secretName: "consul-gossip-encryption-key"
        secretKey: "key"

      tls:
        enabled: true
        # By enabling TLS and setting `enableAutoEncrypt` to true,
        # the TLS system will configure itself. You
        # do not need to take any action beyond setting these values
        # in the config file.
        enableAutoEncrypt: true
        # The `verify` setting instructs Consul to verify the
        # authenticity of servers and clients.
        verify: true

      acls:
        # By setting `manageSystemACLs` to true, the ACL system
        # will configure itself. You do not need to take any
        # action beyond setting the value in the config file.
        manageSystemACLs: true

    server:
      replicas: 1
      bootstrapExpect: 1

    connectInject:
      enabled: true
    ```

2.  Register a gossip encryption key as a Kubernetes secret that the helm chart can consume.
    ```
    kubectl create secret generic consul-gossip-encryption-key --from-literal=key=$(consul keygen)
    ```
3.  Verify the upgrade

    ```
    watch kubectl get pods
    ```

**Verify security enabled**

1. Forward port 8501 from the consul server on kubernetes

   ```
   kubectl port-forward consul-server-0 8501:8501
   ```

2. Set the `CONSUL_HTTP_ADDR` environment variable to use the HTTPS address/port on the development host.
   ```
   export CONSUL_HTTP_ADDR=https://127.0.0.1:8501
   ```
3. Export the CA file from Kubernetes so that you can pass it to the CLI.
   ```
   kubectl get secret consul-ca-cert -o jsonpath="{.data['tls\.crt']}" | base64 --decode > ca.pem
   ```
4. Execute `consul members` and provide Consul with the ca-file option to verify TLS connections.
   ```
   consul members -ca-file ca.pem
   ```

The actions you performed in this section of the tutorial prove that TLS is being enforced.

### Set an ACL token

1. Launch debug session

   ```
   consul debug -ca-file ca.pem
   ```

   The 403 response proves that ACLs are being enforced. You have not yet supplied an ACL token, so the command fails. The `consul members` command worked because consul-helm created an anonymous token and set the following policy for it:

   ```
   node_prefix "" {
      policy = "read"
   }

   service_prefix "" {
      policy = "read"
   }
   ```

2. View consul acl bootstrap token from `consul-bootstrap-acl-token`.

   ```
   kubectl get secret consul-bootstrap-acl-token -o yaml | more
   ```

   The bootstrap token is a full access token that can perform any operation in the service mesh. In a production scenario, you should avoid using the bootstrap token, and instead create tokens with specific permissions. In this tutorial, you will use it for convenience.

3. Retrieve consul acl bootstrap token value

   ```
   export CONSUL_HTTP_TOKEN=$(kubectl get secrets/consul-bootstrap-acl-token --template={{.data.token}} | base64 -d)
   ```

4. Start debug session again with ACL token set
   ```
   consul debug -ca-file ca.pem
   ```

### Verify that network traffic is encrypted

prove that gossip and all RPC traffic are encrypted

1. Start shell session on server container
   ```
   kubectl exec -it consul-server-0 /bin/sh
   ```
2. Update and add `tcpdump` (container were recycled during helm upgrade)
   ```
   apk update && apk add tcpdump
   ```
3. Start `tcpdump` to observe gossip traffic
   ```
   tcpdump -an portrange 8300-8700 -A
   ```
   Note that none of traffic is in cleartext. **This prove that gossip traffic is now encrypted**
4. Restart `tcpdump` and pipe result to log file
   ```
   tcpdump -an portrange 8300-8700 -A > /tmp/tcpdump.log
   ```
5. List services with consul cli on another terminal
   ```
   kubectl exec $(kubectl get pods -l component=client -o jsonpath='{.items[0].metadata.name}') -- consul catalog services -token $(kubectl get secrets/consul-bootstrap-acl-token --template={{.data.token}} | base64 -d)
   ```
   You should receive following result
   ```
   consul
   ```
6. grep log from RPC entry

   ```
   grep 'ServiceMethod' /tmp/tcpdump.log
   ```

   Notice that no rows were found this time. This proves that RCP traffic is now encrypted.

### Configure Consul intentions

Deploy two services and manage them using intentions

1. Deploy service `server.yaml`

   ```
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     name: static-server

   ---

   apiVersion: v1
   kind: Pod
   metadata:
     name: static-server
     annotations:
       "consul.hashicorp.com/connect-inject": "true"
   spec:
     containers:
       - name: static-server
         image: hashicorp/http-echo:latest
         args:
           - -text="hello world"
           - -listen=:8080
         ports:
           - containerPort: 8080
             name: http
     serviceAccountName: static-server
   ```

2. Deploy service `client.yaml`

   ```
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     name: static-client

   ---

   apiVersion: v1
   kind: Pod
   metadata:
     name: static-client
     annotations:
       "consul.hashicorp.com/connect-inject": "true"
       "consul.hashicorp.com/connect-service-upstreams": "static-server:1234"
   spec:
     containers:
       - name: static-client
         image: tutum/curl:latest
         command: [ "/bin/sh", "-c", "--" ]
         args: [ "while true; do sleep 30; done;" ]
     serviceAccountName: static-client
   ```

3. Issue command to validate that the default `deny all` intention is enforced

   ```
   kubectl exec static-client -c static-client -- curl -s http://127.0.0.1:1234/
   ```

   With `manageSystemACLs` set to true, consul will by default create `deny all` intention. This mean services will not be able to communicate until the explicit intention that allow them to communicate.
   The command exits with a non-zero exit code. **This proved the intention is enforced**

4. Create an `allow` intention for client to server traffic

   ```
   consul intention create -ca-file ca.pem -allow static-client static-server
   ```

5. Validate the intention allow traffic from client to server
   ```
   kubectl exec static-client -c static-client -- curl -s http://127.0.0.1:1234/
   ```
   Notice the output stated "hello world". **This proves the intention is allowing traffic from the client to the server.**
