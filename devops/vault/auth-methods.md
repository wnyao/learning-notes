# [Auth Methods](https://www.vaultproject.io/docs/auth)

- Auth methods are components in Vault that perform authentication and responsible for assigning identity and set of policies to a user.

### Enabling / Disabling Auth Methods

- Can be enabled/disabled using CLI or the API.

```
$ vault auth enable userpass
```

- When enabled, auth methods are similar to secrets engines: they are mounted within Vault mount table and can be accessed and configured using standard read/write API.
- All auth methods are mounted underneath the `auth/` prefix. By default, to `auth/<type>`. i.e `auth/github`
- User can mount a single auth method multiple times.

```
$ vault auth enable -path=my-login userpass
```

- When disabled, user authenticated via that auth method are automatically logged out.

# [Authentication](https://www.vaultproject.io/docs/concepts/auth)

- Authentication in Vault is the process by which user or machine supplied information is verified against an internal or external system.
- Supported auth methods including GitHub, LDAP, AppRole, and more.
- Before client can interact with vault, it must authenticate an auth method.
- Upon authenticated, a token is generated. This token is conceptually similar to session ID on website, may attached policy which is mapped at authentication time.

### auth methods

To enable auth method:

```
$ vault write sys/auth/my-auth type=userpass
```

- This enables "userpass" auth method at path "my-auth", will be accessible at path "my-auth".

To learn more, use the built-in `path-help` command:

```
$ vault path-help auth/my-auth
```

- Vault supports multiple auth methods simultaneously.
- Can mount same type of method at different path.
- Only one authentication is required to gain access, is not currently possible to force a user through multiple auth methods to gain access.

### Token

- Authentication works by verifying your identity and generating token to associate with that identity.
- Vault generates a unique access token for you to use for future requests. CLI automatically attaches this token to requests, API have to do this manually.
- This token given for authentication can also be used with full set of token commands, such as creating new sub-tokens, revoking tokens, and renewing tokens.

### Authenticating

#### Via the CLI

- Support many built-in auth methods

```
$ vault login -method=github token=<token>
```

- After authenticating and logged in. CLI command will output your raw token.
- Raw token is used for revocation and renewal.
- As user logging in, the primary use case of token is renewal.
- To determine what variables are needed for auth method, supply `-method` flag without any arguments and help will be shown

#### Via the API

- API authentication is generally used for machine authentication.
- Each auth method implements its login endpoint. Use `vault path-help` to find proper endpoint.

```
$ vault path-help auth/github/login
```

### Auth Leases

- Like secrets, identities have leases associated with them. This means that you must reauthenticate after given lease period to continue accessig Vault.
- Specific to each backend auth method how leasing is implement.
- Identitied can be renewed without having completely reauthenticate. Just use `vault token renew <token>` with leased token associated with your identity.

# Reference

- [Auth Methods](https://www.vaultproject.io/docs/auth)
- [Authentication](https://www.vaultproject.io/docs/concepts/auth)
