# [Deployment Guide](https://learn.hashicorp.com/tutorials/consul/deployment-guide)

## Installation

1. Install consul

   ```
   brew install consul
   ```

2. Verify the installation
   ```
   consul
   ```

## [Prepare the security credentials](https://learn.hashicorp.com/tutorials/consul/deployment-guide#prepare-the-security-credentials)

The encryption key and certificates needed to secure your Consul agents.

### Generate the gossip encryption key

**Gossip is encrypted with a symmetric key**, since **gossip between nodes is done over UDP**. All agents must have the same encryption key.

1. Create encryption key via Consul CLI

   ```
   consul keygen

   # example response
   hPoiyVNm1Xn5kd56p8+D1p9nqBfyiR05Kse9g8lMLj8=
   ```

You will need to add the newly generated key to the `encrypt` option in the server configuration on all Consul agents. **Save your key in safe location.** You will need to reference the key throughout the installation.

### Generate TLS certificates for RPC encryption

**Consul can use TLS to verify the authenticity of servers and clients**. To enable TLS, Consul requires that all agents have certificates signed by a single Certificate Authority (CA).

### Create the Certificate Authority

Start by creating the CA on you admin instance, using Consul CLI.

```
consul tls ca create
```

### Create the certificates

Create a set of certificates, one for each Consul agent. A name is required to select your primary datacenter, so that certificates are named properly.

First, for Consul servers, use the following command to create a certificate for each server. The file name increments automatically.

```
consul tls cert create -server -dc <dc_name>
```

Use the following comand with the `-client` flag to create client cert. The file name increments automatically.

```
consul tls cert create -client -dc <dc_name>
```

### Distribute the certificates to agents

Distribute the CA certificate, `consul-agent-ca.pem`, to each of the Consul agents as well as the agent specific certificate and private key.

Below is an [SCP](https://www.geeksforgeeks.org/scp-command-in-linux-with-examples/) example which will send the CA certificate, agent certificate and private key to the IP address you specify, and put it into `/etc/consul.d` directory.

```
scp consul-agent-ca.pem dc1-server-consul-0.pem dc1-server-consul-0-key.pem <USER>:<PUBLIC_IP>:/etc/consul.d/
```

## [Configure Consul agents](https://learn.hashicorp.com/tutorials/consul/deployment-guide#configure-consul-agents)

**Consul uses documented reasonable defaults** so only non-default values must be set in the configuration file. Configuration can be read from multiple files and is loaded in lexical order.

Consul server agents typically require a superset of configuration required by Consul client agents. You will specify common configuration used by all Consul agents in `consul.hcl` and server specific configuration in `server.hcl`.

1. Create a configuration file at `/etc/consul.d/consul.hcl`

   ```
   sudo mkdir --parents /etc/consul.d
   sudo touch /etc/consul.d/consul.hcl
   sudo chown --recursive consul:consul /etc/consul.d/
   sudo chown 640 /etc/consul.d/consul.hcl
   ```

2. Add configuration to the `consul.hcl` configuration file
   ```
   datacenter = "dc1"
   data_dir = "/opt/consul"
   encrypt = "qDOPBEr+/oUVeOFQOnVypxwDaHzLrD+lvjo5vCEBbZ0="
   ca_file = "/etc/consul.d/consul-agent-ca.pem"
   cert_file = "/etc/consul.d/dc1-server-consul-0.pem"
   key_file = "/etc/consul.d/dc1-server-consul-0-key.pem"
   verify_incoming = true
   verify_outgoing = true
   verify_server_hostname = true
   ```
   - `datacenter` - The datacenter in which the agent is running.
   - `datadir` - The data directory for the agent to store state.
   - `encrypt` - Specifies the gossip encrption key to use for Consul network traffic.
   - `ca_file` - Specifies the path to the CA public certificate file.
   - `cert_file` - Specifies the path to the agents public certificate file.
   - `key_file` - Specifies the path to the agents certificate private key file.
   - `verify_incoming` - If set to true, Consul requires all incoming connections to use TLS.
   - `verify_outgoing` - If set to true, Consul requires all outgoing connections to use TLS.
   - `verify_server_hostname` - If set to true, Consul verifies for all outgoing TLS connections that the TLS certificate presented by the servers matches `server.<datacenter>.<domain>` hostname.

### Datacenter auto-join

The `retry_join` parameter allows you to configure all Consul agents to automatically form a datacenter using a common Consul server accessed via DNS address, IP address or using Coud Auto-join.

Add the `retry_join` parameter to the `consul.hcl` configuration file:

```
retry_join = ["172.16.0.11"]
```

- `retry_join` - Address of another angent to join upon starting up

> The `join` or `retry_join` is a required parameter for the systemd process to complete successfully and send its notify signal on LAN join.

### Enable Consul ACLs

Consul uses Access Control Lists (ACLs) to secure the UI, API, CLI, and Consul catalog including service and agent registration. When securing your datacenter you should configure the ACLs first.

Add the ACL configuration to the `consul.hcl` configuration file and choose a default policy of "allow" (allow all traffic unless explicitly denied) or "deny" (deny all traffic unless explicitly allowed).

```
acl = {
    enabled = true
    default_policy = "allow"
    enable_token_persistence = true
}
```

- `acl` - ACL stanza
- `enabled` - Enables ACLs
- `default_policy` - The default policy controls the behavior of a token when there is no matching rule.
- `enable_token_persistence` - When `true` tokens set using the API will be persisted to disk and reloaded when an agent restarts.

### Performance stanza

The `performance` stanza allows tuning the performance of different subsystems in Consul.

Add the performance configuration to the `consul.hcl` configuration file:

```
performance {
    raft_multiplier = 1
}
```

- `raft_multiplier` - An integer multiplier used by Consul servers to scale key Raft timing parameters. Settings this to a value of 1 will configure Raft to its highest-performance mode, equivalent to the default timing of Consul prior to 0.7, and is recommended for production Consul servers.The default policy controls the behavior of a token when there is no matching rule.

### Telemetry stanza

The `telemetry` stanza specifies various configurations for Consul to publish metrics to upstream systems.

### Audit

> **Enterprise Only:** The audit functionality described here is available only in **Consul Enterprise** with the Governance and Policy module.

> **WARNING** ACLs must be enabled to use this feature.

The `audit` stanza allows users to enable auditing and configure a sink and filters for their audit logs.

```
audit {
    enabled = true
    sink "My sink" {
        type = "file"
        format = "json"
        path = "data/audit/audit.json"
        delivery_guarantee = "best-effort"
        rotate_duration = "24h"
        rotate_max_files= 15
        rotate_bytes = 25165824
    }
}
```

### Consul server configuration

1. Create a configuration file at `/etc/consul.d/server.hcl`

   ```
   sudo touch /etc/consul.d/server.hcl
   sudo chown --recursive consul:consul /etc/consul.d
   sudo chown 640 /etc/consul.d/server.hcl
   ```

2. Add configuration to the `server.hcl` configuration file
   ```
   server = true
   bootstrap_expect = 3
   ```
   - `server` - This flag is used to control if an agent is in server or client mode.
   - `bootstrap_expect` - This flag provides the number of expected servers in the datacenter. Either this value should not be provided or the value should be consistent across all servers in the datacenter.

### Consul UI

Consul features a web-based user interface, allowing you to easily view all services, nodes, intentions and more using a graphical user interface, rather than the CLI or API.

> **NOTE** You should consider running the Consul UI on selected Consul hosts rather than all hosts.

> **INFO** By default the UI binds to the `client_addr` which is `127.0.0.1`.

Optionally, add the UI configuration to the `server.hcl` configuration file to enable the Consul UI:

```
ui = true
client_addr = "0.0.0.0"
```

- `ui` - Enables the build-in web UI.
- `client_addr` - The address to which Consul wil bind client interfaces, including the HTTP and DNS servers. By default, this is "127.0.0.1", allowing only loopback connections.

### Configure client configuration

Consul client agents typically require a subset of configuration required by Consul server agents. All Consul clients can use the `consul.hcl` file created earlier in the [configuring the Consul agents section](https://learn.hashicorp.com/tutorials/consul/deployment-guide#configure-consul-agents). If you have added host-specific configuration such as identifiers, you will need to set these individually.

## [Configure the Consul process](https://learn.hashicorp.com/tutorials/consul/deployment-guide#configure-the-consul-process)

### Configure systemd

Systemd uses documented reasonable defaults so only non-default values must be set in the configuration file.

1. Create a Consul service file at `/usr/lib/systemd/consul.service`

   ```
   sudo touch /usr/lib/systemd/consul.service
   ```

2. Add configuration to the Consul service file

   ```
   [Unit]
   Description="HashiCorp Consul - A service mesh solution"
   Documentation=https://www.consul.io/
   Requires=network-online.target
   After=network-online.target
   ConditionFileNotEmpty=/etc/consul.d/consul.hcl

   [Service]
   Type=notify
   User=consul
   Group=consul
   ExecStart=/usr/bin/consul agent -config-dir=/etc/consul.d/
   ExecReload=/usr/bin/consul reload
   ExecStop=/usr/bin/consul leave
   KillMode=process
   Restart=on-failure
   LimitNOFILE=65536

   [Install]
   WantedBy=multi-user.target
   ```

   The following are set for the `[Unit]` stanza:

   - `Description` - Free-form string describing the consul service.
   - `Documentation` - Link to the consul documentation
   - `Requires` - Configure a requirement dependency on the network service.
   - `After` - Configure an ordering dependency on the network service being started before the consul service.
   - `ConditionFileNotEmpty` - Check for a non-zero sized configuration file before consul is started.

   The following are set for the `[Service]` stanza:

   - `Type` - Set to notify so systemd will not attempt to start any dependent services until after Consul sends the notify signal.
   - `User, Group` - Run Consul as the consul user.
   - `ExecStart` - Start Consul with the `agent` argument and path to the configuration file.
   - `ExecReload` - Send Consul a reload signal to trigger a configuration reload in Consul.
   - `ExecStop` - Stop Consul with the `leave` argument to allow for a graceful leave from the datacenter.
   - `KillMode` - Treat consul as a single process.
   - `Restart` - Restart consul unless it returned a clean exit code.
   - `LimitNOFILE` - Set an increased limit for file descriptors.

   The following are set for the `[Install]` stanza:

   - `WantedBy` - Creates a weak dependency on Consul being started by the multi-user run level.

## [Start the Consul service](https://learn.hashicorp.com/tutorials/consul/deployment-guide#start-the-consul-service)

1. Check that your configuration is valid.

   ```
   consul validate /etc/consul.d/consul.hcl
   ```

2. Enable and start Consul using the systemctl command responsible for controlling systemd managed services. Check tyhe status of the consul service using systemctl.
   ```
   sudo systemctl enable consul
   sudo systemctl start consul
   sudo systemctl status consul
   ```

### Setup Consul environment variables

Notice that since TLS encryption is enabled, you will now need to use the server certificates to complete all other tasks.

1. To make it easier to use the CLI for the remainder of the setup, and to complete the ACL bootstrapping process, set the following environment variables for all your agents.
   ```
   export CONSUL_CACERT=/etc/consu.d/consul-agent-ca.pem
   export CONSUL_CLIENT_CERT=/etc/consu.d/dc1-server-consul-0.pem
   export CONSUL_CLIENT_KEY=/etc/consu.d/dc1-server-consul-0-key.pem
   ```

## [Bootstrap the ACL system](https://learn.hashicorp.com/tutorials/consul/deployment-guide#bootstrap-the-acl-system)

The below guidance assumes Consul has already been started without ACLs configured.

### Create the initial bootstrap token

1. Working from one agent generate the Consul bootstrap token, which has unrestricted privileges.

   ```
   consul acl bootstrap
   ```

   This will return the Consul bootstrap token. You will need the SecretID for all subsequent Consul API requests (including CLI and UI). Ensure that you save the SecretID.

2. Set `CONSUL_MGMT_TOKEN` env variable.

   ```
   export CONSUL_HTTP_TOKEN="<Token SecretID from previous step>"
   export CONSUL_MGMT_TOKEN="<Token SecretID from previous step>"
   ```

3. Create a node policy (`node-policy.hcl`) with write access for nodes related actions and read access for service related actions.

   ```
   agent_prefix "" {
     policy = "write"
   }
   node_prefix "" {
     policy = "write"
   }
   service_prefix "" {
     policy = "read"
   }
   session_prefix "" {
     policy = "read"
   }
   ```

4. Generate the Consul node ACL policy with the newly created policy file.

   ```
   consul acl policy create -token=${CONSUL_MGMT_TOKEN} -name node-policy -rules @node-policy.hcl
   ```

5. Create the node token with the newly created policy.

   ```
   consul acl token create -token=${CONSUL_MGMT_TOKEN} -description "node token" -policy-name node-policy
   ```

6. On all Consul Servers add the node token.
   ```
   consul acl set-agent-token -token="<Management Token SecretID>" agent "<Node Token SecretID>"
   ```

## Apply Enterprise license

The is a time limit Consul will function without applying a license on Consul Enterprise.

1. Ensure you are using an Enterprise binary.

   ```
   consul version
   ```

   Consul Enterprise version will end with `+ent`

   ```
   Consul v1.7.2+ent
   ...
   ```

   > **NOTE** You will have a limited amount of time to apply commands once enterprise binaries are up and running. Currently 6 hours before Consul will shut down.

2. Run the following command on the Consul leader.
   ```
   consul license put "<paste license text here>"
   ```
   Once the command runs successfully, the output should indicate that the license is valid. The license will be replicated to other the Consul servers from the leader.
