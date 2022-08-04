import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from 'react-native'
import Login from "./Login";
import SignUp from "./SignUp";
import NavigationHome from "./NavigationHome";
import Hello from './Hello';
  
const Stack = createNativeStackNavigator();

const headerOption = {
    headerTitle: () => (
        <Image style={{ width: 50, height: 50 }} source={require("../assets/Logo.png")} />
    ),
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: "#141A2D" }
}

const headerOptionTab = {
    headerTitle: () => (
        <Image style={{ width: 50, height: 50 }} source={require("../assets/Logo.png")} />
    ),
    headerShown: false,
    headerTitleAlign: 'center'
}

const Navigation = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen name="Hello" component={Hello} options={headerOption} />
                <Stack.Screen name="Iniciar Sesión" component={Login} options={headerOption} />
                <Stack.Screen name="Registro" component={SignUp} options={headerOption} />
                <Stack.Screen name="NavigationHome" component={NavigationHome} options={headerOptionTab} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;