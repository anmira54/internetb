import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
    useFonts,
    Raleway_700Bold,
    Raleway_400Regular,
} from "@expo-google-fonts/raleway";
import AppLoading from "expo-app-loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { SERVER_ADDRESS } from "@env";
import TransactionListDestination from "./TransactionListDestination";
import TransactionListOriginate from "./TransactionListOriginate";

const Transaction = (props) => {
    const [transactionJsonOriginate, setTransactionJsonOriginate] = useState(
        []
    );
    const [transactionJsonDestination, setTransactionJsonDestination] =
        useState([]);

    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Raleway_400Regular,
    });

    useEffect(() => {
        console.log(SERVER_ADDRESS);
        let endpoints = [
            SERVER_ADDRESS + "/api/transaction/originate",
            SERVER_ADDRESS + "/api/transaction/destination",
        ];

        let headerParams = {
            headers: {
                Authorization: "Bearer " + props.jwtToken,
            },
            params: {
                id: props.addressBankAccount,
            },
        };

        const listTransactions = async () => {
            const listTransactionOriginate = await axios.get(
                endpoints[0],
                headerParams
            );
            const listTransactionDestination = await axios.get(
                endpoints[1],
                headerParams
            );
            setTransactionJsonOriginate(listTransactionOriginate.data);
            setTransactionJsonDestination(listTransactionDestination.data);
        };
        listTransactions();
    }, [props.refreshing, props.show]);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const transactionDestination = () => {
        const transactionList = transactionJsonOriginate.concat(
            transactionJsonDestination
        );

        const tListByDate = transactionList.sort((a, b) =>
            a.date < b.date ? 1 : -1
        );

        return tListByDate.map((res) => {
            if (res.originalAddressBankAccount === props.addressBankAccount) {
                return (
                    <TransactionListOriginate
                        concept={res.reason}
                        date={res.date}
                        amount={res.amount}
                    />
                );
            } else {
                return (
                    <TransactionListDestination
                        concept={res.reason}
                        date={res.date}
                        amount={res.amount}
                    />
                );
            }
        });
    };

    return <View>{transactionDestination()}</View>;
};

export default Transaction;
