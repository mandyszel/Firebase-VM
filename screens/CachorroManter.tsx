import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { auth, firestore, storage } from '../firebase';
import { KeyboardAvoidingView, StyleSheet, View, Alert, Text, TextInput, TouchableOpacity, Pressable, Image, FlatList, ActivityIndicator} from "react-native";
import estilo from "../estilo";
import { Cachorro } from "../model/Cachorro";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes } from "firebase/storage";
import { ScrollView } from "react-native-gesture-handler";

const CachorroManter = () => {
    const [formCachorro, setFormCachorro]=
    useState<Partial<Cachorro>>({})

    const [imagePath, setImagePath] = useState('https://cdn-icons-png.flaticon.com/512/3318/3318274.png');

    const refCachorro = firestore.collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Cachorro")

    const [loading, setLoading] = useState(true);
    const [atualizar,setAtualizar] = useState(true)
    const [cachorro, setCachorro] = useState<Cachorro[]>([]);

    const Salvar = async() => {
        const cachorro = new Cachorro(formCachorro);

        if(cachorro.id === undefined){
            const refIdCachorro = refCachorro.doc();
            cachorro.id = refIdCachorro.id;        

            refIdCachorro
            .set(cachorro.toFirestore())
            .then(() => {
             alert("Cachorro adicionado!");
             Limpar();
        })
        .catch( error => alert(error.message)) 
        } else {
            const refIdCachorro = refCachorro.doc(cachorro.id);
            refIdCachorro.update(cachorro.toFirestore())
            .then(() => {
                alert("Cachorro atualizado!")
                Limpar()
            })
            .catch( error => alert(error.message)) 
        }
        setAtualizar(true) 
    }

    const Limpar = () => {
        setFormCachorro({});
        setImagePath('https://cdn-icons-png.flaticon.com/512/3318/3318274.png');
    }

    // FUNÇÕES FOTO
    const selecionaFoto = () => {
        Alert.alert(
            "Selecionar Foto",
            "Escolha uma alternativa:",
            [
                {
                    text: "Câmera",
                    onPress: () => abrirCamera()
                },
                {
                    text: "Abrir Galeria",
                    onPress: () => abrirGaleria()
                }
            ]
        );
    }

    const abrirCamera = async () => {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();
        if (permissao.granted === false){
            alert("Você recusou o acesso à câmera");
            return;
        }
        const foto = await ImagePicker.launchCameraAsync();
        enviaFoto(foto);
    }

    const abrirGaleria = async() => {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissao.granted === false){
            alert("Você recusou o acesso à câmera");
            return;
        }
        const foto = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });
        enviaFoto(foto);
    }

    const enviaFoto = async (foto) => {
        setImagePath(foto.assets[0].uri);
        const filename = foto.assets[0].fileName;
        const ref = storage.ref(`imagens/${filename}`);

        const img = await fetch(foto.assets[0].uri);
        const bytes = await img.blob();
        const fbResult = await uploadBytes(ref, bytes);

        const urlDownload = await storage.ref(
            fbResult.metadata.fullPath
        ).getDownloadURL();

        setFormCachorro({... formCachorro,urlfoto: urlDownload});
    }
    
    //FLATLIST
    useEffect(() => {
        if (loading){
            listarTodos()
        }
    }, [cachorro]);

    const listarTodos = () =>{
        const subscriber = refCachorro
            .onSnapshot((querySnapshot) => {
                const cachorro = [];
                querySnapshot.forEach((documentSnapshot) => {
                    cachorro.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });
                setCachorro(cachorro);
                setLoading(false);
                setAtualizar(false)
            });
            return () => subscriber();
    }

    if (loading){
        return <ActivityIndicator 
                    size="60" 
                    color="#0782F9"
                    style={estilo.tela}
                />
    }


    const renderItem = ({ item }) => <Item item={item} />
    const Item = ({ item }) => (
        <TouchableOpacity style={estilo.item}
            onPress={()=>editar(item)}
            onLongPress={()=> excluir(item)}
            >
            <Image style={estilo.imagemListar} source={{uri : item.urlfoto}} />
            <Text style={estilo.titulo}>Nome: {item.nome}</Text>
            <Text style={estilo.titulo}>Raça: {item.raca}</Text>
            <Text style={estilo.titulo}>Sexo: {item.sexo}</Text>
            <Text style={estilo.titulo}>Nasc: {item.datanasc}</Text>
        
        </TouchableOpacity>
    )

    //excluir e editar
    const excluir = async (item) =>{
        Alert.alert(
            "Excluir "+item.nome+"?",
            "Cachorro não poderá ser recuperado",
            [
            {
                text:"Cancelar"
            },
            {
                text:"Excluir",
                onPress:async()=>{
                    const resultado=await refCachorro
                    .doc(item.id)
                    .delete()
                    .then(()=>{
                            alert("Cachorro excluido!");
                            setAtualizar(true);
                    })
                }
            }
            ]
        )

    }
    const editar = async(item) => {
        const resultado = firestore.collection('Usuario')
        .doc(auth.currentUser?.uid)
        .collection('Cachorro')
        .doc(item.id)
        .onSnapshot(documentSnapshot => {
            const cachorro = new Cachorro(documentSnapshot.data())
            setFormCachorro(cachorro)
            setImagePath(cachorro.urlfoto)
        })
    
    }


    return (
        <ScrollView>
        <KeyboardAvoidingView style={estilo.container}>
            <View style={estilo.inputContainer}>
                <Pressable onPress={ () => selecionaFoto() }>
                    <View style={estilo.imagemView}>
                        <Image source={{ uri: imagePath }} style={estilo.imagem}/>
                    </View>
                </Pressable>


                <TextInput 
                    placeholder="Nome" 
                    value={formCachorro.nome}
                    onChangeText={texto => setFormCachorro({
                        ...formCachorro,
                        nome: texto
                    }) }
                    style={estilo.input} 
                />
                <TextInput 
                    placeholder="Raca" 
                    value={formCachorro.raca}
                    onChangeText={texto => setFormCachorro({
                        ...formCachorro,
                        raca: texto
                    }) }
                    style={estilo.input} 
                />
                <TextInput 
                    placeholder="Pelo" 
                    value={formCachorro.pelo}
                    onChangeText={texto => setFormCachorro({
                        ...formCachorro,
                        pelo: texto
                    }) }
                    style={estilo.input} 
                />
                <TextInput 
                    placeholder="Sexo" 
                    value={formCachorro.sexo}
                    onChangeText={texto => setFormCachorro({
                        ...formCachorro,
                        sexo: texto
                    }) }
                    style={estilo.input} 
                />
                <TextInput 
                    placeholder="Data Nascimento" 
                    value={formCachorro.datanasc}
                    onChangeText={texto => setFormCachorro({
                        ...formCachorro,
                        datanasc: texto
                    }) }
                    style={estilo.input} 
                />
            </View> 
            <View style={estilo.buttonContainer}>
                <TouchableOpacity 
                    style={[estilo.button, estilo.buttonOutline]}
                    onPress={Limpar}
                >
                    <Text style={[estilo.buttonText, estilo.buttonOutlineText]}>Limpar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[estilo.button]}
                    onPress={Salvar}
                >
                    <Text style={[estilo.buttonText]}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={cachorro}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshing = {atualizar}
                onRefresh={() => listarTodos()}
            />
        </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default CachorroManter;