## [Enforce a Zero-trust Network with Consul Service Mesh](https://learn.hashicorp.com/tutorials/consul/service-mesh-zero-trust-network?in=consul/gs-consul-service-mesh)

- Before microservices, authorization was defined with firewall rules and routing tables.
- Consul simplifies the definition for communication rules between services with intentions.
- Intentions define service-to-service communication permission by service name.

**Guide**

1. Access `pod/hashicorp-consul-server-0`
   ```
   kubectl exec -it pod/hashicorp-consul-server-0 /bin/sh
   ```
2. Change allow-all approach to deny-all approach
   ```
   consul intention create -deny "*" "*"
   ```
3. Check intention

   ```
   consul intention check web api

   # response
   Denied
   ```

4. Permit service communication with intentions
   ```
   consul intention create -allow web api
   ```
5. Check intention

   ```
   consul intention check web api

   # response
   Allowed
   ```

### Anatomy of an intention

Intentions control which services can communicate with each another and are enforced by the sidecar proxy on inbound connections. The identity of the inbound service is verified by its TLS client certificate. The sidecar proxy then checks if an intention exists that authorizes the inbound service to communicate with the destination service. If the inbound service is not authorized, the connection will be terminated.

An intention has four parts:

- **Source service**. Defines the service that initiates the communication. It can be the full name of a service or `*` to refer to all services.
- **Destination service**. Defines the service that receives the communication, this will be the upstream you configured in your service definition. It can be the full name of a service or `*` to refer to all services.
- **Permission**. Defines whether the communication between source and destination is permitted. This can be set to either `allow` or `deny`.
- **Description**. Optional component to associate a description to the intention.
