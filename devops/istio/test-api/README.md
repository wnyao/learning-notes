# test-api

Simple test apis for istio demo purposes

### Installation

`npm or yarn install && npm or yarn start`

### Docker Registry

APIs is stored within [dockerhub](https://hub.docker.com/repository/docker/wnyao/test-api)

```
# There are 4 version deployed, simply switch out the v1 number at the end of image tag
docker pull wnyao/test-api:< v1 | v2 | v3 | v4 >
```

### APIs

- `GET /`
  Return api version in the form of Eg. TEST API v1.

- `GET /version`
  Return the api version in the form of Eg. v1.

- `GET /hello-world`
  This api will invoke a HTTP request through Istio ingress gateway together with a HTTP Host header that is configured within configmap/test-api-configmap. In this case the Host header value for the API will be set to test-api-v2.com which matches the configurations that are set on our Istio Gateway and Virtual Service resource. The expected behavior is that the api will call test-api-v2 workload and get version from GET /version API then return response HELLO WORLD FROM v2.
