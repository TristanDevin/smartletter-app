const express = require("express");
var request = require("request");
require("dotenv").config();
const cors = require("cors");

var fs = require("fs");

const db = require("./db.js");

const app = express();
app.use(express.json());
app.use(cors());
const port = 8080;

function hexToAscii(hexString) {
  let asciiString = "";

  for (let i = 0; i < hexString.length; i += 2) {
    let hex = hexString.substr(i, 2);
    let decimal = parseInt(hex, 16);
    asciiString += String.fromCharCode(decimal);
  }

  return asciiString;
}

function hexToAscii(hexString) {
  let asciiString = "";

  for (let i = 0; i < hexString.length; i += 2) {
    let hex = hexString.substr(i, 2);
    let decimal = parseInt(hex, 16);
    asciiString += String.fromCharCode(decimal);
  }

  return asciiString;
}

app.route("/message").post(async (req, res) => {
  try {
  var json = req.body;
  var data = { id: json.id };
  data.letter = hexToAscii(json.value.payload);
  data.colis = hexToAscii(json.value.payload)

  data.datetime = new Date();
  data.recupere = false;
  const message = await db.postMessage(data);
    catch (error) {
    console.error("Error posting message:", error);
    console.error("message was :", req.body);
    res.status(500).send("Internal Server Error");
  }
});

app.route("/message").put(async (req, res) => {
  try {
    var data = { id: req.body.id };
    data.recupere = true;
    const message = await db.putMessage(data);
  } catch (error) {
    console.error("Error posting message:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.route("/messages").get(async (req, res) => {
  try {
    const messages = await db.getMessages();
    res.send(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
