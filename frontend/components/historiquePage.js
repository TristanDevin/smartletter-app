import React, { useState , useEffect} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo package
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";


function getChecked(DATA) {
  var list = [];
  for (const element of DATA) {
    if (element.recupere == true) {
      list.push(element);
    };
  };
  return (list);
};



const HistoriquePage = () => {
  const [popupTrashVisible, setPopupTrashVisible] = useState(false);
  const [popupUserVisible, setPopupUserVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [test, setTest] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [jsonData, setJsonData] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using fetch API
        const response = await fetch(
          "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/messages"
        );
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        window.alert(error);
        setJsonData(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const handleTrashClick = () => {
    setPopupTrashVisible(true);
    setTimeout(() => {
      setPopupTrashVisible(false);
    }, 3000); // Close the popup after 1.5 seconds (1500 milliseconds)
  };

  const handleUserClick = () => {
    setPopupUserVisible(true);
    setTimeout(() => {
      setPopupUserVisible(false);
    }, 3000); // Close the popup after 1.5 seconds (1500 milliseconds)
  };

  const Item = ({
    item,
    backgroundColor,
    textColor,
    letter,
    colis,
    date,
    time,
  }) => {
    if (letter == "0") {
      return (
        <View>
          <View style={[styles.item, { backgroundColor }]}>
            <Text
              style={[
                styles.itemText,
                {
                  color: textColor,
                  flex: 0.25,
                  marginRight: 0,
                  marginLeft: 20,
                },
              ]}
            >
              {colis}
            </Text>
            <Ionicons
              color="#1d4274"
              name="cube-outline"
              size={50}
              style={{ flex: 0.7 }}
            ></Ionicons>

            <Text style={[styles.itemText, { color: textColor, flex: 0.7 }]}>
              {time}
            </Text>
            <Text style={[styles.itemText, { color: textColor, flex: 1 }]}>
              {date}
            </Text>

            <TouchableOpacity onPress={() => toggleCheckbox(item)}>
              <View style={{ flexDirection: "row", flex: 1.2 }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: "#1d4274",
                    marginRight: 20,
                    backgroundColor: item.retrieved ? "#1d4274" : "#f8e499",
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTrashClick()}
              style={{ flex: 0.5, marginRight: 20 }}
            >
              <Ionicons
                color="#1d4274"
                name="trash-outline"
                size={25}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (colis == "0") {
      return (
        <View style={[styles.item, { backgroundColor }]}>
          <Text
            style={[
              styles.itemText,
              { color: textColor, flex: 0.25, marginRight: 0, marginLeft: 20 },
            ]}
          >
            {letter}
          </Text>
          <Ionicons
            color="#1d4274"
            name="mail-outline"
            size={50}
            style={{ flex: 0.7 }}
          ></Ionicons>
          <Text style={[styles.itemText, { color: textColor, flex: 0.7 }]}>
            {time}
          </Text>
          <Text style={[styles.itemText, { color: textColor, flex: 1 }]}>
            {date}
          </Text>

          <TouchableOpacity onPress={() => toggleCheckbox(item)}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "#1d4274",
                  marginRight: 20,
                  backgroundColor: item.retrieved ? "#1d4274" : "#f8e499",
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTrashClick()}
            style={{ flex: 0.5, marginRight: 20 }}
          >
            <Ionicons color="#1d4274" name="trash-outline" size={25}></Ionicons>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.item,
            { backgroundColor, flexDirection: "row", height: 100 },
          ]}
        >
          <View
            style={{ flexDirection: "column", justifyContent: "space-around" }}
          >
            <Text
              style={[
                styles.itemText,
                { color: textColor, marginRight: 0, marginLeft: 20 },
              ]}
            >
              {colis}
            </Text>
            <Text
              style={[
                styles.itemText,
                {
                  color: textColor,
                  marginRight: 0,
                  marginLeft: 20,
                  marginBottom: 30,
                },
              ]}
            >
              {letter}
            </Text>
          </View>

          <View
            style={{ flexDirection: "column", marginTop: 0, marginBottom: 0 }}
          >
            <Ionicons color="#1d4274" name="cube-outline" size={40}></Ionicons>
            <Ionicons color="#1d4274" name="mail-outline" size={40}></Ionicons>
          </View>

          <Text style={[styles.itemText, { color: textColor }]}>{time}</Text>
          <Text style={[styles.itemText, { color: textColor }]}>{date}</Text>

          <TouchableOpacity onPress={() => toggleCheckbox(item)}>
            <View>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "#1d4274",
                  // marginRight: 15,
                  backgroundColor: item.retrieved ? "#1d4274" : "#f8e499",
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTrashClick()}
            style={{ marginRight: 15 }}
          >
            <Ionicons color="#1d4274" name="trash-outline" size={25}></Ionicons>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const modifyData = async (item) => {
    try {
      const getAllUrl =
        "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/messages";
      const updateUrl =
        "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/message";

      // Fetch the data to find messages with the id
      const response = await fetch(getAllUrl);
      const data = await response.json();

      // Filter the messages with the id
      const filteredData = data.filter((message) => message.id === item.id);

      // Modify each specific record as needed
      filteredData.forEach((record) => {
        // Update properties of the record
        record.retrieved = true;
      });

      const myItem = filteredData[0];

      // Use the PUT method to update the specific record
      const updateResponse = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ id: myItem.id, retrieved: true }),
      });

      if (updateResponse.ok) {
        console.log("Record updated successfully");
      } else {
        console.error("Error updating record:", updateResponse.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Example usage:
  // modifyData({ id: 2 });

  const toggleCheckbox = (item) => {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      modifyData(item, true);
      //item.recupere = true;
      setSelectedItems(
        selectedItems.filter((element) => element.id !== item.id)
      );
    } else {
      modifyData(item, false);
      //item.recupere = false;
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.retrieved ? "#919191" : "#f8e499";
    const color = item.retrieved ? "#1d4274" : "#1d4274";
    return (
      <Item
        letter={item.numLetter}
        colis={item.numColis}
        item={item}
        date={item.receivedAt.split("T")[0].split("-").reverse().join("/")}
        time={item.receivedAt.split("T")[1].slice(0, 5)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const handleDeleteClick = () => {
    setPopupVisible(true);
  };

  const handleYesClick = (item) => {
    setPopupVisible(false);
    /*
    const index = DATA.indexOf(item);
    DATA.splice(index, 1);
    console.log(index);*/
  };

  const handleNoClick = (item) => {
    setPopupVisible(false);
    //DATA.push(item);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1d4274" }}>
      {/* Top Bar */}
      <View style={styles.topbar}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />

        <TouchableOpacity onPress={handleUserClick}>
          <Ionicons
            name="person-circle-outline"
            size={50}
            color="#1d4274"
          ></Ionicons>
        </TouchableOpacity>
      </View>

      {/* Menu bar */}
      <View style={styles.menuBar}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.menuText}>R&#233;sum&#233;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainerSelected}>
          <Text style={styles.menuTextSelected}>Historique</Text>
        </View>
        {/*
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('TableauDeBord')}>
            <Text style={styles.menuText} >Tableau de bord</Text>
          </TouchableOpacity>
        </View>*/}
      </View>
      <View>
        <Text>{test}</Text>
      </View>
      {/* Main Content */}
      <View style={styles.containerBar}>
        <Text style={[styles.containerBarText, { flex: 1 }]}>Type</Text>
        <Text style={[styles.containerBarText, { flex: 1 }]}>Heure</Text>
        <Text style={[styles.containerBarText, { flex: 1 }]}>Date</Text>
        <Text style={[styles.containerBarText, { flex: 1.5 }]}>
          R&#233;cup&#233;r&#233;?
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 20 }}>
          <SafeAreaView style={styles.container}>
            <FlatList data={jsonData} renderItem={renderItem} />
          </SafeAreaView>
        </View>
      </View>

      {/* Popup */}
      {popupTrashVisible && (
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
            <Text>TODO </Text>
            <Text>Ce bouton permet de supprimer le message </Text>
          </View>
        </View>
      )}
      {/* Popup */}
      {popupUserVisible && (
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
            <Text>TODO </Text>
            <Text>Ce bouton ouvre des paramètres </Text>
          </View>
        </View>
      )}

      {/* Footer Bar */}
      <View
        style={{
          height: 50,
          backgroundColor: "#1d4274",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      ></View>
    </View>
  );
}


const styles = StyleSheet.create({
  topbar: {
      paddingTop:50,
      height: 100,
      flexDirection: "row",
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
    fontFamily : Platform.OS === 'ios' ? "Futura" : "sans-serif-condensed",
    color: "white",
    textAlign: "center",
    alignSelf:"center",
    flex: 1,
    fontSize: 25,



},

menuTextSelected: {
  fontFamily : Platform.OS === 'ios' ? "Futura" : "sans-serif-condensed",
    alignSelf:"center",
    color: "#1d4274",
    textAlign: "center",
    flex: 1,
    fontSize: 25,



},

menuContainerSelected: {
  height: 50,
  alignItems: "center",
  justifyContent:"center",
  backgroundColor: "#f8e499",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  paddingHorizontal: 20,
  paddingTop: Platform.OS === 'ios' ? 10 : 5 ,
  
  shadowColor: "#000",
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 4,
  marginTop: 10,
  position: "relative", // Ensure the button is positioned relative to this parent
},


menuContainer: {
  height: 50,
  alignItems: "center",
  justifyContent:"center",
  backgroundColor: "#1d4274",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  paddingHorizontal: 20,
  paddingTop: Platform.OS === 'ios' ? 10 : 5 ,
  marginTop: 10,
  position: "relative", // Ensure the button is positioned relative to this parent
},

  container: {
      height : 550,
      alignSelf: "stretch",
      alignItems: "center",
      paddingTop: 40,
      paddingBottom: 40,
      
      marginTop: Platform.OS === 'ios' ? 30: 0,
      marginBottom: 10,
      position: "relative", // Ensure the button is positioned relative to this parent
  },

  containerBar: {
      flexDirection: "row",
      marginLeft: 50,
      marginTop:50,
  
      justifyContent: "center",

      position: "relative", // Ensure the button is positioned relative to this parent
  },

  containerBarText: {
    fontFamily : Platform.OS === 'ios' ? "Futura" : "sans-serif-condensed",
      color: "white",
      flex: 1,
      fontSize: 20,

      position: "relative",
  },

  item: {
      justifyContent: "space-around",
      width: 350,
      alignSelf: "stretch",
      flexDirection: "row",
      backgroundColor: "#f8e499",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      marginHorizontal: 10,
      alignItems: "center",
      marginBottom: 10,
      position: "relative", // Ensure the button is positioned relative to this parent
  },

  itemText: {
    fontFamily : Platform.OS === 'ios' ? "Futura" : "sans-serif-condensed",
      fontSize: Platform.OS === 'ios' ? 20 : 15,
      color: "black",
      position: "relative", // Ensure the button is positioned relative to this parent
      
      marginVertical: 20,
  },

  logo: {
    width: 120,
    height: 50,
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



export default HistoriquePage;
