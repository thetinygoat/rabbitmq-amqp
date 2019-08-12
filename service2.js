const amqp = require("amqplib/callback_api");
const express = require("express");
const app = express();
const connurl = "";
// let ch = null;

amqp.connect(connurl, (err, conn) => {
  conn.createChannel((err, ch) => {
    ch.consume(
      "test-queue",
      msg => {
        console.log(msg.content.toString());
        addNewUser();
      },
      { noAck: false }
    );
  });
});

// const sendMessage = () => {
//   ch.sendToQueue("test-queue", new Buffer.from("hello world 2"));
// };

const addNewUser = () => {
  console.log("new user added");
};

app.listen(4000);
