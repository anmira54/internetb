import React from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';


const Settings = () => {
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


    const signOutAccount = () => {
        signOut(auth)
            .then(() => navigation.navigate('Hello'))
            .catch(error => Alert.alert(error.message));
    }

    return (
        <View style={styles.conatiner}>
            <Text>Settings</Text>
            <TouchableOpacity style={styles.TouchableOpacity} onPress={signOutAccount}>
                <Text style={styles.Text}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    TouchableOpacity: {
        width: 250,
        borderRadius: 10,
        backgroundColor: '#00bfff',
        marginTop: 12,
        padding: 9
    },
    Text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
        fontFamily: 'sans-serif'
    },
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default Settings;