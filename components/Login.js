import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_700Bold, Raleway_400Regular } from '@expo-google-fonts/raleway';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';


const Login = () => {

    const ref_input2 = useRef();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Raleway_400Regular
    })


    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                const tokenWait = await auth.currentUser.getIdToken().then();
                navigation.navigate('NavigationHome', {
                    jwtToken: tokenWait
                })
            }
        })

        return unsubscribe
    }, [])

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const loginAccount = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async userCredential => {
                if (userCredential) {
                    const tokenWait = await auth.currentUser.getIdToken().then();
                    navigation.navigate('NavigationHome', {
                        jwtToken: tokenWait
                    })
                }
            }) //usercredential with a callfunction to get the userid
            .catch((error) => Alert.alert(error.message));
    }

    const resetPassword = () => {
        if (email != '') {
        sendPasswordResetEmail(auth, email)
            .then(() => Alert.alert("Exito",'Un email de recuperacion fue enviado al correo ' + email))
            .catch((error) => Alert.alert(error.message));
        } else {
            Alert.alert("Error", "Ingrese un correo electronico")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.secondContainer}>
                <Text style={styles.cosmos}>COSMOS</Text>
            </View>
            <View style={styles.thirdContainer}>
            <Text style={styles.login}>Iniciar sesión</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    placeholder="E-mail"
                    placeholderTextColor="#fff" 
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="email"
                    returnKeyType='next'
                    onSubmitEditing={() => ref_input2.current.focus()}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    value={password}
                    placeholder="Contraseña"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="password"
                    ref={ref_input2}
                    onSubmitEditing={() => loginAccount()}
                />
                <TouchableOpacity style={styles.buttons} onPress={loginAccount}>
                    <Text style={styles.Text}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={resetPassword}>
                    <Text style={styles.Text}>¿Has olvidado tu contraseña?</Text>
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
    input: {
        height: 40,
        width: 250,
        margin: 9,
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        borderRadius: 10,
        color: '#fff'
    },
    buttons: {
        width: 250,
        borderRadius: 10,
        backgroundColor: '#00bfff',
        margin: 9,
        padding: 9
    },
    Text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
        fontFamily: 'sans-serif'
    },
    cosmos: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 50,
        color: "#fff"
    },
    login: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 30,
        color: "#fff",
        bottom: 30        
    }
});

export default Login;
