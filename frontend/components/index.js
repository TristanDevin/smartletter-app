import React, { useState, useEffect} from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo package

import { useNavigation } from "@react-navigation/native";


export default function IndexPage() {
  
  const [popupButtonVisible, setPopupButtonVisible] = useState(false);
  const [popupSettingsVisible, setpopupSettingsVisible] = useState(false);
  const navigation = useNavigation();
  const [jsonData, setJsonData] = useState(null);
  const [totalLetter, setTotalLetter] = useState(0);
  const [totalColis, setTotalColis] = useState(0);
  
  //http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:3000



  const handleButtonClick = () => {
    /*
    jsonData.forEach((record) => {
      // Update properties of the record
      if (record.retrieved === false ){
        modifyDataTrue(record);
        record.retrieved = true;
      };
    });
    //fetchData();
    getTotal(jsonData);
    */
    deleteAllData();

    
   };


  const handleSettingsClick = () => {
    setpopupSettingsVisible(true);
  };

  const handleRefresh = () => {
    fetchData();
  };


  const handleCloseClick = () => {
    setpopupSettingsVisible(false);
  };

  const getTotal = (data) => {
    const sumL = data.reduce((acc, item) => {
      // Only add numLetter if item.retrieved is false
      if (!item.retrieved) {
        return acc + item.numLetter;
      } else {
        return acc;
      }
    }, 0);
    setTotalLetter(sumL);
    const sumC = data.reduce((acc, item) => {
      // Only add numLetter if item.retrieved is false
      if (!item.retrieved) {
        return acc + item.numColis;
      } else {
        return acc;
      }
    }, 0);
    setTotalColis(sumC);
  }
  
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



  const modifyDataTrue = async (item) => {
    try {
      const getAllUrl =
        "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/messages";
      const updateUrl =
        "http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/message";

      // Fetch the data to find messages with the id
      const response = await fetch(getAllUrl);
      const data = await response.json();
      //getTotal(data);

      // Modify each specific record as needed

      data.forEach((record) => {
        // Update properties of the record
        if (record.id === item.id){
          record.retrieved = true;
        };
        const fullDate = (new Date(record.receivedAt));
        fullDate.setHours(fullDate.getHours() + 1);
        record.receivedAt = fullDate.toISOString();
        
      });


      const sortedData = data.sort((a, b) => b.receivedAt - a.receivedAt);
      setJsonData(sortedData);


      // Use the PUT method to update the specific record
      const updateResponse = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ id: item.id, retrieved: true }),
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


  const fetchData = async () => {
    try {
      // Using fetch API
      const response = await fetch('http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:8080/messages');

      const data = await response.json();
      const sortedData = data.sort((a, b) => b.receivedAt - a.receivedAt);
      setJsonData(sortedData);
      getTotal(sortedData);

    } catch (error) {
      window.alert(error);
      console.error('Error fetching data:', error);
    }

  };
  useEffect(() => {
    
    

    const focusListener = navigation.addListener('focus', () => {
      // Call your function here
      fetchData();
    });


    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once on mount

  


  return (
    <View style={{ flex: 1, backgroundColor: "#1d4274" }}>
      {/* Top Bar */}
      <View
        style={styles.topbar}
      >
        <Image
          style={styles.logo}
          source={require('../assets/logo_bleu.png')}
          />
        <TouchableOpacity onPress= {handleRefresh}>
          <Ionicons
            name="refresh-outline"
            size={40}
            color="#1d4274"
            style={{marginRight : 10, marginTop: 10 }}
          ></Ionicons>
        </TouchableOpacity>
         

          
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
              <Text style={styles.menuText} > Historique </Text>
            </TouchableOpacity>
        </View>

        {/*
        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('TableauDeBord')}>
              <Text style={styles.menuText} >Tableau de bord</Text>
            </TouchableOpacity>
        </View>*/}
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginBottom: 20 }} >
          <Text style={{ color: "white", textAlign: "center", flex: 1, marginTop: Platform.OS === 'ios'? 30 : 20, marginBottom: 10,fontSize: 40 , fontFamily : Platform.OS === 'ios' ? "Futura" : "sans-serif-condensed",}}>
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
                <Text style={styles.containerText}> {totalLetter} {totalLetter > 1? "lettres" : "lettre"} </Text>

              </View>
            </View>
          </View>
          <View
            style={styles.container}
            >
            <Ionicons
              color="#1d4274"
              name='cube-outline'
              size={120}
              style={{marginLeft:10}}
              
          ></Ionicons>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              >
            
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.containerText}> {totalColis} colis </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress= {handleButtonClick}>
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
      </View>

      {/* Footer Bar */}
      
      {/* Popup */}
      {popupButtonVisible && (
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
            <Text>Ce bouton permet de cocher tous les messages </Text>
          </View>
        </View>
      )}
      {/* Popup */}
      {popupSettingsVisible && (
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
              backgroundColor: "#f8e499",
 
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
            }}
          >
            <View
            style={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              alignSelf:"stretch",
              backgroundColor: "#1d4274",
              height: 50,
              marginBottom:20
            }}
            >
              <Text style= {[styles.menuText, {marginTop:10}]}>REGLAGES </Text>
            </View>

            <View
                style={{
                  marginVertical:20,
                  marginHorizontal:20,
                  alignSelf:"center",
                }}
              >
                
                  <Text style= {[styles.menuTextSelected]}>TODO </Text>
                  <Text style= {[styles.menuTextSelected]}>Ajouter les réglages </Text>
                
              </View>
            <TouchableOpacity onPress={handleCloseClick}>
              <View
                style={{
                  borderRadius: 8,
                  alignSelf:"center",
                  justifyContent:"center",
                  backgroundColor: "#1d4274",
                  height: 40,
                  marginVertical:20,
                  paddingHorizontal:10
                }}
              >
                
                  <Text style= {[styles.menuText]}>Fermer </Text>
                
                
              </View>
            </TouchableOpacity>
          </View>
          
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
    topbar: {
        height: 100,
        paddingTop:40,
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
      borderRadius: 20,

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
      borderRadius: 30,
      paddingHorizontal: 20,
      marginTop: 10,
      position: "relative", // Ensure the button is positioned relative to this parent
    },


    container: {
        width: Platform.OS === 'ios' ? 220 : 210,
        height: Platform.OS === 'ios' ? 220 : 210,
        justifyContent:"center",
        alignItems: "center",
        alignSelf: "center",
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
        fontFamily : Platform.OS === 'ios' ? "Futura" : "sans-serif-condensed",
        fontSize: Platform.OS === 'ios' ? 30 : 22,
        color: "#1d4274",
        textAlign: "center",
        flex: 1,
       

    },

    containerImage: {
        color: "#1d4274",
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
