var multer = require("multer");
var upload = multer({ dest: "" });

const { create } = require("../utils/connection");

const pubChannel = "photo";
const subChannel = "photo:result";

module.exports = app => {
  return app.post("/query", upload.single("image"), function(req, res, next) {
    if (req.file) {
      redisPublish(req.file);
    } else {
      res.send("Failed to publish");
    }

    redisSubsribe((channel, data) => {
      console.log("Response: ", data);
      res.send(data);
    });
  });
};

// Publish payload to photo channel
const redisPublish = payload => {
  create().then(publisher => {
    publisher.publish(pubChannel, JSON.stringify(payload), () => {
      console.log("Successfully publish to channel: ", pubChannel);
    });
  });
};

// Subscribe to photo:result
const redisSubsribe = callback => {
  create().then(subscriber => {
    subscriber.on("message", (channel, data) => {
      console.log("Receive subscription message from channel: ", channel);
      if (data) data = JSON.parse(data);
      callback(channel, data);
    });
    subscriber.subscribe("photo:result");
    console.log("Successfully subsribe to channel: ", subChannel);
  });
};
