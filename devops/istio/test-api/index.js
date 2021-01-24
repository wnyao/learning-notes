require("dotenv").config();
const fetch = require("node-fetch");
const createError = require("http-errors");
const cors = require("cors");
const pino = require("express-pino-logger")();
const multer = require("multer");
const upload = multer({ dest: "" });

const express = require("express");
const app = express();
const port = 3000;

const { INGRESS_HOST, HOST, API_VERSION } = process.env;
app.use(cors());
app.use(pino);

app.get("/", (_, res) => {
  res.status(200).send(`TEST API ${API_VERSION}`);
});

app.get("/version", (_, res) => {
  res.status(200).json(API_VERSION);
});

app.get("/hello-world", async (_, res) => {
  try {
    const response = await fetch(`http://${INGRESS_HOST}/version`, {
      method: "GET",
      headers: {
        Host: HOST,
      },
    });
    const version = await response.json();

    if (!version) throw "No version found";
    const resMessage = `HELLO WORLD FROM ${version}`;
    res.status(200).send(resMessage);
  } catch (e) {
    const errMessage = `[${API_VERSION}] Error: ${e}`;
    console.log(errMessage);
    res.status(404).send(errMessage);
  }
});

app.post("/upload", upload.single("image"), (req, res, next) => {
  if (!req.file) {
    res.status(404).send("Missing payload");
    return;
  }

  res.status(200).send(req.file);
});

app.use((_, res, next) => {
  next(createError(404, res));
});

app.listen(port, () => {
  console.log(`API VERSION ${API_VERSION}`);
});
