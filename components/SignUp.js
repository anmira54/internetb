import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_700Bold, Raleway_400Regular } from '@expo-google-fonts/raleway';
import { getAuth, createUserWithEmailAndPassword, signOut, getIdToken } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';
import axios from 'axios';
import { SERVER_ADDRESS } from '@env';



const SignUp = () => {

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [registro, setRegistro] = useState('Registro')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [idCard, setIdCard] = useState('')


    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Raleway_400Regular
    })

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                signOut(auth)
            }
        })

        return unsubscribe
    }, [])

    useEffect(() => { //This effect is to know if the keybord is in use to hide the register text, because thers is no enough space
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if (isKeyboardVisible) {
            setRegistro('')
        } else {
            setRegistro('Registro')
        }
    }, [isKeyboardVisible])

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const createAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const token = userCredential.user.stsTokenManager.accessToken

                axios.post(SERVER_ADDRESS + '/api/users', {
                    uid: userCredential.user.uid,
                    name: name,
                    lastname: lastName,
                    email: email,
                    idcard: idCard
                },
                    {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    })
                    .then(() => {
                        Alert.alert('Usuario registrado')
                        navigation.navigate('NavigationHome', {
                            jwtToken: token
                        })
                    })
                    .catch((e) => Alert.alert('Ha ocurrido un error'))
            }) //usercredential with a callfunction to get the userid
            .catch(error => Alert.alert(error.message));
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.secondContainer}>
                <Text style={styles.cosmos}>COSMOS</Text>
            </View>
            <View style={styles.thirdContainer}>
                <Text style={styles.signup}>{registro}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setName(text.replace(/[^A-Za-z]/g, ''))}
                    value={name}
                    maxLength={50}
                    placeholder="Nombre"
                    placeholderTextColor="#fff"
                    autoCorrect={false}
                    returnKeyType='next'
                    onSubmitEditing={() => ref_input2.current.focus()}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setLastName(text.replace(/[^A-Za-z]/g, ''))}
                    value={lastName}
                    maxLength={50}
                    placeholder="Apellido"
                    placeholderTextColor="#fff"
                    autoCorrect={false}
                    returnKeyType='next'
                    ref={ref_input2}
                    onSubmitEditing={() => ref_input3.current.focus()}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    maxLength={320}
                    placeholder="E-mail"
                    placeholderTextColor="#fff"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="email"
                    returnKeyType='next'
                    ref={ref_input3}
                    onSubmitEditing={() => ref_input4.current.focus()}
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
                    ref={ref_input4}
                    returnKeyType='next'
                    onSubmitEditing={() => ref_input5.current.focus()}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setIdCard(text.replace(/[^0-9]/g, ''))}
                    maxLength={11}
                    value={idCard}
                    placeholder="Cédula"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    ref={ref_input5}
                    onSubmitEditing={() => createAccount()}
                />
                <TouchableOpacity style={styles.buttons} onPress={createAccount}>
                    <Text style={styles.Text}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


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
    signup: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 30,
        color: "#fff",
        bottom: 30
    }
});

export default SignUp;