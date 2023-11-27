import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo package
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";



const TableauDeBordPage = () => {
    const [popupVisible, setPopupVisible] = useState(false);

    const navigation = useNavigation();

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
                <Text style={{ color: "white" }}>Bonne journ&#233;e, Rosalie</Text>
                <Ionicons
                    name="person-circle-outline"
                    size={50}
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
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Historique')}>
                        <Text style={styles.menuText} >Historique</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuContainerSelected}>
                    <Text style={styles.menuTextSelected} >Tableau de bord</Text>
                </View>
            </View>

            {/* Main Content */}
            

           
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
  


    },

    menuTextSelected: {
        color: "#1d4274",
        textAlign: "center",
        flex: 1,
        fontSize: 25,
    


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



export default TableauDeBordPage;
