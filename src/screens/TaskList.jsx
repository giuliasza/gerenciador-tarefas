import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Text, SafeAreaView, Dimensions, TextInput, TouchableOpacity, ScrollView
} from "react-native";
import { useFonts } from "expo-font";
import { PieChart } from "react-native-chart-kit";


import { useTarefaStore } from "../store/useTarefaStore";
import TarefaCard from "../components/TarefaCard";

const screenWidth = Dimensions.get("window").width;
const paletaDeCores = ['#e7c6ff', '#ffafcc', '#a2d2ff', '#fdffb6', '#caffbf', '#ffd6a5'];

export default function TaskList({ navigation }) {
    const [fontesCarregadas] = useFonts({
        'Bamboy': require('../../assets/fonts/Bamboy.otf'),
        'Gooper': require('../../assets/fonts/Gooper.otf'),
    });

    const { tarefas, adicionarTarefa, alternarStatusFeita } = useTarefaStore();

    const nomeUsuario = "Maria Giulia";
    const [novaTarefaTexto, setNovaTarefaTexto] = useState("");
    const [fraseAtual, setFraseAtual] = useState("");

    useEffect(() => {
        const frases = [
            "O que vamos conquistar hoje?",
            "Pronta para mais um dia produtivo?",
            "Um passo de cada vez!",
            "Vamos fazer acontecer!"
        ];
        setFraseAtual(`Olá, ${nomeUsuario}! ${frases[Math.floor(Math.random() * frases.length)]}`);
    }, []);

    const dataDeHoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

    function handleAdicionarTarefa() {
        if (novaTarefaTexto.trim() === "") return;
        const nova = {
            id: Math.random().toString(),
            titulo: novaTarefaTexto,
            feita: false,
            urgencia: 'normal',
            tags: [],
            cor: paletaDeCores[0],
            descricao: '',
            checklist: [],
            imagemUri: null
        };
        adicionarTarefa(nova);
        setNovaTarefaTexto("");
    }

    if (!fontesCarregadas) return null;

    const totalFeitas = tarefas.filter(t => t.feita).length;
    const totalPendentes = tarefas.length - totalFeitas;
    const dadosGrafico = [
      { name: "Concluídas", quantidade: totalFeitas, color: "#c8b6ff", legendFontColor: "#7F7F7F", legendFontSize: 13 },
      { name: "Pendentes", quantidade: totalPendentes, color: "#ffafcc", legendFontColor: "#7F7F7F", legendFontSize: 13 }
    ];

    const cabecalhoTela = (
        <View>
            <View style={styles.header}><Text style={styles.titleHeader}>Minhas Tarefas</Text></View>
            <Text style={styles.slogan}>{fraseAtual}</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Adicionar nova tarefa..." value={novaTarefaTexto} onChangeText={setNovaTarefaTexto} />
                <TouchableOpacity style={styles.addButton} onPress={handleAdicionarTarefa}><Text style={styles.addButtonText}>+</Text></TouchableOpacity>
            </View>
            <Text style={styles.dataTitle}>{dataDeHoje}</Text>
        </View>
    );

    <View style={styles.carrosselVerticalContainer}>
    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
        {tarefas.map(item => (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Task', { tarefaId: item.id })} activeOpacity={0.7}>
                <TarefaCard
                    titulo={item.titulo}
                    feita={item.feita}
                    urgencia={item.urgencia}
                    tags={item.tags}
                    cor={item.cor}
                    onClick={() => alternarStatusFeita(item.id)}
                />
            </TouchableOpacity>
        ))}
    </ScrollView>
</View>

    const rodapeTela = (
        <View style={styles.footerContainer}>
            <Text style={styles.graficoTitulo}>Seu Progresso</Text>
            {tarefas.length > 0 ? (
                <PieChart data={dadosGrafico} width={screenWidth - 40} height={180} chartConfig={{ color: (o = 1) => `rgba(0, 0, 0, ${o})` }} accessor={"quantidade"} backgroundColor={"transparent"} paddingLeft={"15"} absolute />
            ) : (<Text style={styles.semTarefasText}>Adicione tarefas para ver seu gráfico!</Text>)}
            <View style={styles.creditosContainer}><Text style={styles.creditos}>criado por maria giulia :)</Text></View>
        </View>
    );

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 120 }}>
                {cabecalhoTela}

                <View style={styles.carrosselContainer}>
                    {tarefas.map(item => (
    
                        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Task', { tarefaId: item.id })} activeOpacity={0.7}>
                            <TarefaCard
                                titulo={item.titulo}
                                feita={item.feita}
                                urgencia={item.urgencia}
                                tags={item.tags}
                                cor={item.cor}
                                onClick={() => alternarStatusFeita(item.id)}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {rodapeTela}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { paddingTop: 60, paddingBottom: 20, paddingHorizontal: 24, backgroundColor: '#ffd6ff', borderBottomRightRadius: 30, borderBottomLeftRadius: 30 },
  titleHeader: { fontSize: 28, color: '#ca7df9', fontFamily: 'Gooper' },
  slogan: { fontSize: 16, color: '#666', marginHorizontal: 24, marginTop: 20, marginBottom: 15, fontWeight: '500' },
  inputContainer: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 20 },
  input: { flex: 1, height: 50, backgroundColor: '#fff', borderRadius: 25, paddingHorizontal: 20, fontSize: 16, elevation: 2 },
  addButton: { width: 50, height: 50, backgroundColor: '#ca7df9', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginLeft: 10, elevation: 2 },
  addButtonText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  dataTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginHorizontal: 24, marginBottom: 10, textTransform: 'capitalize' },
  carrosselContainer: { marginVertical: 5 },
  footerContainer: { marginTop: 30, alignItems: 'center' },
  graficoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  semTarefasText: { color: '#999', marginVertical: 30, fontStyle: 'italic' },
  creditosContainer: { marginTop: 40, marginBottom: 30, paddingTop: 20, borderTopWidth: 1, borderColor: '#e0e0e0', width: '80%', alignItems: 'center' },
  creditos: { color: '#aaa', fontSize: 14, fontWeight: '500' },
  carrosselVerticalContainer: {
  maxHeight: 320,
  marginVertical: 5,
  paddingHorizontal: 4,
}
});