const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { Expo } = require("expo-server-sdk");

const db = require("./db.js");

const app = express();
app.use(express.json());

app.use(cors());

const port = 8080;

let token = "";

function hexToAscii(hexString) {
  let asciiString = "";

  for (let i = 0; i < hexString.length; i += 2) {
    let hex = hexString.substr(i, 2);
    let decimal = parseInt(hex, 16);
    asciiString += String.fromCharCode(decimal);
  }

  return asciiString;
}

function sendPushNotification(expoPushToken, message) {
  const expo = new Expo();
  const messages = [
    {
      to: expoPushToken,
      sound: "default",
      body: message,
      data: { withSome: "data" },
    },
  ];
  expo.sendPushNotificationsAsync(messages);
}



function base64ToAscii(base64String) {
  let asciiString = "";

  let buffer = Buffer.from(base64String, "base64");
  asciiString = buffer.toString("ascii");

  return asciiString;
}

app.route("/token").post(async (req, res) => {
  try {
    token = req.body.token;
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error posting token:", error);
    res.status(500).send("Internal Server Error");
  }
}
);

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
    // Get sender id from  stream id, split at : and take the last part
    var senderId = json.streamId.split(":")[4];
    var data = {
      senderDevice: senderId,
      numLetter: numLetter,
      numColis: numColis,
      receivedAt: json.created,
      retrieved: false,
    };
    const message = await db.postMessage(data);

    // Send push notification
    if (token) {
      console.log("Sending push notification to", token);
  
      sendPushNotification(token, "Vous avez reçu un nouveau message !");
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error posting message:", error);
    console.error("Message:", req.body);
    res.status(500).send("Internal Server Error");
  }
});

app.route("/message/ttn").post(async (req, res) => {
  try {
    var json = req.body;
    var payload = json.uplink_message.frm_payload;
    console.log("payload", payload);
    // Convert the payload from base64 to ascii
    var ascii = base64ToAscii(payload);
    console.log("ascii", ascii);
    // Split the ascii at / to get the different fields and convert them to numbers
    var fields = ascii.split("/");
    var numLetter = parseInt(fields[0]);
    var numColis = parseInt(fields[1]);
    // Get sender id from  stream id, split at : and take the last part
    var senderId = json.end_device_ids.dev_eui;
    var data = {
      senderDevice: senderId,
      numLetter: numLetter,
      numColis: numColis,
      receivedAt: json.received_at, 
      retrieved: false,
    };

     if (token) {
       console.log("Sending push notification to", token);

       sendPushNotification(token, "Vous avez reçu un nouveau message !");
     }
     
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
    var data = { id: req.body.id, retrieved: req.body.retrieved };
    const message = await db.putMessage(data);
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error posting message:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.route("/message").get(async (req, res) => {
  try {
    var data = { id: req.body.id };
    const message = await db.getMessage(data);
    res.send(message);
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).send("Internal Server Error");
  }
}
);

app.route("/message").delete(async (req, res) => {
  try {
    var data = { id: req.body.id };
    const message = await db.deleteMessage(data);
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error deleting messages:", error);
    res.status(500).send("Internal Server Error");
  }
}
);

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
