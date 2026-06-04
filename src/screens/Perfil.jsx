import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useTarefaStore } from '../store/useTarefaStore';

export default function Perfil() {
    const [fontesCarregadas] = useFonts({
        'Gooper': require('../../assets/fonts/Gooper.otf'),
    });

    const { tarefas, fazerLogout, nomeUsuario } = useTarefaStore();
    const totalConcluidas = tarefas.filter(t => t.feita).length;

    const [notificacoes, setNotificacoes] = useState(false);
    const [modoEscuro, setModoEscuro] = useState(false);

    // 🚀 A FUNÇÃO DE SIMULAÇÃO (Sem usar o agendador nativo que quebra o Expo Go 53)
    function ativarNotificacoes(valor) {
        setNotificacoes(valor);

        if (valor === true) {
            console.log("Iniciando simulação de notificação para evitar o erro do SDK 53...");

            // Espera 3 segundos e mostra um alerta na tela simulando o banner
            setTimeout(() => {
                Alert.alert(
                    "🔔 Tudo pronto, " + (nomeUsuario || "Visitante") + "!",
                    "Na versão final do app (em Produção), isto seria um banner de notificação nativa no topo da tela do seu celular."
                );
            }, 3000);
        }
    }

    if (!fontesCarregadas) return null;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                <View style={styles.profileHeader}>
                    <View style={styles.avatarGiga}>
                        <Text style={styles.avatarTextoGiga}>
                            {nomeUsuario ? nomeUsuario.charAt(0).toUpperCase() : 'U'}
                        </Text>
                    </View>
                    <Text style={styles.userName}>{nomeUsuario || "Utilizador"}</Text>
                    <Text style={styles.userEmail}>O seu painel pessoal</Text>
                </View>

                <View style={styles.conquistasContainer}>
                    <Text style={styles.sectionTitle}>Seu Impacto</Text>
                    <View style={styles.conquistaCard}>
                        <Ionicons name="trophy" size={32} color="#ffd700" />
                        <View style={styles.conquistaInfo}>
                            <Text style={styles.conquistaNumero}>{totalConcluidas} Tarefas</Text>
                            <Text style={styles.conquistaLabel}>Concluídas com sucesso!</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionTitle}>Configurações do App</Text>

                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="notifications" size={22} color="#ca7df9" />
                            <Text style={styles.settingText}>Notificações Diárias</Text>
                        </View>
                        <Switch
                            value={notificacoes}
                            onValueChange={ativarNotificacoes}
                            trackColor={{ false: "#eee", true: "#e7c6ff" }}
                            thumbColor={notificacoes ? "#ca7df9" : "#ccc"}
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="moon" size={22} color="#ca7df9" />
                            <Text style={styles.settingText}>Modo Escuro (Fictício)</Text>
                        </View>
                        <Switch
                            value={modoEscuro}
                            onValueChange={setModoEscuro}
                            trackColor={{ false: "#eee", true: "#e7c6ff" }}
                            thumbColor={modoEscuro ? "#ca7df9" : "#ccc"}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={fazerLogout}>
                    <Ionicons name="log-out" size={20} color="#ff4d4d" />
                    <Text style={styles.logoutText}>Sair da Conta</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9fb' },
    profileHeader: { alignItems: 'center', paddingTop: 50, paddingBottom: 30, backgroundColor: '#fff', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 2 },
    avatarGiga: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ffd6ff', justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 3 },
    avatarTextoGiga: { fontSize: 36, color: '#ca7df9', fontFamily: 'Gooper' },
    userName: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    userEmail: { fontSize: 14, color: '#aaa', marginTop: 4 },
    conquistasContainer: { padding: 24 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 15 },
    conquistaCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 20, borderRadius: 20, alignItems: 'center', elevation: 2 },
    conquistaInfo: { marginLeft: 15 },
    conquistaNumero: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    conquistaLabel: { fontSize: 13, color: '#888', marginTop: 2 },
    settingsContainer: { paddingHorizontal: 24 },
    settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 15, marginBottom: 10, elevation: 1 },
    settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    settingText: { fontSize: 15, color: '#444', fontWeight: '500' },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 24, marginTop: 30, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ff4d4d', paddingVertical: 15, borderRadius: 15 },
    logoutText: { color: '#ff4d4d', fontWeight: 'bold', fontSize: 16 }
});