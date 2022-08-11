import { SERVER_ADDRESS } from "@env";
import React, { useState, useRef, useEffect } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
    RefreshControl,
    ScrollView,
    Alert,
} from "react-native";
import AppLoading from "expo-app-loading";
import {
    useFonts,
    Raleway_700Bold,
    Raleway_400Regular,
} from "@expo-google-fonts/raleway";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase-config";
import ModalWireTransference from "./ModalWireTransference";

const WireTransference = ({ route }) => {
    const { jwtToken } = route.params;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const [beneficiarie, setBeneficiarie] = useState("");
    const [payment, setPayment] = useState();
    const [description, setDescription] = useState("");
    const [userBank, setUserBank] = useState("");
    const [userBankDestinationName, setUserBankDestinationName] = useState("");
    const [amountAvilaible, setAmountAvilaible] = useState(0);
    const [showModal, setShowModal] = useState(false);
    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Raleway_400Regular,
    });

    // In the server address you need to put your private ip to access the data
    //Also you need to have cors in the api, this is only to dev

    const cleanInput = () => {
        setBeneficiarie("");
        setPayment();
        setDescription("");
    };

    useEffect(() => {
        const bankAccount = async () => {
            const data = await axios.get(SERVER_ADDRESS + "/api/user", {
                headers: {
                    Authorization: "Bearer " + jwtToken,
                },
                params: {
                    id: auth.currentUser.uid,
                },
            });
            setUserBank(data.data.addressBankAccount);
        };

        bankAccount();
        return ;
    }, []);

    useEffect(() => {
        const userBankDestinationName = async () => {
            const data = await axios.get(SERVER_ADDRESS + "/api/userbankname", {
                headers: {
                    Authorization: "Bearer " + jwtToken,
                },
                params: {
                    id: beneficiarie,
                },
            });
            setUserBankDestinationName(
                "Beneficiario " + data.data.name + " " + data.data.lastname
            );
        };
        userBankDestinationName();
        return ;
    }, [beneficiarie]);

    useEffect(() => {
        const amountAvilaible = async () => {
            const data = await axios.get(SERVER_ADDRESS + "/api/bankaccount", {
                headers: {
                    Authorization: "Bearer " + jwtToken,
                },
                params: {
                    id: userBank,
                },
            });
            setAmountAvilaible(data.data.generalBalance);
        };
        amountAvilaible();
        return ;
    }, [userBank]);

    function showModalFunction() {
        if (beneficiarie.length === 10) {
            if (!userBankDestinationName.includes("undefined")) {
                if (userBank !== beneficiarie) {
                    if (payment <= amountAvilaible) {
                        if (payment > 0) {
                            if (description.length > 0) {
                            setShowModal(!showModal);}
                            else {
                                Alert.alert("Error", "Necesita ingresar una descripción");
                            }
                        } else {
                            Alert.alert("Error","El monto debe ser mayor a 0");
                        }
                    } else {
                        Alert.alert(
                            "Error",
                            "El monto de la transferencia no puede ser mayor al saldo disponible"
                        );
                    }
                } else {
                    Alert.alert(
                        "Error",
                        "No puede transferir a su misma cuenta"
                    );
                }
            } else {
                Alert.alert("Error", "Beneficiario invalido");
            }
        } else {
            Alert.alert("Error", "Beneficiario invalido");
        }
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.thirdContainer}>
                    <Text style={styles.signup}>Transacción</Text>
                    <TextInput
                        style={styles.input}
                        maxLength={10}
                        onChangeText={(text) =>
                            setBeneficiarie(text.replace(/[^0-9]/g, ""))
                        }
                        value={beneficiarie}
                        placeholder="Beneficiario"
                        placeholderTextColor="#7d7e80"
                        autoCorrect={false}
                        returnKeyType="next"
                        keyboardType="numeric"
                        onSubmitEditing={() => ref_input2.current.focus()}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) =>
                            setPayment(text.replace(/[^0-9]/g, ""))
                        }
                        value={payment}
                        maxLength={5}
                        placeholder="Monto a pagar"
                        placeholderTextColor="#7d7e80"
                        autoCorrect={false}
                        returnKeyType="next"
                        keyboardType="numeric"
                        ref={ref_input2}
                        onSubmitEditing={() => ref_input3.current.focus()}
                    />
                    <TextInput
                        style={styles.inputDescription}
                        onChangeText={(text) =>
                            setDescription(
                                text.replace(/[^A-Za-z0-9 ,.=#$@-]/g, "")
                            )
                        }
                        value={description}
                        maxLength={100}
                        placeholder="Descripción"
                        placeholderTextColor="#7d7e80"
                        ref={ref_input3}
                    />
                    <View style={styles.acceptCancelInput}>
                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={cleanInput}
                        >
                            <Text style={styles.Text}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={showModalFunction}
                        >
                            <Text style={styles.Text}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View>
                {showModal ? (
                    <ModalWireTransference
                        person={userBankDestinationName}
                        amount={payment}
                        description={description}
                        originate={userBank}
                        destination={beneficiarie}
                        jwtToken={jwtToken}
                        generalBalance={amountAvilaible}
                        hideInParent={setShowModal}
                        cleanBeneficiarie={setBeneficiarie}
                        cleanAmount={setPayment}
                        cleanDescription={setDescription}
                    />
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    thirdContainer: {
        flex: 2,
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 40,
        width: 250,
        margin: 9,
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        borderRadius: 10,
        color: "#000",
    },
    inputDescription: {
        height: 200,
        width: 250,
        margin: 9,
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        borderRadius: 10,
        color: "#000",
    },
    signup: {
        fontFamily: "Raleway_700Bold",
        fontSize: 30,
        color: "#000",
        bottom: 30,
    },
    acceptCancelInput: {
        flexDirection: "row",
        marginTop: 30,
    },
    buttons: {
        borderRadius: 10,
        width: 150,
        backgroundColor: "#00bfff",
        margin: 20,
        padding: 9,
    },
    Text: {
        textAlign: "center",
        color: "black",
        fontSize: 15,
        fontFamily: "sans-serif",
    },
});

export default WireTransference;
