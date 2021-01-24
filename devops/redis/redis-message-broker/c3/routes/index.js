const { create } = require("../utils/connection");
const { formatBytes } = require("../utils/");

const subChannel = "photo";
const pubChannel = "photo:result";

module.exports = app => {
  return app.get("/", function(req, res, next) {
    redisSubsribe((channel, data) => {
      const { size } = data;

      // Return
      if (!size) {
        redisPublish({ status: "Failure", size: null });
      } else {
        console.log("formatBytes: ", formatBytes(data.size));
        redisPublish({ status: "SUCCESS", size: formatBytes(data.size) });
      }
    });
  });
};

// Publish to photo:result channel
const redisPublish = payload => {
  create().then(publisher => {
    publisher.publish(pubChannel, JSON.stringify(payload), () => {
      console.log("Successfully publish to channel: ", pubChannel);
    });
  });
};

// Subscribe to photo channel
const redisSubsribe = callback => {
  create().then(subscriber => {
    subscriber.on("message", (channel, data) => {
      console.log("Receive subscription message from channel: ", channel);
      if (data) data = JSON.parse(data);
      callback(channel, data);
    });

    subscriber.subscribe(subChannel);
    console.log("Successfully subsribe to channel: ", subChannel);
  });
};
