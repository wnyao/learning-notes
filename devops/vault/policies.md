# Policies

- Everythig in Vault is path based.
- Policies provide a declarative way to grant or forbid access to certain paths and operations in Vault.
- Policies are deny by default, an empty policy grants no permission in the system.

### Policy-Authorization Workflow

- Before a human or machine can gain access, an administrator must configure Vault with an auth method.

The following diagram illustrates steps a security team would take to configure Vault to authenticate using a corporate LDAP or ActiveDirectory installation. The concept applies to all auth methods.

![Policy Authorization Workflow](https://www.vaultproject.io/img/vault-policy-workflow.svg)

1. The security team configures Vault to connect to an auth method. Configurations varies by auth method. In case of LDAP, Vault needs to know the address of LDAP server and whether to connect using TLS. Vault does not store a copy of the LDAP database - Vault will delegate the authentication to the auth method.

2. The security team authors a policy (or uses an existing policy) which grants access to paths in Vault. Policies are written in HCL and save to disk.

3. The policy's contents are uploaded and stored in Vault and referenced by name. The policy's name is as a pointer or symlink to its set of rules.

4. The security team maps data in the auth method to a policy. For examle, security team might create mappings like:

   > Members of the OU group "dev" map to the Vault policy named "readonly-dev"

   or

   > Members of the OU group "ops" map to the Vault policies "admin" and "auditor"

Now vault has an internal mapping between a backend authentication system and internal policy. When user authenticates to Vault, the actual authentication is delegated to the auth method. As user, the flow looks like

![Vault Auth Workflow](https://www.vaultproject.io/img/vault-auth-workflow.svg)

1. User authenticate to Vault using LDAP credentials, providing Vault with username and password.

2. Vault establishes connection to LDAP and asks the LDAP server to verify the credentials. Assuming successful, the LDAP server returns the information about the user, including the OU groups.

3. Vault maps the result from LDAP server to policies inside Vault using the mapping configured by the security team. Vault then generates a token and attaches the matching policies.

4. Vault returns token to the user. This token has the correct policies assigned, as dictated by the mapping configuration that was setup by the security team in advance.

The user then uses the Vault token for future operations. If user performs authentication steps again, they will get new token. The token will have the same permissions, but different. Authenticating second time does not invalidate original token.

### Policy Syntax

- Policies are written in HCL or JSON and describe paths in Vault a user or machine is allowed to access.

Here is a policy which grants read capabilities to path `"secret/foo"`:

```hcl
path "secret/foo" {
    capabilities = ["read"]
}
```

When this policy is assigned to token, token can read from `"secret/foo"` but update or delete, since the capabilities do not allow. Because policies are deny by default.

```hcl
# This section grants all access on "secret/*". Further restrictions can be
# applied to this broad policy, as shown below.
path "secret/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Even though we allowed secret/*, this line explicitly denies
# secret/super-secret. This takes precedence.
path "secret/super-secret" {
  capabilities = ["deny"]
}

# Policies can also specify allowed, disallowed, and required parameters. Here
# the key "secret/restricted" can only contain "foo" (any value) and "bar" (one
# of "zip" or "zap").
path "secret/restricted" {
  capabilities = ["create"]
  allowed_parameters = {
    "foo" = []
    "bar" = ["zip", "zap"]
  }
}
```

Policies use path-based matching to test the set of capabilities against a request. A policy `path` may specify an exact path to match, or it could specify a glob patten which intructs Vault to use a prefix match:

```hcl
# Permit reading only "secret/foo". An attached token cannot read "secret/food"
# or "secret/foo/bar".
path "secret/foo" {
  capabilities = ["read"]
}

# Permit reading everything under "secret/bar". An attached token could read
# "secret/bar/zip", "secret/bar/zip/zap", but not "secret/bars/zip".
path "secret/bar/*" {
  capabilities = ["read"]
}

# Permit reading everything prefixed with "zip-". An attached token could read
# "secret/zip-zap" or "secret/zip-zap/zong", but not "secret/zip/zap
path "secret/zip-*" {
  capabilities = ["read"]
}
```

A `+` can be used to denote any number of characters bounded within a single path segment:

```hcl
# Permit reading the "teamb" path under any top-level path under secret/
path "secret/+/teamb" {
  capabilities = ["read"]
}

# Permit reading secret/foo/bar/teamb, secret/bar/foo/teamb, etc.
path "secret/+/+/teamb" {
  capabilities = ["read"]
}
```

- Vaults's architecture is similar to a filesystem.
- Vault's internal core configuration endpoints live under the `"sys/"` path.
- Policies define access to these paths and capabilities, which controls token's access to credentials in Vault.
- Policy rules applies are determined by most-specific match available, using priority rules.
- If the same pattern appears in multiple policies, we take union of the capabilities.
- If different patterns appear in the applicable policies, we take only the highest-priority match from those policies.

When there are potentially multiple matching policy paths, `P1` and `P2`, following criteria applied:

1. If the first wildcard `+` or glob `*` occurs earlier in `P1`, `P1` is lower priority.

2. If `P1` ends in `*` and `P2` doesn't, `P1` is lower priority.

3. If `P1` has more `+` (wildcard) segments, `P1` is lower priority.

4. If `P1` is shorter, it is lower priority.

5. If `P1` is smaller lexicographically, it is lower priority.

#### Capabilities

- Each path must define one or more capabilities which provide fine-grained control over permitted (or denied) operations.
- Capabilities are always specified as list of strings.

The capabilities are:

- `create` (`POST/PUT`) - Allows creating data at given path.
- `read` (`GET`) - Allows reading data at given path.
- `update` (`POST/PUT`) - Allows changing data at given path. In most parts of Vault, this implicitly includes the ability to create initial value at the path.
- `delete` (`DELETE`) - Allows deleting the data at given path.
- `list` (`LIST`) - Allows listing values at given path.
- `sudo` - Allows access to paths that are root-protected. For example, modifying the audit log backends requires token with `sudo` privileges.
- `deny` - Disallows access. This always takes precedence regardless any other defined capabilities, including `sudo`.

Note that capabilities map to the HTTP verb, not the underlying action taken. Generating credentials creates credentials, but the HTTP request is a GET which corresponds to a `read` capabilities.

### Templated Policies

- Policy syntax allows for variable replacement in some policy strings with values available to the token.
- Currently `identity` information can be injected, and `path` keys in policies allow injection.

#### Parameters

| Name                                                              | Description                                                             |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `identity.entity.id`                                              | The entity's ID                                                         |
| `identity.entity.name`                                            | The entity's name                                                       |
| `identity.entity.metadata.<metadata key>`                         | Metadata associated with the entity for the given key                   |
| `identity.entity.aliases.<mount accessor>.id`                     | Entity alias ID for the given mount                                     |
| `identity.entity.aliases.<mount accessor>.name`                   | Entity alias name for the given mount                                   |
| `identity.entity.aliases.<mount accessor>.metadta.<metedata key>` | Metadata associated with the alias for the given mount and metedata key |
| `identity.groups.ids.<group id>.name`                             | The geoup name for the given group ID                                   |
| `identity.groups.ids.names.<group name>.id`                       | The group ID for the given group name                                   |
| `identity.groups.ids.<group id>.metedata.<metadata key>`          | Metadata associated with the group for the given key                    |
| `identity.groups.names.<group name>.metedata.<metadata key>`      | Metadata associated with the group for the given key                    |

##### Example

Following policy creates a section of the KVv2 Secret Engine to a specific user

```hcl
path "secret/data/{{identity.entity.id}}/*" {
    capabilities = ["create", "update", "read", "delete"]
}

path "secret/metadata/{{identity.entity.id}}/*" {
    capabilities = ["list"]
}
```

If you wanted to create a shared section of KV that is associated with entities that are in a group.

```
# In the example below, the group ID maps a group and the path
path "secret/data/groups/{{identity.groups.ids.fb036ebc-2f62-4124-9503-42aa7A869741.name}}/*" {
  capabilities = ["create", "update", "read", "delete"]
}

path "secret/metadata/groups/{{identity.groups.ids.fb036ebc-2f62-4124-9503-42aa7A869741.name}}/*" {
  capabilities = ["list"]
}
```

If you want to use the metadata associated with an authentication plugin in templates, you will need to get its mount accessor and access it via `aliases` key.

You can ghet mount accessor value using the following command:

```hcl
$ vault auth list

Path           Type          Accessor                    Description
----           ----          --------                    -----------
kubernetes/    kubernetes    auth_kubernetes_xxxx        n/a
token/         token         auth_token_yyyy             token based credentials
```

The following templated policy allow to read the path associated with kubernetes service account namespace of the identity:

```hcl
path "secrets/data/{{identity.entity.aliases.auth_kubernetes_xxxx.metadata.service_account_namespace}}/*" {
  capabilities = ["read"]
}
```

### Fine-Grained Control

- The capabilities associated with a path take precedence over permissions on parameters.

#### Parameter Constraints

- Data is represented as `key=value` pairs.
- Vault policies can optionally further restrict paths based on keys and data at those keys when evaluating the permission for path.

The optional finer-grained control options are:

- `required_parameters` - A list of parameters that must be specified.

  ```hcl
  # This requires the user to create "secret/foo" with a parameter named
  # "bar" and "baz".
  path "secret/foo" {
      capabilities = ["create"]
      required_parameters = ["bar", "baz"]
  }
  ```

- `allowed_parameters` - Whitelists a list of keys and values that are permitted on given path.

  Setting a parameter with a value of the empty list allows the parameter to contain any value.

  ```hcl
  # This allows the user to create "secret/foo" with a parameter named
  # "bar". It cannot contain any other parameters, but "bar" can contain
  # any value.
  path "secret/foo" {
    capabilities = ["create"]
    allowed_parameters = {
      "bar" = []
    }
  }
  ```

  Setting a parameter with a value of populated list allows parameter to contain only those values.

  ```hcl
  # This allows the user to create "secret/foo" with a parameter named
  # "bar". It cannot contain any other parameters, and "bar" can only
  # contain the values "zip" or "zap".
  path "secret/foo" {
    capabilities = ["create"]
    allowed_parameters = {
      "bar" = ["zip", "zap"]
    }
  }
  ```

  If any keys are specified, all non-specified parameters will be denied unless the parameter `"*"` is set to an empty array. Parameters with specific values will still be restricted to those values.

  ```hcl
  # This allows the user to create "secret/foo" with a parameter named
  # "bar". The parameter "bar" can only contain the values "zip" or "zap",
  # but any other parameters may be created with any value.
  path "secret/foo" {
    capabilities = ["create"]
    allowed_parameters = {
      "bar" = ["zip", "zap"]
      "*"   = []
    }
  }
  ```

  Use of globbing may result in unexpected behavior.

  ```hcl
  # This allows the user to create or update "secret/foo" with a parameter
  # named "bar". The values passed to parameter "bar" must start with "baz/"
  # so values like "baz/quux" are fine. However, values like
  # "baz/quux,wibble,wobble,wubble" would also be accepted. The API that
  # underlies "secret/foo" might allow comma delimited values for the "bar"
  # parameter, and if it did, specifying a value like
  # "baz/quux,wibble,wobble,wubble" would result in 4 different values getting
  # passed along. Seeing values like "wibble" or "wobble" getting passed to
  # "secret/foo" might surprise someone that expected the allowed_parameters
  # constraint to only allow values starting with "baz/".
  path "secret/foo" {
    capabilities = ["create", "update"]
    allowed_parameters = {
      "bar" = ["baz/*"]
    }
  }
  ```

- `denied_parameters` - Blacklists a list of parameter and values. Any values specified here take precedence over `allowed_parameters`.

  Setting a parameter with a value of empty list denied any changes to that parameter

  ```hcl
  # This allows the user to create "secret/foo" with any parameters not named "bar".
  path "secret/foo" {
    capabilities = ["create"]
    denied_parameters = {
      "bar" = []
    }
  }
  ```

  Setting a parameter with value of populated list denied any parameter containing those values.

  ```
  # This allows the user to create "secret/foo" with a parameter named
  # "bar". It can contain any other parameters, but "bar" cannot contain
  # the values "zip" or "zap".
  path "secret/foo" {
    capabilities = ["create"]
    denied_parameters = {
      "bar" = ["zip", "zap"]
    }
  }
  ```

  Setting to `"*"` will deny all parameter.

  ```
  # This allows the user to create "secret/foo", but it cannot have any parameters.
  path "secret/foo" {
    capabilities = ["create"]
    denied_parameters = {
      "*" = []
    }
  }
  ```

  If any parameters are specified, all non-specified parameters are allowed. unless `allowed_parameters` is also set, in which normal rules apply.

Parameter values also support prefix/suffic globbing, enabled by prepending or appending `*` to the value:

```hcl
# Only allow a parameter named "bar" with a value starting with "foo-*".
path "secret/foo" {
  capabilities = ["create"]
  allowed_parameters = {
    "bar" = ["foo-*"]
  }
}
```

#### Required Response Wrapping TTLs

- Can be used to set minimums/maximums on TTLs set by clients when requesting that a response be wrapped, with granularity of a second.
- Can be specified as a number of seconds or string with a `s`, `m`, or `h` suffix.

- `min_wrapping_ttl` - minimum allowed TTL specify for wrapped response. In practice, settig a minimum TTL of one second effectively makes response wrappig mandatory for a particular path. Can also be used to ensure that the TTL is not too low, leading end targets unable to unwrap before token expires.

- `max_wrapping_ttl` - maximum allowed TTl that clients can specify for wrapped response.

```hcl
# This effectively makes response wrapping mandatory for this path by setting min_wrapping_ttl to 1 second.
# This also sets this path's wrapped response maximum allowed TTL to 90 seconds.
path "auth/approle/role/my-role/secret-id" {
    capabilities = ["create", "update"]
    min_wrapping_ttl = "1s"
    max_wrapping_ttl = "90s"
}
```

If paths are merged from different stanzas, lowest value specified is the value that will result.

### Built-in Policies

# Reference

- [Policies](https://www.vaultproject.io/docs/concepts/policies)
