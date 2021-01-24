export IMAGE_NAME="wnyao/test-api:v4"
docker build -f Dockerfile -t $IMAGE_NAME .
docker push $IMAGE_NAME
