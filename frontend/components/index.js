import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo package
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { BsBoxSeam } from "react-icons/bs";
import DATA from "../data/hardData"




function getLetter(DATA) {
    var num = 0;
    for (const element of DATA) {
        if (element.retrieved == false) {
            num += element.numLetter;
        }
        
    };
    return (num.toString());
};

function getColis(DATA) {
    var num = 0;
    for (const element of DATA) {
        if (element.retrieved == false) {
            num += element.numColis;
        }
    };
    return (num.toString());
};

export default function IndexPage() {
  const [popupVisible, setPopupVisible] = useState(false);
  const navigation = useNavigation();


  
  //http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:3000

  const nLetter = getLetter(DATA);
  const nColis = getColis(DATA);

  const handleButtonClick = () => {
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 1500); // Close the popup after 1.5 seconds (1500 milliseconds)
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1d4274" }}>
      {/* Top Bar */}
      <View
        style={styles.topbar}
      >
         
        <Text style={{ color: "white" }}>SmartLetter</Text>
        <Text style={{ color: "white" }}>Bonne journée, Rosalie</Text>
          <Ionicons
            name="person-circle-outline"
            size={50}
            ></Ionicons>
      </View>

       {/* Menu bar */}
      <View
        style={styles.menuBar}

      >
        <View style={styles.menuContainerSelected}>
          <Text style={styles.menuTextSelected} >Résumé</Text>
        </View>
        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Historique')}>
              <Text style={styles.menuText} >Historique</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('TableauDeBord')}>
              <Text style={styles.menuText} >Tableau de bord</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginBottom: 20 }} >
          <Text style={{ color: "white", textAlign: "center", flex: 1, marginBottom: 30, fontSize: 40 }}>
            Vous avez
          </Text>
        <View style={styles.container}>
          <Ionicons
              name="mail-outline"
              size={120}
              style={styles.containerImage}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }} >
            <View style={{flexDirection:"row"}}>
              <Text style={styles.containerText}>
                {nLetter}
              </Text>
              <Text style={styles.containerText}>lettres </Text>
            </View>
          </View>
        </View>
        <View
          style={styles.container}
          >
          <BsBoxSeam style={styles.containerImage} size={150}/>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            >
          
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.containerText}>
                  {nColis}
                </Text>
                <Text style={styles.containerText}>colis </Text>
              </View>
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
        <TouchableOpacity onPress={handleButtonClick}>
          <Image
            source={require("../assets/icons/gear.png")}
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
  );
}


const styles = StyleSheet.create({
    topbar: {
        height: 50,
        flexDirection :"row",
        backgroundColor: "#f8e499",
        justifyContent: "space-between",
        alignItems: "flex-start",

        

    },

    menuBar: {
        height: 50,
        flexDirection: "row",
        backgroundColor: "#1d4274",
        justifyContent: "space-around",
        alignItems: "flex-start",



    },

    menuText: {
        color: "white",
        textAlign: "center",
        flex: 1,
        fontSize: 25,
        fontFamily: "URW Gothic L, sans-serif",


    },

    menuTextSelected: {
        color: "#1d4274",
        textAlign: "center",
        flex: 1,
        fontSize: 25,
        fontFamily: "URW Gothic L, sans-serif",


    },

    menuContainerSelected: {
        alignItems: "center",
        backgroundColor: "#f8e499",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginTop: 10,
        position: "relative", // Ensure the button is positioned relative to this parent
    },

    menuContainer: {
        alignItems: "center",
        backgroundColor: "#1d4274",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
        position: "relative", // Ensure the button is positioned relative to this parent
    },

    container: {
        height: 250,
        width: 250,
        alignItems: "center",
        backgroundColor: "#f8e499",
        borderTopLeftRadius: 125,
        borderTopRightRadius: 125,
        borderBottomLeftRadius: 125,
        borderBottomRightRadius: 125,
        paddingTop: 40,
        paddingBottom: 40,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginBottom: 10,
        position: "relative", // Ensure the button is positioned relative to this parent
    },

    containerText: {
        color: "#1d4274",
        textAlign: "center",
        flex: 1,
        fontSize: 30,
        fontFamily: "URW Gothic L, sans-serif",
    },

    containerImage: {
        color: "#1d4274",
    },


    button: {
        height: 50,
        width: 250,
        backgroundColor: "#f8e499",
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        borderBottomLeftRadius: 55,
        borderBottomRightRadius: 55,
        paddingTop: 40,
        paddingBottom: 40,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginBottom: 10,
        position: "relative", // Ensure the button is positioned relative to this parent
    }


});
