require("dotenv").config();
const { NODE_ENV, NODE_PORT } = process.env;

const express = require("express");
const http = require("http");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cors = require("cors");
const pino = require("express-pino-logger")();

// APIS
const cronjobRouter = require("./src/api/cronjobRouter");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(pino);
app.use(bodyParser.json());

app.use("/api/cronjob", cronjobRouter);
app.use("/version", (req, res) => {
  const pjson = require("./package.json");
  res.status(200).send(`Grafana alert api v${pjson.version}`);
});

app.use((req, res, next) => {
  next(createError(404, res));
});

server.listen(NODE_PORT || "4000", () => {
  console.log(
    `[${NODE_ENV || "production"}] Listening to http://localhost:${
      NODE_PORT || "4000"
    }`
  );
});
