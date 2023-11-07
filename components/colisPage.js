import React, { useEffect } from "react";
import { View, Text } from "react-native";


const mqtt = require("mqtt/dist/mqtt");

const ColisPage = () => {
  useEffect(() => {
    // Define your MQTT broker URL and options
    const brokerUrl = "eu1.cloud.thethings.network"
    const options = {
      clientId: "rosaliebdm",
      username: "smart-letter@ttn",
      password: "NNSXS.KXBZWVHPB3N62GKK45LXIBPUJ3Y7NOYPZAX2BNY.P77BFQD3FP3YIQMCHE4C557BYMHLOI4YGQ2H6WNEHJJCRR56PFNQ",
      port: 443,
      protocolID: "MQIsdp",
      protocolVersion: 3,
      keepalive: 60,
      clean: true,
      encoding: "utf8",
    };

    // Connect to the MQTT broker
    const client = mqtt.connect('wss://eu1.cloud.thethings.network', options);

    // Set up event handlers
    client.on("connect", () => {
      console.log("Connected");
      client.subscribe("smartletter@ttn/+/uplink");
    });

    client.on("message", (topic, message) => {
      console.log("New message: ", topic, message.toString());
    }
    );

    // Unsubscribe & disconnect after 5 seconds
    setTimeout(() => {
      client.unsubscribe("smartletter@ttn/+/uplink");
      client.end();
    }, 5000);
  }
  );

  return (
    <View>
      <Text>Your React Native Component</Text>
      {/* Add UI components to display MQTT messages */}
    </View>
  );
};

export default ColisPage;
