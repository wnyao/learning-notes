# [Observe Layer 7 Traffic with Consul Service Mesh](Observe Layer 7 Traffic with Consul Service Mesh)

- Once deployed, Consul service mesh becomes control plane
- Consul includes its own built-in L4 proxy for testing and development with Consul; useful for testing configurations and checking mTLS or intentions but doesn't have L7 capabilities necessary for observability features.
- Consul service mesh has first class support for Envoy as a proxy. Consul can configure Envoy sidecars to proxy http/1.1, http2, or gRPC traffic at L7 or any other TCP-based protocol at L4.

### Understand L7 traffic management

Consul service mesh provides 3 stages traffic management approach. This approach helps carve up a single data center pools of services beyond simply returning all healthy instances for load balancing and it gives you a fine granularity than the level of single service when deciding that a specific subset of service should receive traffic.

Proxy upstreams are discovered using series of stages:

- routing
- splitting
- resolution

These stages represent different ways of managing L7 traffic. Each stage of this discovery process can be dynamically reconfigured via various configuration entries. When a configuration entry is missing, that stage will fall back on default behavior.

#### Routing

Routing is the first step of traffic management and allows the interception of traffic using L7 criteria such as path prefixes or http headers, and changes behavior by sending traffic to a different service or service subset.

A `service-router` configuration entry kind may only reference `service-splitter` or `service-resolver` entries.

#### Splitting

A splitter configuration entry allows for a user to choose to split incoming requests across different subsets of a single service (like during staged canary rollouts), or perhaps across different services (like during a v2 rewrite or other type of codebase migration).

A service-splitter configuration may only reference other service-splitter or a service-resolver entry.

#### Resolution

A resolver configuration entry allows for a user to define which instances of a service should satisfy discovery requests for the provided name.

These configuration entries may only reference other `service-resolver` entries. Examples of things you can do with resolver configuration entries:

- Control where to send traffic if all instances of api service in the current datacenter are unhealthy.
- Configure service subsets based on Service.Meta.version values.
- Send all traffic for web that does not specify a service subset to the version1 subset.
- Send all traffic for api to new-api.
- Send all traffic for api in all datacenters to instances of api in dc2.
- Create a "virtual service" api-dc2 that sends traffic to instances of api in dc2. This can be referenced in upstreams or in other configuration entries.
- If no resolver configuration is defined for a service it is assumed 100% of traffic flows to the healthy instances of a service with the same name in the current datacenter/namespace and discovery terminates.

> Note: `service-resolver` configuration entries kinds function at L4 (unlike `service-router` and `service-splitter` kinds). These can be created for services of any protocol such as tcp.

#### Create service defaults with central configuration

Depending on the stage of your cloud journey you might need different control over both observability and traffic management.

Configuration entries for both can be created to provide cluster-wide defaults for various aspects of your service mesh. When the agent is configured to enable central service configurations, it will look for service configuration defaults that match a registering service instance. If it finds any, the agent will merge those defaults with the service instance configuration. This allows for things like service protocol or proxy configuration to be defined globally and inherited by any affected service registrations.
