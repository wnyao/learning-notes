
# set ingress port
export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')

# curl commands for testing via ingress gateway
curl -s -I -H "Host:service1.gel.cyder.com.sg" "http://$INGRESS_HOST:$INGRESS_PORT/version"

# repeat curl
# for i in `seq 1 100`; do curl -s -H "Host:service1.gel.cyder.com.sg" "http://$INGRESS_HOST:$INGRESS_PORT/version"; done
