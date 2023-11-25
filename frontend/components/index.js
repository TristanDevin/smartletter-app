import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo package
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";



export default function IndexPage() {
  const [popupButtonVisible, setPopupButtonVisible] = useState(false);
  const [popupUserVisible, setPopupUserVisible] = useState(false);
  const navigation = useNavigation();
  const [jsonData, setJsonData] = useState(null);
  const [totalLetter, setTotalLetter] = useState(0);
  const [totalColis, setTotalColis] = useState(0);

  
  //http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:3000

  

  const handleButtonClick = () => {
    setPopupButtonVisible(true);
    setTimeout(() => {
      setPopupButtonVisible(false);
    }, 3000); // Close the popup after 1.5 seconds (1500 milliseconds)
  };


  const handleUserClick = () => {
    setPopupUserVisible(true);
    setTimeout(() => {
      setPopupUserVisible(false);
    }, 3000); // Close the popup after 1.5 seconds (1500 milliseconds)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using fetch API
        const response = await fetch('http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:3000');
        const data = await response.json();
        setJsonData(data);
        const sumL = data.reduce((acc, item) => acc + item.numLetter, 0);
        setTotalLetter(sumL);
        const sumC = data.reduce((acc, item) => acc + item.numColis, 0);
        setTotalColis(sumC);
        //API pour test le get : 
        //https://mocki.io/v1/be3cb19b-bd49-4a82-b19b-44b859e19d5d
        //notre api : 
        //'http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:3000'

        // // If using axios
        //const response = await axios.get('http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:3000');
        //setJsonData(response.data);
      } catch (error) {
        window.alert(error);
        setJsonData(error);
        console.error('Error fetching data:', error);
      }

    };
    



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
          source={require('../assets/logo.png')}
          />
        <TouchableOpacity onPress= {handleUserClick}>
          <Ionicons
            name="person-circle-outline"
            size={50}
            color = "#1d4274"
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
          <Text style={{ color: "white", textAlign: "center", flex: 1, marginTop: 20, marginBottom: 20,fontSize: 40 }}>
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
                <Text style={styles.containerText}> {totalLetter} lettres </Text>

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
            <Text>Ce bouton ouvre des paramètres  </Text>
          </View>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
    topbar: {
        height: 100,
        paddingTop:50,
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
        alignSelf:"center",
        flex: 1,
        fontSize: 25,



    },

    menuTextSelected: {
        alignSelf:"center",
        color: "#1d4274",
        textAlign: "center",
        flex: 1,
        fontSize: 25,



    },

    menuContainerSelected: {
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: "#f8e499",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop:8,
        
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginTop: 10,
        position: "relative", // Ensure the button is positioned relative to this parent
    },


    menuContainer: {
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: "#1d4274",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 8,
        marginTop: 10,
        position: "relative", // Ensure the button is positioned relative to this parent
    },


    container: {
        height: 220,
        width: 220,
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
        color: "#1d4274",
        textAlign: "center",
        flex: 1,
        fontSize: 30,

    },

    containerImage: {
        color: "#1d4274",
    },


      logo: {
        width: 120,
        height: 50,
      },
      
    buttonText: {
      color: "#1d4274",
      textAlign: "center",
      flex: 1,
      fontSize: 30,

    },

    button: {
        height: 100,
        width: 300,
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
