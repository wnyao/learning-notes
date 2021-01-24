FROM node:latest

RUN mkdir /root/api
WORKDIR mkdir /root/api
COPY . .

RUN rm -Rf node_modules
RUN npm i

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
