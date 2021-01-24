export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')

# curl commands for testing via ingress gateway
curl -v -H "Host:service3.gel.cyder.com.sg" -H "country:singapore" "http://$INGRESS_HOST:$INGRESS_PORT"
curl -v -H "Host:service3.gel.cyder.com.sg" -H "country:malaysia" "http://$INGRESS_HOST:$INGRESS_PORT"

# curl commands for testing via domain name
# curl -v -H "Host: service3-lb.gel.cyder.com.sg"  -H "country:singapore"  -X GET https://service3-lb.gel.cyder.com.sg
# curl -v -H "Host: service3-lb.gel.cyder.com.sg"  -H "country:malaysia"  -X GET https://service3-lb.gel.cyder.com.sg

# repeat curl
# for i in `seq 1 100`; do curl -s -H "Host:service3.gel.cyder.com.sg" -H "country:singapore" "http://$INGRESS_HOST:$INGRESS_PORT"; done
# for i in `seq 1 100`; do curl -s -H "Host:service3.gel.cyder.com.sg" -H "country:malaysia" "http://$INGRESS_HOST:$INGRESS_PORT"; done
