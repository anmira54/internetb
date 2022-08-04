import React from "react";
import { StyleSheet, Image, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'; 
import Home from "./Home";
import Settings from "./Settings";
import WireTransference from "./WireTransference";

const Tab = createBottomTabNavigator();

const headerOptionHome = {
    headerLeft: () => (
        <Image style={{ width: 50, height: 50 }} source={require("../assets/Logo.png")} />
    ),
    headerTitleAlign: 'center',
    headerTitle: 'COSMOS',
    headerTitleStyle: {color: "#FFF"},
    headerStyle: {backgroundColor: "#141A2D"},
    tabBarIcon: () =>  <AntDesign name="home" size={28} color="white" />
}

const headerOptionTransference = {
    headerLeft: () => (
        <Image style={{ width: 50, height: 50 }} source={require("../assets/Logo.png")} />
    ),
    headerTitleAlign: 'center',
    headerTitle: 'COSMOS',
    headerTitleStyle: {color: "#FFF"},
    headerStyle: {backgroundColor: "#141A2D"},
    tabBarIcon: () =>  <MaterialIcons name="compare-arrows" size={34} color="white" />
}

const headerOptionSettings = {
    headerLeft: () => (
        <Image style={{ width: 50, height: 50 }} source={require("../assets/Logo.png")} />
    ),
    headerTitleAlign: 'center',
    headerTitle: 'COSMOS',
    headerTitleStyle: {color: "#FFF"},
    headerStyle: {backgroundColor: "#141A2D"},
    tabBarIcon: () =>  <Feather name="settings" size={24} color="white" />
}

const navigatorTab = {
    tabBarStyle: {backgroundColor: '#000'},
    tabBarLabelStyle: {fontSize: 11},
    tabBarActiveTintColor: '#00a3ff'
}

const NavigationHome = ({ route }) => {
    const { jwtToken } = route.params;
    return (
        <Tab.Navigator screenOptions={navigatorTab}>
            <Tab.Screen name="Inicio" component={Home} options={headerOptionHome} initialParams={{ jwtToken }} />
            <Tab.Screen name="Transferencia" component={WireTransference} options={headerOptionTransference} initialParams={{ jwtToken }} />
            <Tab.Screen name="Ajustes" component={Settings} options={headerOptionSettings} initialParams={{ jwtToken }} />
        </Tab.Navigator>
    )
}

const style = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default NavigationHome;