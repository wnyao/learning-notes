# init cluter via kind
kind create cluster --name terraform-learn --config kube/kind-config.yaml
kind get cluster

# terraform init
terraform init

# edit ca and tls certification
kubectl config view --minify --flatten --context kind-terraform-learn

# apply changes
terraform apply

# clean up
terraform destroy
kind delete cluster --name terraform-learn

