import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home";
import Settings from "./Settings";
import WireTransference from "./WireTransference";

const Tab = createBottomTabNavigator();

const NavigationHome = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Transferencia" component={WireTransference} options={{ headerShown: false }} />
            <Tab.Screen name="Ajustes" component={Settings} options={{ headerShown: false }} />            
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