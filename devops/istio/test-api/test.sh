curl -X GET -v localhost:3000
curl -X GET -v localhost:3000/version
curl -X GET -v localhost:3000/hello-world
curl -X POST -F "image=@./image.png" localhost:3000/upload
