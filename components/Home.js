import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const Home = ({ route }) => {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []); //This is to refresh the page

    const { jwtToken } = route.params;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    function jet() {
        console.log(jwtToken)
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scroll}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text>Home</Text>
                <TouchableOpacity onPress={jet}>
                    <Text>Presioname</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})

export default Home;