import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useTarefaStore } from '../store/useTarefaStore';

export default function Cadastro({ navigation }) {
    const [fontesCarregadas] = useFonts({ 'Gooper': require('../../assets/fonts/Gooper.otf') });

    const { cadastrarUsuario } = useTarefaStore();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    
    function handleCadastro() {
        if (!nome.trim()) {
            return Alert.alert("Ops!", "Por favor, digite como gostaria de ser chamada(o).");
        }
        if (!email.trim() || !email.includes('@')) {
            return Alert.alert("E-mail Inválido", "Por favor, digite um endereço de e-mail válido com '@'.");
        }
        if (!senha.trim() || senha.length < 4) {
            return Alert.alert("Senha Fraca", "Sua senha deve ter pelo menos 4 caracteres.");
        }


        cadastrarUsuario(nome, email.toLowerCase(), senha);
    }

    if (!fontesCarregadas) return null;

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>

                <View style={styles.header}>
                    <View style={styles.logoCircle}><Text style={styles.logoText}>✨</Text></View>
                    <Text style={styles.title}>Crie sua conta</Text>
                    <Text style={styles.subtitle}>E comece a focar no que importa.</Text>
                </View>

                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Seu nome" value={nome} onChangeText={setNome} />
                    <TextInput style={styles.input} placeholder="Seu e-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                    <TextInput style={styles.input} placeholder="Crie uma senha" value={senha} onChangeText={setSenha} secureTextEntry />

                    <TouchableOpacity style={styles.btnAcessar} onPress={handleCadastro}>
                        <Text style={styles.btnAcessarText}>Criar Conta e Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
                        <Text style={styles.btnVoltarText}>Já tem uma conta? <Text style={{fontWeight: 'bold'}}>Faça Login</Text></Text>
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
    logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#c8b6ff', justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 5 },
    logoText: { fontSize: 35, color: '#fff', fontWeight: 'bold' },
    title: { fontSize: 32, color: '#4a0080', fontFamily: 'Gooper' },
    subtitle: { fontSize: 16, color: '#8a5a9e', marginTop: 5 },
    form: { backgroundColor: '#fff', padding: 24, borderRadius: 25, elevation: 3 },
    input: { backgroundColor: '#f5f5f5', borderRadius: 15, paddingHorizontal: 20, height: 55, fontSize: 16, marginBottom: 15 },
    btnAcessar: { backgroundColor: '#ca7df9', height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    btnAcessarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    btnVoltar: { marginTop: 20, alignItems: 'center' },
    btnVoltarText: { color: '#888', fontSize: 15 }
});