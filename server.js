const express = require("express");
require("dotenv").config();
const { middleware, Client } = require("@line/bot-sdk");
const translate = require("translation-google");
const app = express();

const config = {
  channelAccessToken: process.env.ACCESSTOKEN,
  channelSecret: process.env.CHANNELSECRET,
};

const client = new Client(config);

app.post("/webhook", middleware(config), async (req, res) => {
  try {
    const { type, replyToken, message } = req.body.events[0];

    if (type === "message") {
      const result = await translate(message.text, {
        from: "ar",
        to: "id",
      });

      client.replyMessage(replyToken, {
        type: "text",
        text: result.text,
      });
    }
    res.status(200).json({message: 'success send message'})
  } catch (err) {
    console.log("err :", err);
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
});

app.listen(process.env.PORT || 3000, console.log("Chatbot Runningg...."));
