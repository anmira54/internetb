import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';


const Login = () => {

    const ref_input2 = useRef();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("NavigationHome");
            }
        })

        return unsubscribe
    }, [])

    const loginAccount = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                if (userCredential) {
                    navigation.navigate('NavigationHome')
                }
            }) //usercredential with a callfunction to get the userid
            .catch((error) => Alert.alert(error.message));
    }



    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="E-mail"
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
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="password"
                ref={ref_input2}
                onSubmitEditing={() => loginAccount()}
            />
            <TouchableOpacity style={styles.TouchableOpacity} onPress={loginAccount}>
                <Text style={styles.Text}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.Text}>Registrarse</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    TouchableOpacity: {
        width: 250,
        borderRadius: 10,
        backgroundColor: '#00bfff',
        marginTop: 12,
        padding: 9,
    },
    Text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
        fontFamily: 'sans-serif',
    },
});

export default Login;
