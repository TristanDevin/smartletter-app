import React, { useState , useEffect} from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, FlatList} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo package
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { BsBoxSeam } from "react-icons/bs";

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
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [jsonData, setJsonData] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using fetch API
        const response = await fetch('http://smart-letter-tc2023.swedencentral.cloudapp.azure.com:3000');
        const data = await response.json();
        setJsonData(data);

      } catch (error) {
        window.alert(error);
        setJsonData(error);
        console.error('Error fetching data:', error);
      }

    };
    



    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once on mount
  
  const handleButtonClick = () => {
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 1500); // Close the popup after 1.5 seconds (1500 milliseconds)
  };

  const Item = ({ item, backgroundColor, textColor, letter, colis, date, time }) => {
    if (letter == '0') {
      return (
        <View>

          <View style={[styles.item, { backgroundColor }]}>
            <Text style={[styles.itemText, { color: textColor, flex: 0.25, marginRight: 0, marginLeft: 20 }]}>{colis}</Text>
            <BsBoxSeam style={ [styles.containerImage, {flex:0.7}]} size={50}/>
            <Text style={[styles.itemText, { color: textColor, flex: 0.7 }]}>{time}</Text>
            <Text style={[styles.itemText, { color: textColor, flex: 1 }]}>{date}</Text>

            <TouchableOpacity onPress={() => toggleCheckbox(item)}>
              <View style={{ flexDirection: 'row', flex: 1.2 }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: '#1d4274',
                    marginRight: 20,
                    backgroundColor: selectedItems.includes(item) ? '#1d4274' : '#f8e499',
                  }}
                />

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteClick()} style={{ flex: 0.5 , marginRight:20}}>
              <Ionicons
                color="#1d4274"
                name='trash-outline'
                size={25}
          
              ></Ionicons>
            </TouchableOpacity >
          </View>
        </View>
      )
    } else if (colis == "0") {
      return (
        <View style={[styles.item, { backgroundColor }]}>
          <Text style={[styles.itemText, { color: textColor, flex: 0.25, marginRight: 0, marginLeft: 20 }]}>{letter}</Text>
          <Ionicons
            color="#1d4274"
            name='mail-outline'
            size={50}
            style={{ flex: 0.7 }}
          ></Ionicons>
          <Text style={[styles.itemText, { color: textColor, flex: 0.7 }]}>{time}</Text>
          <Text style={[styles.itemText, { color: textColor, flex: 1 }]}>{date}</Text>

          <TouchableOpacity onPress={() => toggleCheckbox(item)}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: '#1d4274',
                  marginRight: 20,
                  backgroundColor: selectedItems.includes(item) ? '#1d4274' : '#f8e499',
                }}
              />

            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDeleteClick()} style={{ flex: 0.5, marginRight: 20 }}>
            <Ionicons
              color="#1d4274"
              name='trash-outline'
              size={25}

            ></Ionicons>
          </TouchableOpacity >


        </View>
      )


    } else {
      return (
        <View style={[styles.item, { backgroundColor , flexDirection:"row"}]}>
          <View style={{ flexDirection: 'column', flex: 0.4}}>
            <Text style={[styles.itemText, { color: textColor, marginRight: 0, marginLeft: 20 }]}>{colis}</Text>
            <Text style={[styles.itemText, { color: textColor, marginRight: 0, marginLeft: 20 }]}>{letter}</Text>
          </View>

          <View style={{ flexDirection: 'column', flex: 0.7 }}>
            <BsBoxSeam style={ {color:"#1d4274"}} size={50}/>
            <Ionicons
                color="#1d4274"
                name="mail-outline"
                size={50}
              
            ></Ionicons>
          </View>
  
          <Text style={[styles.itemText, { color: textColor, flex:0.4}]}>{time}</Text>
          <Text style={[styles.itemText, { color: textColor, flex: 1 }]}>{date}</Text>

          <TouchableOpacity onPress={() => toggleCheckbox(item)}>
            <View style={{ flex: 0.5 }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: '#1d4274',
                  marginRight: 20,
                  backgroundColor: selectedItems.includes(item) ? '#1d4274' : '#f8e499',
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteClick()} style={{ flex: 0.5, marginRight: 20 }}>
            <Ionicons
              color="#1d4274"
              name='trash-outline'
              size={25}
            ></Ionicons>
          </TouchableOpacity >
        </View>
      )
    }
  };

  const toggleCheckbox = (item) => {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      //item.recupere = true;
      setSelectedItems(selectedItems.filter((element) => element.id !== item.id));
    } else {
      //item.recupere = false;
      setSelectedItems([...selectedItems, item]);
    }
  };



  const renderItem = ({ item }) => {
    const backgroundColor = selectedItems.includes(item) ?'#919191' : '#f8e499';
    const color = selectedItems.includes(item) ? '#1d4274' : '#1d4274';
    return (
      <Item
        letter={item.numLetter}
        colis={item.numColis}
        item={item}
        date = {item.receivedAt.split("T")[0].split("-").reverse().join("/")}
        time = {item.receivedAt.split("T")[1].slice(0,5)}
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
      <View
        style={styles.topbar}
      >
        <Image
        style={styles.logo}
        source={require('../assets/logo.png')}
      />
         

          <Ionicons
            name="person-circle-outline"
            size={50}
            color = "#1d4274"
            ></Ionicons>
      </View>

      {/* Menu bar */}
      <View
        style={styles.menuBar}

      >
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.menuText} >R&#233;sum&#233;</Text>
          </TouchableOpacity>
            
        </View>
        <View style={styles.menuContainerSelected}>
          <Text style={styles.menuTextSelected} >Historique</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('TableauDeBord')}>
            <Text style={styles.menuText} >Tableau de bord</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.containerBar}>
        <Text style={[styles.containerBarText, { flex :1 }]} >Type</Text>
        <Text style={[styles.containerBarText, { flex: 1 }]} >Heure</Text>
        <Text style={[styles.containerBarText, { flex: 1}]} >Date</Text>
        <Text style={[styles.containerBarText, { flex: 1.5}]} >R&#233;cup&#233;r&#233;?</Text>
      </View>

      <View style={{ flex: 1}}>
        <View style={{ marginBottom: 20 }} >
          <SafeAreaView style={styles.container}>
            <FlatList
              data={jsonData}
              renderItem={renderItem}
                
  
            />
          </SafeAreaView>
            
        </View>
      </View>

      {/* Footer Bar */}
      <View
        style={{
          height: 50,
          backgroundColor: "#f8e499",
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
      
    </View>
  );
}


const styles = StyleSheet.create({
  topbar: {
      height: 50,
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
      alignSelf: "stretch",
      alignItems: "center",
      paddingTop: 40,
      paddingBottom: 40,
      
      marginBottom: 10,
      position: "relative", // Ensure the button is positioned relative to this parent
  },

  containerBar: {
      flexDirection: "row",
      marginLeft: 50,
      marginTop:70,
      justifyContent: "center",

      position: "relative", // Ensure the button is positioned relative to this parent
  },

  containerBarText: {
      color: "white",
      flex: 1,
      fontSize: 20,
      fontFamily: "URW Gothic L, sans-serif",
      position: "relative",
  },

  item: {
      justifyContent: "space-around",
      width: 500,
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
      fontSize: 20,
      color: "black",
      position: "relative", // Ensure the button is positioned relative to this parent
      marginHorizontal: 20,
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
