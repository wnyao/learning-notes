export IMAGE_NAME=wnyao/test-job-success

docker rmi -f $IMAGE_NAME
docker build -t $IMAGE_NAME .
docker push $IMAGE_NAME


