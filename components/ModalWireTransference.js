import { SERVER_ADDRESS } from "@env";
import React, { useState, useRef, useEffect } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Modal,
    Pressable,
    Alert,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const ModalWireTransference = (props) => {
    const [modalVisible, setModalVisible] = useState(true);

    const postTransference = async () => {
        const transaction = await axios
            .post(
                SERVER_ADDRESS + "/api/transaction",
                {
                    originalAddressBankAccount: props.originate,
                    destinationAddressBankAccount: props.destination,
                    amount: props.amount,
                    reason: props.description,
                    generalBalance: props.generalBalance,
                },
                {
                    headers: {
                        Authorization: "Bearer " + props.jwtToken,
                    },
                }
            )
            .catch((e) => {
                Alert.alert(
                    e,
                    "No se pudo realizar la transferencia, intente nuevamente"
                );
            });
    };
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <MaterialIcons
                            name="verified"
                            size={24}
                            color="black"
                        />
                        <Text style={styles.modalText}>{props.person}</Text>
                        <Text style={styles.modalText}>US${props.amount}</Text>
                        <Text style={styles.modalText}>
                            {props.description}
                        </Text>
                        <Text style={styles.modalText}>¿Confirma esta transacción?</Text>
                        
                        <View style={{ flexDirection: "row" }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    props.hideInParent(false);
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    postTransference();
                                    setModalVisible(!modalVisible);
                                    props.cleanBeneficiarie('');
                                    props.cleanAmount('');
                                    props.cleanDescription('');
                                    props.hideInParent(false);
                                }}
                            >
                                <Text style={styles.textStyle}>Aceptar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 100,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    
});
export default ModalWireTransference;
