const amqp = require("amqplib/callback_api");
const express = require("express");
const app = express();
const connurl = "";
let ch = null;

amqp.connect(connurl, (err, conn) => {
  conn.createChannel((err, channel) => {
    ch = channel;
  });
});

const sendMessage = () => {
  ch.sendToQueue("test-queue", new Buffer.from("hello world 2"));
};

app.get("/", (req, res) => {
  sendMessage();
  return res.json("message sent");
});

app.listen(3000);
