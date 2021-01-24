# Extract host and port
export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
echo "$INGRESS_HOST:$INGRESS_PORT"

# 05-02-a
# curl -s -H "Host:service1.gel.cyder.com.sg" "http://$INGRESS_HOST:$INGRESS_PORT"
# curl -v -H "Host: service1-lb.gel.cyder.com.sg" -X GET https://service1-lb.gel.cyder.com.sg
# for i in `seq 1 600`; do curl -s -H "Host:service1.gel.cyder.com.sg" "http://$INGRESS_HOST:$INGRESS_PORT"; done

# 05-02-b
# curl -s -I "http://service2.gel.cyder.com.sg:81"
# for i in `seq 1 300`; do curl -s "http://service2.gel.cyder.com.sg:81"; done

# 05-03-a
# curl -s -I -H "Host: service3-lb.gel.cyder.com.sg"  -H "country:singapore"  -X GET https://service3-lb.gel.cyder.com.sg
# curl -s -I -H "Host: service3-lb.gel.cyder.com.sg"  -H "country:malaysia"  -X GET https://service3-lb.gel.cyder.com.sg

# export count=10
# for i in `seq 1 $count`; do curl -s -H "Host:service3.gel.cyder.com.sg" -H "country:singapore" "http://$INGRESS_HOST:$INGRESS_PORT"; done
# for i in `seq 1 $count`; do curl -s -H "Host:service3.gel.cyder.com.sg" -H "country:malaysia" "http://$INGRESS_HOST:$INGRESS_PORT"; done


