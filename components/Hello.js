import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_700Bold, Raleway_400Regular } from '@expo-google-fonts/raleway';
import { AntDesign } from '@expo/vector-icons';


const Hello = () => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Raleway_400Regular
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.secondContainer}>
                <Text style={styles.cosmos}>COSMOS</Text>
            </View>
            <View style={styles.thirdContainer}>
                <Text style={styles.welcome}>¡Bienvenido!</Text>
                <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Iniciar Sesión')}>
                    <View style={styles.icons}>
                        <AntDesign name="user" size={80} color="black" />
                        <Text style={styles.Text}>Acceso clientes</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Registro')}>
                    <View style={styles.icons}>
                        <AntDesign name="adduser" size={80} color="black" />
                        <Text style={styles.Text}>Registro clientes</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141A2D'
    },
    secondContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    thirdContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icons: {
        flexDirection: 'row',
        paddingLeft: 9
    },
    buttons: {
        width: 250,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#00bfff',
        margin: 9,
        padding: 9
    },
    Text: {
        color: 'black',
        fontSize: 30,
        fontFamily: 'Raleway_400Regular'
    },
    cosmos: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 50,
        color: "#fff"
    },
    welcome: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 30,
        color: "#fff",
        bottom: 30        
    }
});

export default Hello;
