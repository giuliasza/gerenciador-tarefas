import React, { useState, useEffect } from "react";
import {
  View, StyleSheet, Text, SafeAreaView, FlatList,
  TextInput, TouchableOpacity, Modal, Dimensions,
  Pressable
} from "react-native";
import TarefaCard from "../components/TarefaCard";
import { useFonts } from "expo-font";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

// Paleta de cores para o usuário escolher
const paletaDeCores = ['#e7c6ff', '#ffafcc', '#a2d2ff', '#fdffb6', '#caffbf', '#ffd6a5'];

export default function Home() {
    const [fontesCarregadas] = useFonts({
        'Bamboy': require('../../assets/fonts/Bamboy.otf'),
        'Gooper': require('../../assets/fonts/Gooper.otf'),
    });

    const nomeUsuario = "Maria Giulia";

    // BANCO DE DADOS (Agora com a propriedade 'cor')
    const [tarefas, setTarefas] = useState([
        { id: '1', titulo: 'Estudar React Native', feita: false, urgencia: 'alta', categoria: 'Estudo', cor: '#ffafcc', descricao: '', checklist: [] },
        { id: '2', titulo: 'Arrumar bolsa', feita: true, urgencia: 'normal', categoria: 'Geral', cor: '#e7c6ff', descricao: 'Levar caderno', checklist: [] },
    ]);

    const [novaTarefaTexto, setNovaTarefaTexto] = useState("");
    const [fraseAtual, setFraseAtual] = useState("");

    // Estados do Modal
    const [modalVisivel, setModalVisivel] = useState(false);
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
    const [novoItemChecklist, setNovoItemChecklist] = useState("");

    useEffect(() => {
        const frases = [
            "O que vamos conquistar hoje?",
            "Pronta para mais um dia produtivo?",
            "Um passo de cada vez!",
            "Vamos fazer acontecer!"
        ];
        setFraseAtual(`Olá, ${nomeUsuario}! ${frases[Math.floor(Math.random() * frases.length)]}`);
    }, []);

    const dataDeHoje = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long', day: 'numeric', month: 'long'
    });

    function adicionarTarefa() {
        if (novaTarefaTexto.trim() === "") return;
        const novaTarefa = {
            id: Math.random().toString(),
            titulo: novaTarefaTexto,
            feita: false,
            urgencia: 'normal',
            categoria: '', // Nasce sem tag
            cor: paletaDeCores[0], // Nasce com a cor padrão (roxo)
            descricao: '',
            checklist: []
        };
        setTarefas([novaTarefa, ...tarefas]);
        setNovaTarefaTexto("");
    }

    function TaskStatus(TaskId){
        const novaTask = tarefas.map(tarefa => {
            if (tarefa.id === TaskId) return { ...tarefa, feita: !tarefa.feita }
            return tarefa;
        });
        setTarefas(novaTask);
    }

    function abrirModalDetalhes(tarefa) {
        // Faz uma cópia exata da tarefa para podermos rabiscar nela sem afetar a original
        setTarefaSelecionada({ ...tarefa });
        setModalVisivel(true);
    }

    // --- LÓGICA DE CANCELAMENTO ---
    function fecharModalSemSalvar() {
        // Simplesmente fecha o modal. Como não chamamos o setTarefas, o que foi digitado é descartado.
        setModalVisivel(false);
        setTarefaSelecionada(null);
    }

    // --- LÓGICA DE SALVAMENTO ---
    function salvarEdicaoModal() {
        if(!tarefaSelecionada) return;
        const tarefasAtualizadas = tarefas.map(tarefa => {
            // Acha a original e substitui pela cópia editada
            if (tarefa.id === tarefaSelecionada.id) return tarefaSelecionada;
            return tarefa;
        });
        setTarefas(tarefasAtualizadas);
        setModalVisivel(false);
    }

    // --- LÓGICAS DE EDIÇÃO DOS BOTÕES ---
    function alternarUrgenciaModal() {
        let proximaUrgencia = 'normal';
        if (tarefaSelecionada.urgencia === 'normal') proximaUrgencia = 'media';
        else if (tarefaSelecionada.urgencia === 'media') proximaUrgencia = 'alta';
        setTarefaSelecionada({ ...tarefaSelecionada, urgencia: proximaUrgencia });
    }

    function alternarCorModal() {
        // Descobre qual é a cor atual na paleta e pega a próxima. Se for a última, volta pro começo.
        const indexAtual = paletaDeCores.indexOf(tarefaSelecionada.cor);
        const proximoIndex = (indexAtual + 1) % paletaDeCores.length;
        setTarefaSelecionada({ ...tarefaSelecionada, cor: paletaDeCores[proximoIndex] });
    }

    // --- LÓGICAS DO CHECKLIST ---
    function adicionarItemChecklist() {
        if (novoItemChecklist.trim() === "") return;
        const novoItem = { id: Math.random().toString(), texto: novoItemChecklist, feito: false };
        const checklistAtualizado = [...(tarefaSelecionada.checklist || []), novoItem];
        setTarefaSelecionada({ ...tarefaSelecionada, checklist: checklistAtualizado });
        setNovoItemChecklist("");
    }

    function alternarItemChecklist(itemId) {
        const checklistAtualizado = tarefaSelecionada.checklist.map(item => {
            if (item.id === itemId) return { ...item, feito: !item.feito };
            return item;
        });
        setTarefaSelecionada({ ...tarefaSelecionada, checklist: checklistAtualizado });
    }

    if (!fontesCarregadas) return null;

    const totalFeitas = tarefas.filter(t => t.feita).length;
    const totalPendentes = tarefas.length - totalFeitas;
    const dadosGrafico = [
      { name: "Concluídas", quantidade: totalFeitas, color: "#c8b6ff", legendFontColor: "#7F7F7F", legendFontSize: 13 },
      { name: "Pendentes", quantidade: totalPendentes, color: "#ffafcc", legendFontColor: "#7F7F7F", legendFontSize: 13 }
    ];

    const CabecalhoTela = () => (
        <>
            <View style={styles.header}><Text style={styles.titleHeader}>Minhas Tarefas</Text></View>
            <Text style={styles.slogan}>{fraseAtual}</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Adicionar nova tarefa..." value={novaTarefaTexto} onChangeText={setNovaTarefaTexto} />
                <TouchableOpacity style={styles.addButton} onPress={adicionarTarefa}><Text style={styles.addButtonText}>+</Text></TouchableOpacity>
            </View>
            <Text style={styles.dataTitle}>{dataDeHoje}</Text>
        </>
    );

    const RodapeTela = () => (
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
            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={CabecalhoTela}
                ListFooterComponent={RodapeTela}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => abrirModalDetalhes(item)} activeOpacity={0.7}>
                        <TarefaCard titulo={item.titulo} feita={item.feita} urgencia={item.urgencia} categoria={item.categoria} cor={item.cor} onClick={() => TaskStatus(item.id)} />
                    </TouchableOpacity>
                )}
            />

            {/* --- MODAL --- */}
            {/* onRequestClose agora chama a função de cancelar! */}
            <Modal visible={modalVisivel} animationType="slide" transparent={true} onRequestClose={fecharModalSemSalvar}>

                {/* Clicar fora agora chama a função de cancelar! */}
                <Pressable style={styles.modalOverlay} onPress={fecharModalSemSalvar}>

                    <Pressable style={styles.modalContent} onPress={() => {}}>

                        <TextInput
                            style={styles.modalTitleInput}
                            value={tarefaSelecionada?.titulo}
                            onChangeText={(novoTexto) => setTarefaSelecionada({...tarefaSelecionada, titulo: novoTexto})}
                            placeholder="Título da tarefa"
                        />

                        {/* --- FILEIRA DE AÇÕES: TAG, COR E URGÊNCIA --- */}
                        <View style={styles.actionRow}>

                            {/* O botão de tag agora é um campo digitável! */}
                            <View style={styles.tagInputWrapper}>
                                <Text style={styles.iconeTag}>🏷️</Text>
                                <TextInput
                                    style={styles.tagInput}
                                    placeholder="Tag..."
                                    value={tarefaSelecionada?.categoria}
                                    onChangeText={(texto) => setTarefaSelecionada({...tarefaSelecionada, categoria: texto})}
                                    maxLength={12} // Limita o tamanho para não quebrar a tela
                                />
                            </View>

                            {/* O botão de cor muda de fundo conforme você clica */}
                            <TouchableOpacity
                                style={[styles.actionBadge, { backgroundColor: tarefaSelecionada?.cor || '#e7c6ff' }]}
                                onPress={alternarCorModal}
                            >
                                <Text style={styles.actionText}>🎨 Cor</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.actionBadge, tarefaSelecionada?.urgencia === 'alta' ? styles.badgeUrgente : tarefaSelecionada?.urgencia === 'media' ? styles.badgeMedia : {backgroundColor: '#f0f0f0'}]}
                                onPress={alternarUrgenciaModal}>
                                <Text style={styles.actionText}>
                                    {tarefaSelecionada?.urgencia === 'alta' ? '🚩 Alta' : tarefaSelecionada?.urgencia === 'media' ? '🍊 Média' : '⛳ Normal'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.sectionTitle}>Descrição</Text>
                        <TextInput
                            style={styles.descriptionInput}
                            placeholder="Adicione mais detalhes sobre essa tarefa..."
                            multiline={true}
                            numberOfLines={3}
                            textAlignVertical="top"
                            value={tarefaSelecionada?.descricao}
                            onChangeText={(texto) => setTarefaSelecionada({...tarefaSelecionada, descricao: texto})}
                        />

                        <Text style={styles.sectionTitle}>Checklist</Text>

                        <View style={styles.addChecklistContainer}>
                            <TextInput
                                style={styles.checklistInput}
                                placeholder="Adicionar sub-tarefa..."
                                value={novoItemChecklist}
                                onChangeText={setNovoItemChecklist}
                                onSubmitEditing={adicionarItemChecklist}
                            />
                            <TouchableOpacity onPress={adicionarItemChecklist} style={styles.addChecklistBtn}>
                                <Text style={styles.addChecklistBtnText}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.checklistContainer}>
                            {tarefaSelecionada?.checklist && tarefaSelecionada.checklist.length > 0 ? (
                                tarefaSelecionada.checklist.map(item => (
                                    <TouchableOpacity key={item.id} style={styles.checklistItem} onPress={() => alternarItemChecklist(item.id)}>
                                        <View style={[styles.miniCheckbox, item.feito ? styles.miniCheckboxMarcado : null]} />
                                        <Text style={[styles.checklistItemText, item.feito ? styles.textoRiscado : null]}>{item.texto}</Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={{color: '#aaa', fontStyle: 'italic', textAlign: 'center'}}>Nenhuma sub-tarefa.</Text>
                            )}
                        </View>

                        {/* --- O BOTÃO OFICIAL DE SALVAR --- */}
                        <TouchableOpacity style={styles.saveButton} onPress={salvarEdicaoModal}>
                            <Text style={styles.saveButtonText}>Salvar e Fechar</Text>
                        </TouchableOpacity>

                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { paddingTop: 40, paddingBottom: 20, paddingHorizontal: 24, backgroundColor: '#ffd6ff', borderBottomRightRadius: 30, borderBottomLeftRadius: 30 },
  titleHeader: { fontSize: 28, color: '#ca7df9', fontFamily: 'Gooper' },
  slogan: { fontSize: 16, color: '#666', marginHorizontal: 24, marginTop: 20, marginBottom: 15, fontWeight: '500' },
  inputContainer: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 20 },
  input: { flex: 1, height: 50, backgroundColor: '#fff', borderRadius: 25, paddingHorizontal: 20, fontSize: 16, elevation: 2 },
  addButton: { width: 50, height: 50, backgroundColor: '#ca7df9', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginLeft: 10, elevation: 2 },
  addButtonText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  dataTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginHorizontal: 24, marginBottom: 10, textTransform: 'capitalize' },
  footerContainer: { marginTop: 30, alignItems: 'center' },
  graficoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  semTarefasText: { color: '#999', marginVertical: 30, fontStyle: 'italic' },
  creditosContainer: { marginTop: 40, marginBottom: 30, paddingTop: 20, borderTopWidth: 1, borderColor: '#e0e0e0', width: '80%', alignItems: 'center' },
  creditos: { color: '#aaa', fontSize: 14, fontWeight: '500' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', height: '85%', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24 },
  modalTitleInput: { fontSize: 24, fontWeight: 'bold', color: '#240046', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10, marginBottom: 20 },

  // Fileira de Ações
  actionRow: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 25, gap: 10 },
  actionBadge: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, justifyContent: 'center' },

  // Input da Tag que imita um botão
  tagInputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  iconeTag: { fontSize: 14, marginRight: 4 },
  tagInput: { fontSize: 14, color: '#333', fontWeight: '500', width: 60 }, // Largura fixa para não empurrar os outros botões

  badgeUrgente: { backgroundColor: '#ffcccc' },
  badgeMedia: { backgroundColor: '#ffe5cc' },
  actionText: { fontSize: 14, color: '#333', fontWeight: '500' },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 10 },
  descriptionInput: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 15, fontSize: 15, minHeight: 90, marginBottom: 25, borderWidth: 1, borderColor: '#eee' },

  addChecklistContainer: { flexDirection: 'row', marginBottom: 15 },
  checklistInput: { flex: 1, height: 40, backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#eee', borderRadius: 8, paddingHorizontal: 15 },
  addChecklistBtn: { width: 40, height: 40, backgroundColor: '#e7c6ff', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  addChecklistBtnText: { color: '#4a0080', fontWeight: 'bold', fontSize: 20 },
  checklistContainer: { flex: 1, backgroundColor: '#fff' },
  checklistItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  miniCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ca7df9',
    marginRight: 10,
    flexShrink: 0
  },
  miniCheckboxMarcado: { backgroundColor: '#ca7df9' },
  checklistItemText: { fontSize: 15, color: '#444, flex: 1' },
  textoRiscado: { textDecorationLine: 'line-through', color: '#aaa' },

  // Botão Oficial de Salvar
  saveButton: { marginTop: 15, backgroundColor: '#ca7df9', padding: 15, borderRadius: 15, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});