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
    var payload = json.value.payload;
    // Convert the payload from hex to ascii
    var ascii = hexToAscii(payload);
    // Split the ascii at / to get the different fields and convert them to numbers
    var fields = ascii.split("/");
    var numLetter = parseInt(fields[0]);
    var numColis = parseInt(fields[1]);

    var data = {
      senderDevice: json.id,
      numLetter: numLetter,
      numColis: numColis,
      receivedAt: json.created,
      retrieved: false,
    };
    const message = await db.postMessage(data);
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error posting message:", error);
    console.error("Message:", req.body);
    res.status(500).send("Internal Server Error");
  }
});

app.route("/message").put(async (req, res) => {
  try {
    var data = { id: req.body.id };
    data.retrieved = true;
    const message = await db.putMessage(data);
    res.status(200).send("OK");
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
