import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo package

export default function App() {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleButtonClick = () => {
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 1500); // Close the popup after 1.5 seconds (1500 milliseconds)
  };

  return (
    <NativeBaseProvider>
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
          <Text style={{ color: "white" }}>LetterBox</Text>
          <Text style={{ color: "white" }}>Bonne journée, Rosalie</Text>
        </View>

        {/* Main Content */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ width: "100%", marginBottom: 20 }}>
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                paddingTop: 40,
                paddingBottom: 40,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                marginBottom: 10,
                position: "relative", // Ensure the button is positioned relative to this parent
              }}
            >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', textAlign: 'center', flex: 1 }}>Content taking up the full width</Text>
              <TouchableOpacity onPress={handleButtonClick}>
                <Ionicons name="arrow-forward-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                paddingTop: 40,
                paddingBottom: 40,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                marginBottom: 10,
                position: "relative", // Ensure the button is positioned relative to this parent
              }}
            >
             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', textAlign: 'center', flex: 1 }}>Content taking up the full width</Text>
              <TouchableOpacity onPress={handleButtonClick}>
                <Ionicons name="arrow-forward-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </View>

        {/* Footer Bar */}
        <View
          style={{
            height: 50,
            backgroundColor: "grey",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: "white" }}>Hello world</Text>
          <TouchableOpacity onPress={handleButtonClick}>
            <Image
              source={require("./assets/icons/gear.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>
        {/* Popup */}
        {popupVisible && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
              }}
            >
              <Text>Clicked!</Text>
            </View>
          </View>
        )}
      </View>
    </NativeBaseProvider>
  );
}
