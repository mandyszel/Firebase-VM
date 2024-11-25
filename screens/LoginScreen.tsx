import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { KeyboardAvoidingView, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import estilo from "../estilo";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const logout = auth.onAuthStateChanged(user => {
            if (user) navigation.replace("Menu");
        })
    })

    const irParaRegistro=()=>{
        navigation.replace("Registro");
    }

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, senha)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logado como ', user.email);
        })
        .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={estilo.container}>
            <View style={estilo.inputContainer}>
                <TextInput 
                    placeholder="Email" 
                    onChangeText={texto => setEmail(texto)}
                    style={estilo.input} 
                />
                <TextInput 
                    placeholder="Senha" 
                    onChangeText={texto => setSenha(texto)} 
                    secureTextEntry
                    style={estilo.input} 
                />
            </View> 
            <View style={estilo.buttonContainer}>
                <TouchableOpacity 
                    style={estilo.button}
                    onPress={handleLogin}
                >
                    <Text style={estilo.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[estilo.button, estilo.buttonOutline]}
                    onPress={irParaRegistro}
                >
                    <Text style={[estilo.buttonText, estilo.buttonOutlineText]}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );

}

export default LoginScreen;