import React, { useState, useEffect, useRef } from "react";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IndexPage from "./components/index";
import HistoriquePage from "./components/historiquePage";
import TableauDeBordPage from "./components/tableauDeBordPage";

import * as Notifications from "expo-notifications";


const Stack = createNativeStackNavigator();

async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {

   const [expoPushToken, setExpoPushToken] = useState("");
   const [notification, setNotification] = useState(false);
   const notificationListener = useRef();
   const responseListener = useRef();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        console.log("Token:", token);
        // Send the token to the server
        await fetch(
          "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        // Do something with the token if needed in your app
      } catch (error) {
        console.error("Error fetching or posting token:", error);
      }
    };

    fetchToken();

     notificationListener.current =
       Notifications.addNotificationReceivedListener((notification) => {
         setNotification(notification);
       });

       responseListener.current =
         Notifications.addNotificationResponseReceivedListener((response) => {
           console.log(response);
         });

  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={IndexPage}
          options={{ headerShown: false }} // Hide the header bar for this screen
        />
        <Stack.Screen
          name="Historique"
          component={HistoriquePage}
          options={{ headerShown: false }} // Hide the header bar for this screen
        />

        <Stack.Screen
            name="TableauDeBord"
            component={TableauDeBordPage}
            options={{ headerShown: false }} // Hide the header bar for this screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
