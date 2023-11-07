import React, { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import IndexPage from "./components/index";
import ColisPage from "./components/colisPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={IndexPage}
          options={{ headerShown: false }} // Hide the header bar for this screen
        />
        <Stack.Screen
          name="Colis"
          component={ColisPage}
          options={{ headerShown: false }} // Hide the header bar for this screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
