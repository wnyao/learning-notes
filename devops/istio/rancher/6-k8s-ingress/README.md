Below examples are just for demonstration purpose. Not recommended for installation on Rancher.

# k8s gateway in Istio 1.7

1. Setup Minikube

   ```
   minikube config set driver kvm2
   minikube start --memory=16384 --cpus=4 --kubernetes-version=v1.17.5
   ```

2. Install istio (v1.7)

   ```
   istioctl install --set profile=demo
   ```

3. Apply workload.

   ```
   kubectl apply -f ./manifest/config.yaml
   ```

4. Test

   ```
   # Host and port for istio ingressgateway
   export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
   export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')

   curl -s -I -H "Host:service.example.com" "http://$INGRESS_HOST:$INGRESS_PORT"
   ```

# k8s gateway in Istio 1.4

1. Setup Minikube

   ```
   minikube config set driver kvm2
   minikube start --memory=16384 --cpus=4 --kubernetes-version=v1.17.5
   ```

2. Download istio (v1.4.7). Refer [Istio v1.4.7 artifacts](https://github.com/istio/istio/releases/tag/1.4.7) for your OS.

   ```
   curl -OL https://github.com/istio/istio/releases/download/1.4.7/istio-1.4.7-osx.tar.gz
   ```

3. Change directory to `istio-1.4.7/bin` and utilize istioctl v1.4.7 binary within for installation. (Location to the binary file vary)

4. Install istio

   ```
   istioctl manifest apply --set profile=demo
   ```

5. Apply workload

   ```
   kubectl apply -f ./manifest/config.yaml
   ```

6. Test

   ```
   # Host and port for istio ingressgateway
   export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
   export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')

   curl -s -I -H "Host:service.example.com" "http://$INGRESS_HOST:$INGRESS_PORT"
   ```

### References

- [Kubenetes Ingress](https://istio.io/latest/docs/tasks/traffic-management/ingress/kubernetes-ingress/)
- [v1.4 documentation](https://istio.io/v1.4/docs/)
- [Announcing Istio 1.4.7](https://istio.io/latest/news/releases/1.4.x/announcing-1.4.7/)
- [Istio v1.4.7 artifacts](https://github.com/istio/istio/releases/tag/1.4.7)
