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
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo package
import { useNavigation } from "@react-navigation/native";





const HistoriquePage = () => {
  
  const [jsonData, setJsonData] = useState(null);

  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      // Using fetch API
      const response = await fetch(
        "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/messages"
      );
      const data = await response.json();
      data.forEach((record) => {
        const fullDate = (new Date(record.receivedAt));
        fullDate.setHours(fullDate.getHours() + 1);
        record.receivedAt = fullDate.toISOString();
      });
      const sortedData = data.sort((a, b) => new Date(b.receivedAt) -new Date(a.receivedAt));
      setJsonData(sortedData);
    } catch (error) {
      window.alert(error);

      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [jsonData]); // Empty dependency array ensures that this effect runs once on mount


  const handleTrashClick = (item) => {
    console.log("delete ", item.id)
    deleteData(item);
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleButtonClick = () => {
    
    /*
    jsonData.forEach((record) => {
      // Update properties of the record
      if (record.retrieved === false ){
        //record.retrieved = true;
        modifyData(record, true);
        
      };
    });
    //fetchData();
    */
    deleteAllData();

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
        
        <View
          style={[
            styles.item,
            { backgroundColor , flexDirection: "row", height: 80 },
          ]}
        >
          <Ionicons color="#1d4274" name="cube-outline" size={40} style={[
            { marginLeft:20 },
          ]}></Ionicons>
         
          <Text style={[styles.itemText, { color: textColor }]}>{time}</Text>
          <Text style={[styles.itemText, { color: textColor }]}>{date}</Text>
          {/*
         <TouchableOpacity onPress={() => handleTrashClick(item)}>
            <View>
              <Ionicons 
                color="#1d4274" 
                name="trash-outline" 
                size={30}
                style={{
                  marginRight: 10
               
                }}>
              </Ionicons>
              
            </View>
          </TouchableOpacity>
              */}
        </View>
      );
    } else if (colis == "0") {
      return (
        <View
          style={[
            styles.item,
            { backgroundColor , flexDirection: "row", height: 80 },
          ]}
        >
            
          <Ionicons color="#1d4274" name="mail-outline" size={40} style={[
            { marginLeft:20 },
          ]}></Ionicons>
          
          <Text style={[styles.itemText, { color: textColor }]}>{time}</Text>
          <Text style={[styles.itemText, { color: textColor }]}>{date}</Text>
          {/*
          <TouchableOpacity onPress={() => handleTrashClick(item)}>
            <View>
              <Ionicons 
                color="#1d4274" 
                name="trash-outline" 
                size={30}
                style={{
                  marginRight: 10
                }}>
              </Ionicons>
              
            </View>
          </TouchableOpacity>
              */}
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.item,
            { backgroundColor , flexDirection: "row", height: 100 },
          ]}
        >

          <View
            style={{flexDirection: "column",  marginLeft:20}}
          >
              <Ionicons color="#1d4274" name="cube-outline" size={40}>
              </Ionicons>
              <Ionicons color="#1d4274" name="mail-outline" size={40} ></Ionicons>
          </View>

          <Text style={[styles.itemText, { color: textColor }]}>{time}</Text>
          <Text style={[styles.itemText, { color: textColor }]}>{date}</Text>
          {/*
          <TouchableOpacity onPress={() => handleTrashClick(item)}>
            <View>
              <Ionicons 
                color="#1d4274" 
                name="trash-outline" 
                size={30}
                style={{
                  marginRight: 10
                }}>
              </Ionicons>
            </View>
          </TouchableOpacity>
              */}
        </View>
      );
    }
  };

  const deleteData = async (item) => {
    try {
      const getAllUrl =
        "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/messages";
      const updateUrl =
        "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/message";

      // Fetch the data to find messages with the id
      const response = await fetch(getAllUrl);
      const data = await response.json();
      //getTotal(data);
      data.forEach((record) => {
        const fullDate = (new Date(record.receivedAt));
        fullDate.setHours(fullDate.getHours() + 1);
        record.receivedAt = fullDate.toISOString();
      });
      // Modify each specific record as needed
      const deletedData = data.filter(element => element.id !== item.id);
      const sortedData = deletedData.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
      setJsonData(sortedData);


      // Use the PUT method to update the specific record
      const updateResponse = await fetch(updateUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ id: item.id }),
      });

      if (updateResponse.ok) {
        console.log("Record updated successfully");
        //console.log(updateResponse);
      } else {
        console.error("Error updating record:", updateResponse.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteAllData = async () => {
    try {
      const getAllUrl =
        "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/messages";
      const updateUrl =
        "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/message";

      // Fetch the data to find messages with the id
      const response = await fetch(getAllUrl);
      const data = await response.json();

      //delete all
      data.forEach(async (record) => {
        const updateResponse = await fetch(updateUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ id: record.id }),
        });
  
        if (updateResponse.ok) {
          console.log("Record updated successfully");
          //console.log(updateResponse);
        } else {
          console.error("Error updating record:", updateResponse.statusText);
        }
      });
      
      //delete the stored data
      setJsonData([]);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const renderItem = ({ item }) => {
    const backgroundColor = item.retrieved ? "#919191" : "#f8e499";
    const color = item.retrieved ? "#1d4274" : "#1d4274";
    var fullDate = (new Date(item.receivedAt));
    const stringTime = fullDate.toISOString().slice(11, 16);
    const stringDate = fullDate.toISOString().split("T")[0].split("-").reverse().join("/");
    return (
      <Item
        letter={item.numLetter}
        colis={item.numColis}
        item={item}
        time={stringTime}
        date={stringDate}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

 

  return (
    <View style={{ flex: 1, backgroundColor: "#1d4274" }}>
      {/* Top Bar */}
      <View style={styles.topbar}>
        <Image style={styles.logo} source={require("../assets/logo_bleu.png")} />

        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons
            name="refresh-outline"
            size={40}
            color="#1d4274"
            style={{marginRight : 10, marginTop: 10 }}
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
      </View>
    
      {/* Main Content */}

      {/* Titles */}
      <View style={styles.containerBar}>
        <Text style={[styles.containerBarText, {marginLeft:10 }]}>Type</Text>
        <Text style={[styles.containerBarText, {marginRight:20 }]}>Heure</Text>
        <Text style={[styles.containerBarText, {marginRight:30}]}>Date</Text>
        
        {/*
        <Text style={[styles.containerBarText, {  }]}>
          Supprimer
        </Text> */}
      </View>

      <View >

        {/* Item list*/}
        <View style={{}}>
          <SafeAreaView style={styles.container}>
            <FlatList data={jsonData} renderItem={renderItem} />
          </SafeAreaView>
        </View>
        
        {/*Button "récupérer mon courrier"*/}
        <TouchableOpacity onPress= {handleButtonClick} style = {{alignItems:"center"}}>
            <View
              style={styles.button}
              >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                >
              
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.buttonText}>
                    Récupérer mon courrier
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>     
      </View>

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
      paddingTop: Platform.OS === 'ios' ? 40:10,
      height: Platform.OS === 'ios' ? 100:70,
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

    fontSize: 25,



},

menuTextSelected: {
  fontFamily : Platform.OS === 'ios' ? "Futura" : "sans-serif-condensed",
    alignSelf:"center",
    color: "#1d4274",
    textAlign: "center",

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
  marginTop: 10,
  position: "relative", // Ensure the button is positioned relative to this parent
},

  container: {
      height : 450,
      alignSelf: "stretch",
      alignItems: "center",
      paddingTop: 40,
   
      
      marginTop: Platform.OS === 'ios' ? 30: 0,
      //marginBottom: 10,
      position: "relative", // Ensure the button is positioned relative to this parent
  },

  containerBar: {
      flexDirection: "row",
      marginHorizontal: 20,
      marginTop:50,
  
      justifyContent: "space-around",

      position: "relative", // Ensure the button is positioned relative to this parent
  },

  containerBarText: {
    fontFamily : Platform.OS === 'ios' ? "Futura" : "sans-serif-condensed",
      color: "white",

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
    marginBottom: 20,
    marginLeft: 10
  },

  buttonText: {
    fontFamily : Platform.OS === 'ios' ? "Futura" : "sans-serif-condensed",
    color: "#1d4274",
    textAlign: "center",
    flex: 1,
    fontSize: Platform.OS === 'ios' ? 30 : 25,

  },

  button: {

      height: 80,
      width: Platform.OS === 'ios' ? 300 : 350,
      backgroundColor: "#f8e499",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      justifyContent:"center",
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      marginBottom: 10,
      marginTop: 20,
      position: "relative", // Ensure the button is positioned relative to this parent
  }

  


});



export default HistoriquePage;
