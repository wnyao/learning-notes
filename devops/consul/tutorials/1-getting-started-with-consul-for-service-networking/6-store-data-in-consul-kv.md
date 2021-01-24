# [Store data in Consul KV](https://learn.hashicorp.com/tutorials/consul/get-started-key-value-store?in=consul/getting-started)

- Consul includes a key value store

**Task**

1. Add data

   ```
   # put values into KV store
   consul kv put redis/config/minconns 1
   consul kv put redis/config/minconns 25

   # keys support setting 64-bit integer flag value
   consul kv put -flags=42 redis/config/users/admin abcd1234
   ```

2. Query data

   ```
   # get KV value
   consul kv get redis/config/minconns

   # Retrieve some metadata
   consul kv get -detailed redis/config/users/admin

   # List all keys in store
   consul kv get -recurse
   ```

3. Delete data

   ```
   # Delete KV value
   consul kv delete redis/config/minconns

   # Delete all keys with redis prefix
   consul kv delete -recurse redis
   ```

4. Modify existing data

   ```
   # Update value of existing key
   consul kv put foo bar

   # Get updated key
   consul kv get foo

   # Put new value at extant path
   consul kv put foo zip

   # Check updated path
   consule kv get foo
   ```
