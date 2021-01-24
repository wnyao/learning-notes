FROM node

# add the application to the container
RUN mkdir /app
RUN mkdir /app/test-job

WORKDIR /app/test-job
COPY . .

RUN rm -Rf node_modules
RUN npm i

# expose port 4000
EXPOSE 4000

# start the app
ENTRYPOINT ["npm","start"]
