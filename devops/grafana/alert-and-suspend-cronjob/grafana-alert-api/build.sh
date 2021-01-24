# export IMAGE_NAME=wnyao/grafana-alert-api:latest
export IMAGE_NAME=cyder/grafana-alert-api:v1

docker rmi -f $IMAGE_NAME
docker build -f Dockerfile -t $IMAGE_NAME .
# docker push $IMAGE_NAME

docker save -o grafana-alert-api-image.tar $IMAGE_NAME
# docker run -d -p 4000:4000 $IMAGE_NAME
