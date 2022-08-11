import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    StyleSheet,
    RefreshControl,
    ScrollView,
} from "react-native";
import AppLoading from "expo-app-loading";
import {
    useFonts,
    Raleway_700Bold,
    Raleway_400Regular,
} from "@expo-google-fonts/raleway";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase-config";
import axios from "axios";
import { SERVER_ADDRESS } from "@env";
import Transaction from "./Transaction";

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = ({ route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [addressBankAccount, setAddressBankAccount] = useState("");
    const [amount, setAmount] = useState("");
    const { jwtToken } = route.params;
    const [transactionsShow, setTransactionsShow] = useState(false);
    const [textTransaction, setTextTransaction] = useState(
        "Mostrar transacciones"
    );

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []); //This is to refresh the page

    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Raleway_400Regular,
    });

    useEffect(() => {
        let endpoints = [
            SERVER_ADDRESS + "/api/user",
            SERVER_ADDRESS + "/api/bankaccount",
        ];

        let headersParams0 = {
            headers: {
                Authorization: "Bearer " + jwtToken,
            },
            params: {
                id: auth.currentUser.uid,
            },
        };

        const addressBank = async () => {
            const request = await axios.get(endpoints[0], headersParams0);
            setAddressBankAccount(request.data.addressBankAccount);
            amountBank(request.data.addressBankAccount);
        };

        const amountBank = async (address) => {
            const request = await axios.get(endpoints[1], {
                headers: {
                    Authorization: "Bearer " + jwtToken,
                },
                params: {
                    id: address,
                },
            });
            setAmount(request.data.generalBalance);
        };

        addressBank();
        return ;
    }, [refreshing]);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const showTransaction = () => {
        setTransactionsShow(!transactionsShow);
        if (textTransaction === "Mostrar transacciones") setTextTransaction ("Ocultar transacciones")
        else setTextTransaction("Mostrar transacciones")
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scroll}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.accountDetails}>
                <Text style={styles.textConsulta}>Consulta de cuenta</Text>
                <Text style={styles.textCuenta}>Cuenta coriente</Text>
                <Text style={styles.textAddress}>{addressBankAccount}</Text>
            </View>
            <View style={styles.balance}>
                <Text style={styles.balanceText}>Balance disponible:</Text>
                <Text style={styles.balanceNumber}>US$ {amount}</Text>
            </View>
            <View style={styles.transactionListContainer}>
                <Text style={styles.transactionsText}>Transacciones</Text>
                <View>
                    {transactionsShow ? (
                        <Transaction
                            addressBankAccount={addressBankAccount}
                            jwtToken={jwtToken}
                            show={transactionsShow}
                            refreshing={refreshing}
                        />
                    ) : null
                    }
                </View>
                <TouchableOpacity
                    style={styles.TouchableOpacity}
                    onPress={showTransaction}
                >
                    <Text style={styles.Text}>{textTransaction}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        alignItems: "center",
    },
    accountDetails: {
        top: 30,
    },
    textConsulta: {
        fontSize: 30,
        textAlign: "center",
        fontFamily: "Raleway_700Bold",
    },
    textCuenta: {
        fontSize: 27,
        textAlign: "center",
        fontFamily: "Raleway_400Regular",
    },
    textAddress: {
        fontSize: 25,
        fontFamily: "Raleway_400Regular",
        textAlign: "center",
        marginTop: 10,
    },
    balance: {
        marginTop: 50,
        flexDirection: "row",
    },
    balanceText: {
        fontFamily: "Raleway_700Bold",
        fontSize: 16,
        color: "#00a3ff",
    },
    balanceNumber: {
        fontSize: 16,
        fontFamily: "Raleway_700Bold",
        textAlign: "right",
        paddingLeft: 100,
        color: "#00a3ff",
    },
    transactionsText: {
        fontSize: 30,
        textAlign: "center",
        fontFamily: "Raleway_700Bold",
        marginTop: 20,
    },
    transactionListContainer: {
        alignItems: "center",
    },
    TouchableOpacity: {
        width: 250,
        borderRadius: 10,
        backgroundColor: "#00bfff",
        marginTop: 6,
        padding: 9
    },
    Text: {
        textAlign: "center",
        color: "black",
        fontSize: 15,
        fontFamily: "sans-serif",
    },
});

export default Home;
