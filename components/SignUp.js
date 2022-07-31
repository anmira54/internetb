import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';


const SignUp = () => {

    const ref_input2 = useRef();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const createAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => Alert.alert('Usuario registrado')) //usercredential with a callfunction to get the userid
            .catch(error => Alert.alert(error.message));
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
                onSubmitEditing={() => createAccount()}
            />
            <TouchableOpacity style={styles.TouchableOpacity} onPress={createAccount}>
                <Text style={styles.Text}>Registrarse</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


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

export default SignUp;