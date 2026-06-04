import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useTarefaStore } from '../store/useTarefaStore';

export default function Login({ navigation }) {
    const [fontesCarregadas] = useFonts({ 'Gooper': require('../../assets/fonts/Gooper.otf') });
    const { fazerLogin } = useTarefaStore();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleLogin() {
        if (email.trim() === '' || senha.trim() === '') {
            Alert.alert("Aviso", "Preencha seu e-mail e senha.");
            return;
        }


        const acessoPermitido = fazerLogin(email.toLowerCase(), senha);

        if (!acessoPermitido) {
            Alert.alert("Acesso Negado", "E-mail ou senha incorretos. Se não tem conta, por favor, cadastre-se!");
        }
    }

    if (!fontesCarregadas) return null;

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>

                <View style={styles.header}>
                    <View style={styles.logoCircle}><Text style={styles.logoText}>✓</Text></View>
                    <Text style={styles.title}>Bem-vinda de volta!</Text>
                    <Text style={styles.subtitle}>Organize sua vida com estilo.</Text>
                </View>

                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Seu e-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                    <TextInput style={styles.input} placeholder="Sua senha" value={senha} onChangeText={setSenha} secureTextEntry />


                    <TouchableOpacity style={styles.btnAcessar} onPress={handleLogin}>
                        <Text style={styles.btnAcessarText}>Acessar Minhas Tarefas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnCriarConta} onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={styles.btnCriarContaText}>Não tem conta? <Text style={{fontWeight: 'bold'}}>Cadastre-se</Text></Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f0ff' },
    content: { flex: 1, justifyContent: 'center', padding: 24 },
    header: { alignItems: 'center', marginBottom: 40 },
    logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ca7df9', justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 5 },
    logoText: { fontSize: 40, color: '#fff', fontWeight: 'bold' },
    title: { fontSize: 32, color: '#4a0080', fontFamily: 'Gooper' },
    subtitle: { fontSize: 16, color: '#8a5a9e', marginTop: 5 },
    form: { backgroundColor: '#fff', padding: 24, borderRadius: 25, elevation: 3 },
    input: { backgroundColor: '#f5f5f5', borderRadius: 15, paddingHorizontal: 20, height: 55, fontSize: 16, marginBottom: 15 },
    btnAcessar: { backgroundColor: '#ca7df9', height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    btnAcessarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    btnCriarConta: { marginTop: 20, alignItems: 'center' },
    btnCriarContaText: { color: '#888', fontSize: 15 }
});