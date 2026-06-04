import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from '@expo/vector-icons';

import { useTarefaStore } from '../store/useTarefaStore';

const screenWidth = Dimensions.get("window").width;

export default function Home({ navigation }) {
    const [fontesCarregadas] = useFonts({
        'Bamboy': require('../../assets/fonts/Bamboy.otf'),
        'Gooper': require('../../assets/fonts/Gooper.otf'),
    });

    const [saudacao, setSaudacao] = useState("Olá");


    const { tarefas, alternarStatusFeita, nomeUsuario } = useTarefaStore();


    useEffect(() => {
        const hora = new Date().getHours();
        if (hora < 12) setSaudacao("Bom dia");
        else if (hora < 18) setSaudacao("Boa tarde");
        else setSaudacao("Boa noite");
    }, []);

    if (!fontesCarregadas) return null;

    const totalFeitas = tarefas.filter(t => t.feita).length;
    const totalPendentes = tarefas.length - totalFeitas;

    const tarefasFocoHoje = tarefas.filter(t => t.urgencia === 'alta' && !t.feita);
    const totalUrgentes = tarefasFocoHoje.length;

    const dadosGrafico = [
        { name: "Concluídas", quantidade: totalFeitas, color: "#c8b6ff", legendFontColor: "#7F7F7F", legendFontSize: 13 },
        { name: "Pendentes", quantidade: totalPendentes, color: "#ffafcc", legendFontColor: "#7F7F7F", legendFontSize: 13 }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 1. CABEÇALHO */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <View>
                            <Text style={styles.greeting}>{saudacao},</Text>
                            <Text style={styles.title}>{nomeUsuario}!</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>MG</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.subtitle}>Aqui está o seu painel de controle.</Text>
                </View>

                <View style={styles.dashboardContainer}>

                    <View style={styles.quickStatsRow}>
                        <View style={[styles.statCard, { backgroundColor: '#ffd6a5' }]}>
                            <View style={styles.iconCircle}><Text>🔥</Text></View>
                            <Text style={styles.statNumber}>{totalUrgentes}</Text>
                            <Text style={styles.statLabel}>Urgentes</Text>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: '#caffbf' }]}>
                            <View style={styles.iconCircle}><Text>✅</Text></View>
                            <Text style={styles.statNumber}>{totalFeitas}</Text>
                            <Text style={styles.statLabel}>Concluídas</Text>
                        </View>
                    </View>


                    <Text style={styles.sectionTitle}>Sua Produtividade</Text>
                    <View style={styles.chartCard}>
                        {tarefas.length > 0 ? (
                            <PieChart
                                data={dadosGrafico}
                                width={screenWidth - 80}
                                height={140}
                                chartConfig={{ color: (o = 1) => `rgba(0, 0, 0, ${o})` }}
                                accessor={"quantidade"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                                absolute
                            />
                        ) : (
                            <Text style={styles.semDadosText}>Nenhuma tarefa criada para gerar o gráfico.</Text>
                        )}
                    </View>


                    <View style={styles.focoHeader}>
                        <Text style={styles.sectionTitle}>Foco de Hoje</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Tarefas')}>
                            <Text style={styles.verTudo}>Ver tudo</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.focoScroll}>
                        {tarefasFocoHoje.length > 0 ? (
                            tarefasFocoHoje.map((tarefa) => (
                                <TouchableOpacity
                                    key={tarefa.id}
                                    style={[styles.focoCard, { borderTopColor: tarefa.cor }]}
                                    onPress={() => navigation.navigate('Tarefas', { screen: 'Task', params: { tarefaId: tarefa.id } })}
                                >
                                    <View style={styles.focoCardTopo}>
                                        <Text style={styles.focoTag}>🚩 Prioridade</Text>

                                        <TouchableOpacity
                                            style={[styles.miniCheckbox, tarefa.feita && styles.miniCheckboxMarcado]}
                                            onPress={() => alternarStatusFeita(tarefa.id)}
                                        >
                                            {tarefa.feita && <Ionicons name="checkmark" size={14} color="#fff" />}
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={[styles.focoTitulo, tarefa.feita && styles.textoRiscado]} numberOfLines={2}>
                                        {tarefa.titulo}
                                    </Text>
                                    <Ionicons name="arrow-forward-circle" size={24} color={tarefa.cor} style={styles.focoIcone} />
                                </TouchableOpacity>
                            ))
                        ) : (

                            <View style={styles.focoVazioCard}>
                                <Text style={styles.focoVazioTexto}>Nenhuma tarefa urgente pendente! 🎉</Text>
                            </View>
                        )}



                        <TouchableOpacity style={styles.focoAddCard} onPress={() => navigation.navigate('Tarefas')}>
                            <Ionicons name="add-circle" size={40} color="#ca7df9" />
                            <Text style={styles.focoAddText}>Nova</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9fb' },
    header: { paddingTop: 60, paddingBottom: 30, paddingHorizontal: 24, backgroundColor: '#fff', borderBottomRightRadius: 30, borderBottomLeftRadius: 30, elevation: 3 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    greeting: { fontSize: 18, color: '#888', fontWeight: '500' },
    title: { fontSize: 34, color: '#ca7df9', fontFamily: 'Gooper', marginTop: 2 },
    subtitle: { fontSize: 15, color: '#aaa', marginTop: 8, fontWeight: '500' },
    avatarContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#e7c6ff', justifyContent: 'center', alignItems: 'center' },
    avatarText: { color: '#4a0080', fontWeight: 'bold', fontSize: 18 },
    dashboardContainer: { padding: 24, paddingBottom: 40 },
    quickStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    statCard: { flex: 1, padding: 20, borderRadius: 25, marginHorizontal: 5, elevation: 2 },
    iconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    statNumber: { fontSize: 28, fontWeight: 'bold', color: '#333' },
    statLabel: { fontSize: 14, color: '#555', fontWeight: '500' },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
    chartCard: { backgroundColor: '#fff', borderRadius: 25, padding: 20, alignItems: 'center', elevation: 2, marginBottom: 30, minHeight: 100, justifyContent: 'center' },
    semDadosText: { color: '#aaa', fontStyle: 'italic', fontSize: 14 },
    focoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    verTudo: { color: '#ca7df9', fontWeight: 'bold', fontSize: 14 },
    focoScroll: { paddingBottom: 10, marginLeft: -5 },
    focoCard: { backgroundColor: '#fff', width: 150, height: 130, padding: 15, borderRadius: 20, marginHorizontal: 5, borderTopWidth: 5, elevation: 2, justifyContent: 'space-between' },
    focoTag: { fontSize: 11, color: '#ff4d4d', fontWeight: 'bold' },
    focoTitulo: { fontSize: 15, fontWeight: 'bold', color: '#444', marginTop: 5 },
    focoIcone: { alignSelf: 'flex-end' },
    focoVazioCard: { backgroundColor: '#fff', width: 220, height: 130, borderRadius: 20, marginHorizontal: 5, elevation: 1, justifyContent: 'center', alignItems: 'center', padding: 20, borderWidth: 1, borderColor: '#eee' },
    focoVazioTexto: { color: '#999', fontStyle: 'italic', textAlign: 'center', fontSize: 14, fontWeight: '500' },
    focoAddCard: { backgroundColor: '#f0e6ff', width: 100, height: 130, padding: 15, borderRadius: 20, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#e7c6ff', borderStyle: 'dashed' },
    focoAddText: { color: '#ca7df9', fontWeight: 'bold', marginTop: 5 },
    focoCardTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    miniCheckbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 2, borderColor: '#ca7df9', justifyContent: 'center', alignItems: 'center' },
    miniCheckboxMarcado: { backgroundColor: '#ca7df9' },
    textoRiscado: { textDecorationLine: 'line-through', color: '#aaa' },
});