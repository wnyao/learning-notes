# export IMAGE_NAME=wnyao/test-job-failure
# export IMAGE_NAME=wnyao/test-job-failure-2
export IMAGE_NAME=cyder/test-cronjob

docker rmi -f $IMAGE_NAME
docker build -t $IMAGE_NAME .
# docker push $IMAGE_NAME

docker save -o test-cronjob-image.tar $IMAGE_NAME
