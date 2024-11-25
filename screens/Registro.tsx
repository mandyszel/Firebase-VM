import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { KeyboardAvoidingView, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import estilo from "../estilo";
import { Usuario } from "../model/Usuario";

const Registro = () => {
    const [formUsuario, setFormUsuario]=
    useState<Partial<Usuario>>({})

    const refUsuario=firestore.collection("Usuario");

    const navigation = useNavigation();

    useEffect(() => {
        const logout = auth.onAuthStateChanged(user => {
            if (user) navigation.replace("Home");
        })
    })

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(formUsuario.email, formUsuario.senha)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registrado como ', user.email);

                const refIdUsuario = refUsuario.doc(auth.currentUser.uid);
                refIdUsuario.set({
                    id: auth.currentUser.uid,
                    nome: formUsuario.nome,
                    email: formUsuario.email,
                    senha: formUsuario.senha,
                    datanasc: formUsuario.datanasc
                })

            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={estilo.container}>
            <View style={estilo.inputContainer}>
                <TextInput 
                    placeholder="Nome" 
                    onChangeText={texto => setFormUsuario({
                        ...formUsuario,
                        nome: texto
                    }) }
                    style={estilo.input} 
                />
                <TextInput 
                    placeholder="Email" 
                    onChangeText={texto => setFormUsuario({
                        ...formUsuario,
                        email: texto
                    }) }
                    style={estilo.input} 
                />
                <TextInput 
                    placeholder="Senha" 
                    onChangeText={texto => setFormUsuario({
                        ...formUsuario,
                        senha: texto
                    }) }
                    secureTextEntry
                    style={estilo.input} 
                />
                <TextInput 
                    placeholder="Data Nascimento" 
                    onChangeText={texto => setFormUsuario({
                        ...formUsuario,
                        datanasc: texto
                    }) }
                    style={estilo.input} 
                />
            </View> 
            <View style={estilo.buttonContainer}>
                <TouchableOpacity 
                    style={[estilo.button, estilo.buttonOutline]}
                    onPress={handleSignUp}
                >
                    <Text style={[estilo.buttonText, estilo.buttonOutlineText]}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );

}

export default Registro;