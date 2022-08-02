import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getAuth, getIdToken } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';

const Home = () => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const [token, setToken] = useState('');

    useEffect(() => {
        auth.currentUser.getIdToken()
            .then(token => setToken(token));
        console.log(token);
    }, [])

    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Home;