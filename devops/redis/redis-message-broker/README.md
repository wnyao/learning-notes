# Redis message broker example

Refer the pdf file for full requirements

## How to run

1. Run redis image on port 6379

```
docker run -d -p 6379:6379 redis
```

2. yarn start c3 and curl localhost

```
curl localhost:3000
```

3. yarn start c1 and run command

```
curl -F "image=@./test_image.jpg" localhost:9000/query
```

Note: make sure image path is correct or you can try other images

## Author

@wnyao
