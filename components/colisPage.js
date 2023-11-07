import { React } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ColisPage() {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Top Bar */}
      <View
        style={{
          height: 50,
          backgroundColor: "grey",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ color: "white" }}>Hello World !</Text>
      </View>
    </View>
  );
}
