FROM node
LABEL version="1.0"
LABEL description="Grafana Alert API"

# add the application to the container
RUN mkdir /app
RUN mkdir /app/grafana-alert-api

WORKDIR /app/grafana-alert-api
COPY . .

# remove
RUN npm i

# expose port 4000
EXPOSE 4000

# start the app
ENTRYPOINT ["npm","start"]
