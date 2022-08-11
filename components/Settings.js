import React, { useEffect, useState, useRef } from "react";
import { SERVER_ADDRESS } from "@env";
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    StyleSheet,
    TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
    getAuth,
    signOut,
    updateEmail,
    sendPasswordResetEmail,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase-config";
import {
    useFonts,
    Raleway_700Bold,
    Raleway_400Regular,
} from "@expo-google-fonts/raleway";
import AppLoading from "expo-app-loading";
import axios from "axios";

const Settings = () => {
    const navigation = useNavigation();

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Raleway_400Regular,
    });

    useEffect(() => {
        const data = async () => {
            const email = await auth.currentUser.email;
            const dataUser = await axios.get(SERVER_ADDRESS + "/api/user", {
                headers: {
                    Authorization:
                        "Bearer " + (await auth.currentUser.accessToken),
                },
                params: {
                    id: await auth.currentUser.uid,
                },
            });
            setName(dataUser.data.name);
            setLastname(dataUser.data.lastname);
            setEmail(email);
        };
        data();
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const updateData = async () => {
        const data = await axios.put(
            SERVER_ADDRESS + "/api/users",
            {
                name: name,
                lastname: lastname,
                email: email,
                uid: await auth.currentUser.uid,
            },
            {
                headers: {
                    Authorization:
                        "Bearer " + (await auth.currentUser.accessToken),
                },
            }
        );
        Alert.alert("Exito", "Datos actualizados");
    };

    const resetPassword = () => {
        if (email != "") {
            sendPasswordResetEmail(auth, email)
                .then(() =>
                    Alert.alert(
                        "Exito",
                        "Un email de recuperacion fue enviado al correo " +
                            email
                    )
                )
                .catch((error) => Alert.alert(error.message));
        } else {
            Alert.alert("Error", "Ingrese un correo electronico");
        }
    };

    const confirmData = async () => {
        try {
            await updateEmail(auth.currentUser, email);
            updateData();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };
    const signOutAccount = () => {
        signOut(auth)
            .then(() => navigation.navigate("Hello"))
            .catch((error) => Alert.alert(error.message));
    };

    return (
        <View style={styles.conatiner}>
            <View style={styles.settingsContainer}>
                <Text style={styles.Text}>Datos de la cuenta</Text>
                <TextInput
                    value={name}
                    onChangeText={(text) =>
                        setName(text.replace(/[^A-Za-z]/g, ""))
                    }
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#7d7e80"
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input2.current.focus()}
                />
                <TextInput
                    value={lastname}
                    onChangeText={(text) =>
                        setLastname(text.replace(/[^A-Za-z]/g, ""))
                    }
                    style={styles.input}
                    placeholder="Apellido"
                    placeholderTextColor="#7d7e80"
                    returnKeyType="next"
                    ref={ref_input2}
                    onSubmitEditing={() => ref_input3.current.focus()}
                />
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#7d7e80"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="email"
                    ref={ref_input3}
                />
                <TouchableOpacity
                    style={styles.TouchableOpacity}
                    onPress={confirmData}
                >
                    <Text style={styles.logoutText}>Actualizar datos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.TouchableOpacity}
                    onPress={resetPassword}
                >
                    <Text style={styles.logoutText}>
                        ¿Has olvidado tu contraseña?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.TouchableOpacity}
                    onPress={signOutAccount}
                >
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    TouchableOpacity: {
        width: 250,
        borderRadius: 10,
        backgroundColor: "#00bfff",
        marginTop: 12,
        padding: 9,
    },
    TouchableOpacityLogout: {
        width: 100,
        borderRadius: 10,
        backgroundColor: "#00bfff",
        marginTop: 12,
        padding: 9,
    },
    Text: {
        textAlign: "center",
        color: "black",
        fontSize: 28,
        fontFamily: "Raleway_700Bold",
    },
    logoutText: {
        textAlign: "center",
        color: "black",
        fontSize: 15,
        fontFamily: "sans-serif",
    },
    settingsContainer: {
        flex: 2,
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
    logout: {
        marginBottom: 20,
        marginLeft: 270,
    },
});
export default Settings;
