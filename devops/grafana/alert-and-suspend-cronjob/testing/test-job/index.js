const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  console.log("sample web engine");
  res.status(200).send("Sample web engine");
});

app.post("/failure", (req, res) => {
  console.log("res: ", res);
  console.log("failure");

  res.status(200).send("failure");
});

app.post("/success", (req, res) => {
  console.log("res: ", res);
  console.log("success");
  res.status(200).send("success");
});

app.listen(port, () => {
  throw "error";
  // console.log(`Example app listening at http://localhost:${port}`);
});
