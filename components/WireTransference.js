import { SERVER_ADDRESS } from '@env';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, RefreshControl, ScrollView } from 'react-native';
import axios from 'axios';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const WireTransference = ({ route }) => {
    const { jwtToken } = route.params;

    const [transactions, setTransactions] = useState([]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []); //This is to refresh the page


    // In the server address you need to put your private ip to access the data
    //Also you need to have cors in the api, this is only to dev

    const transactionList = async () => {
        const res = await axios.get(SERVER_ADDRESS + '/api/transaction', {
            headers: {
                Authorization: 'Bearer ' + jwtToken
            }
        })
            .then(resolve => setTransactions(resolve.data))
    };

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
                <Text>WireTransference</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default WireTransference;