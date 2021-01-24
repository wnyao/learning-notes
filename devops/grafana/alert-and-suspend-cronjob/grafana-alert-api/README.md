# Grafana alert api

### How to run locally

1. Installation and boot up

   ```
   npm install && npm run dev
   ```

2. Create local proxy server gateway between localhost and kubernetes api server

   ```
   kubectl proxy --port 8080
   ```

