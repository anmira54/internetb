import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    useFonts,
    Raleway_700Bold,
    Raleway_400Regular,
} from "@expo-google-fonts/raleway";
import AppLoading from "expo-app-loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const transactionListOriginate = (props) => {
    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Raleway_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <View style={styles.box}>
            <Text style={styles.text}>{props.concept}</Text>
            <MaterialCommunityIcons
                name="arrow-right-bottom"
                size={18}
                color="#a30013"
            />
            <Text style={styles.text}>{props.date.split("T")[0]}</Text>
            <Text style={styles.text}>US$ {props.amount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        height: 100,
        width: 370,
        borderColor: 'transparent',
        borderTopColor: "#000",
        borderBottomColor: "#000",
        marginTop: -2,
        borderWidth: 3,
        alignItems: "center",
    },
    text: {
        color: "#a30013",
        fontFamily: "Raleway_400Regular",
    },
    textTransfer: {
        color: "#00a3ff",
        fontFamily: "Raleway_400Regular",
    },
});

export default transactionListOriginate;
