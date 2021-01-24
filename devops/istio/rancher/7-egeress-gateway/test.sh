
export NAMESPACE=test-egress
export SOURCE_POD=$(kubectl get pod -n $NAMESPACE -l app=sleep -o jsonpath={.items..metadata.name})
kubectl exec -n $NAMESPACE "$SOURCE_POD" -c sleep -- curl -sL -o /dev/null -D - http://edition.cnn.com/politics


# kubectl exec -n $NAMESPACE "$SOURCE_POD" -c sleep -- curl -sL -o /dev/null -D - http://edition.cnn.com/politics
for i in `seq 1 10`; do ./test.sh; done
