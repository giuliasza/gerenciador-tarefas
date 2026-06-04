import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity,
    ScrollView, KeyboardAvoidingView, Platform, Alert, Image, Modal, Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTarefaStore } from '../store/useTarefaStore';

export default function Task({ route, navigation }) {
    // 🛡️ O ESCUDO: Se a tela anterior esquecer de mandar o ID, o app não quebra!
    const { tarefaId } = route.params || {};

    const { tarefas, atualizarTarefa, deletarTarefa } = useTarefaStore();

    const tarefaOriginal = tarefas.find(t => t.id === tarefaId);
    const [rascunho, setRascunho] = useState(tarefaOriginal);

    const [novaTagTexto, setNovaTagTexto] = useState("");
    const [novoItemChecklist, setNovoItemChecklist] = useState("");

    // Estados do seletor de cores customizado
    const [modalCorVisivel, setModalCorVisivel] = useState(false);
    const [corTemporaria, setCorTemporaria] = useState("");

    // Se a tarefa não existir ou o ID não for enviado, volta pra tela anterior de forma segura
    useEffect(() => {
        if (!tarefaId || !tarefaOriginal) {
            Alert.alert("Aviso", "Não foi possível carregar esta tarefa.");
            navigation.goBack();
        }
    }, [tarefaId, tarefaOriginal]);

    if (!rascunho) return null;

    async function abrirCamera() {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();
        if (permissao.granted === false) {
            Alert.alert("Permissão negada", "Precisamos de acesso à câmera para adicionar fotos.");
            return;
        }

        const resultado = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!resultado.canceled) {
            setRascunho({ ...rascunho, imagemUri: resultado.assets[0].uri });
        }
    }

    function salvarEdicao() {
        atualizarTarefa(rascunho);
        navigation.goBack();
    }

    function deletar() {
        deletarTarefa(rascunho.id);
        navigation.goBack();
    }

    function alternarUrgencia() {
        let proxima = 'normal';
        if (rascunho.urgencia === 'normal') proxima = 'media';
        else if (rascunho.urgencia === 'media') proxima = 'alta';
        setRascunho({ ...rascunho, urgencia: proxima });
    }

    // Funções da Cor Customizada
    function abrirModalCor() {
        setCorTemporaria(rascunho.cor || '#e7c6ff');
        setModalCorVisivel(true);
    }

    function salvarNovaCor() {
        setRascunho({ ...rascunho, cor: corTemporaria });
        setModalCorVisivel(false);
    }

    function adicionarTag() {
        if (novaTagTexto.trim() === "") return;
        setRascunho({ ...rascunho, tags: [...(rascunho.tags || []), novaTagTexto.trim()] });
        setNovaTagTexto("");
    }

    function removerTag(index) {
        setRascunho({ ...rascunho, tags: rascunho.tags.filter((_, i) => i !== index) });
    }

    function adicionarChecklist() {
        if (novoItemChecklist.trim() === "") return;
        const novo = { id: Math.random().toString(), texto: novoItemChecklist, feito: false };
        setRascunho({ ...rascunho, checklist: [...(rascunho.checklist || []), novo] });
        setNovoItemChecklist("");
    }

    function alternarChecklist(id) {
        setRascunho({
            ...rascunho,
            checklist: rascunho.checklist.map(i => i.id === id ? { ...i, feito: !i.feito } : i)
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                <TextInput
                    style={styles.tituloInput}
                    value={rascunho.titulo}
                    onChangeText={(txt) => setRascunho({...rascunho, titulo: txt})}
                    placeholder="Título da tarefa"
                />

                <View style={styles.actionRow}>
                    <TouchableOpacity style={[styles.badge, { backgroundColor: rascunho.cor || '#e7c6ff' }]} onPress={abrirModalCor}>
                        <Text style={styles.badgeText}>🎨 Cor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.badge, rascunho.urgencia === 'alta' ? styles.badgeAlta : rascunho.urgencia === 'media' ? styles.badgeMedia : styles.badgeNormal]} onPress={alternarUrgencia}>
                        <Text style={styles.badgeText}>{rascunho.urgencia === 'alta' ? '🚩 Alta' : rascunho.urgencia === 'media' ? '🍊 Média' : '⛳ Normal'}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Anexo Visual</Text>
                {rascunho.imagemUri ? (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: rascunho.imagemUri }} style={styles.imagemAnexo} />
                        <TouchableOpacity style={styles.removerImagemBtn} onPress={() => setRascunho({...rascunho, imagemUri: null})}>
                            <Ionicons name="trash" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.cameraBtn} onPress={abrirCamera}>
                        <Ionicons name="camera" size={24} color="#ca7df9" />
                        <Text style={styles.cameraBtnText}>Tirar Foto</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.sectionTitle}>Tags</Text>
                <View style={styles.addTagContainer}>
                    <TextInput style={styles.tagInput} placeholder="Nova Tag..." value={novaTagTexto} onChangeText={setNovaTagTexto} onSubmitEditing={adicionarTag} returnKeyType="done" />
                    <TouchableOpacity onPress={adicionarTag} style={styles.addTagBtn}><Text style={styles.addTagBtnText}>+</Text></TouchableOpacity>
                </View>
                <View style={styles.tagsContainer}>
                    {rascunho.tags?.map((tag, index) => (
                        <TouchableOpacity key={index} onPress={() => removerTag(index)} style={[styles.tagBadge, { backgroundColor: rascunho.cor }]}>
                            <Text style={styles.tagText}>{tag} ✕</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Descrição</Text>
                <TextInput style={styles.descInput} placeholder="Adicione mais detalhes..." multiline numberOfLines={3} value={rascunho.descricao} onChangeText={(txt) => setRascunho({...rascunho, descricao: txt})} />

                <Text style={styles.sectionTitle}>Checklist</Text>
                <View style={styles.addTagContainer}>
                    <TextInput style={styles.tagInput} placeholder="Adicionar sub-tarefa..." value={novoItemChecklist} onChangeText={setNovoItemChecklist} onSubmitEditing={adicionarChecklist} returnKeyType="done" />
                    <TouchableOpacity onPress={adicionarChecklist} style={styles.addTagBtn}><Text style={styles.addTagBtnText}>+</Text></TouchableOpacity>
                </View>
                <View>
                    {rascunho.checklist?.map(item => (
                        <TouchableOpacity key={item.id} style={styles.checkItem} onPress={() => alternarChecklist(item.id)}>
                            <View style={[styles.checkbox, item.feito && styles.checkboxMarcado]} />
                            <Text style={[styles.checkText, item.feito && styles.riscado]}>{item.texto}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Botões limpos sem emoji */}
                <View style={styles.footerBtns}>
                    <TouchableOpacity style={styles.btnDeletar} onPress={deletar}>
                        <Text style={styles.btnDeletarText}>Deletar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSalvar} onPress={salvarEdicao}>
                        <Text style={styles.btnSalvarText}>Salvar Tarefa</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Modal de Cores */}
            <Modal visible={modalCorVisivel} transparent animationType="fade">
                <Pressable style={styles.modalCorOverlay} onPress={() => setModalCorVisivel(false)}>
                    <View style={styles.modalCorContent} onStartShouldSetResponder={() => true}>
                        <Text style={styles.modalCorTitle}>Personalizar Cor</Text>
                        <Text style={styles.modalCorSub}>Digite um código HEX (ex: #ff99bb)</Text>

                        <View style={styles.inputCorContainer}>
                            <View style={[styles.bolinhaCorPreview, { backgroundColor: corTemporaria }]} />
                            <TextInput
                                style={styles.hexInput}
                                value={corTemporaria}
                                onChangeText={setCorTemporaria}
                                maxLength={7}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.modalCorBtns}>
                            <TouchableOpacity style={styles.btnCorCancelar} onPress={() => setModalCorVisivel(false)}>
                                <Text style={styles.btnCorCancelarText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnCorSalvar} onPress={salvarNovaCor}>
                                <Text style={styles.btnCorSalvarText}>Aplicar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { padding: 24, paddingBottom: 150 },
    tituloInput: { fontSize: 26, fontWeight: 'bold', color: '#240046', borderBottomWidth: 1, borderColor: '#eee', paddingBottom: 10, marginBottom: 20 },
    actionRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
    badge: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
    badgeAlta: { backgroundColor: '#ffcccc' },
    badgeMedia: { backgroundColor: '#ffe5cc' },
    badgeNormal: { backgroundColor: '#f0f0f0' },
    badgeText: { fontSize: 14, color: '#333', fontWeight: 'bold' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 12, marginTop: 10 },

    cameraBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f0ff', padding: 15, borderRadius: 15, borderWidth: 2, borderColor: '#e7c6ff', borderStyle: 'dashed', marginBottom: 20 },
    cameraBtnText: { color: '#ca7df9', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
    imageContainer: { marginBottom: 20, position: 'relative' },
    imagemAnexo: { width: '100%', height: 200, borderRadius: 15, backgroundColor: '#eee' },
    removerImagemBtn: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10, borderRadius: 20 },

    addTagContainer: { flexDirection: 'row', marginBottom: 15 },
    tagInput: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 10, paddingHorizontal: 15, height: 45 },
    addTagBtn: { backgroundColor: '#e7c6ff', paddingHorizontal: 20, borderRadius: 10, marginLeft: 10, justifyContent: 'center' },
    addTagBtnText: { color: '#4a0080', fontWeight: 'bold', fontSize: 20 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
    tagBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
    tagText: { fontSize: 13, color: '#333', fontWeight: 'bold' },

    descInput: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 15, minHeight: 90, marginBottom: 20, borderWidth: 1, borderColor: '#eee' },
    checkItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    checkbox: { width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: '#ca7df9', marginRight: 10 },
    checkboxMarcado: { backgroundColor: '#ca7df9' },
    checkText: { fontSize: 16, color: '#444' },
    riscado: { textDecorationLine: 'line-through', color: '#aaa' },

    footerBtns: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, gap: 15 },
    btnDeletar: { flex: 1, backgroundColor: '#f9f9f9', borderWidth: 2, borderColor: '#ff4d4d', paddingVertical: 15, borderRadius: 15, alignItems: 'center' },
    btnSalvar: { flex: 1, backgroundColor: '#ca7df9', paddingVertical: 15, borderRadius: 15, alignItems: 'center' },
    btnDeletarText: { color: '#ff4d4d', fontWeight: 'bold', fontSize: 16 },
    btnSalvarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

    modalCorOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
    modalCorContent: { backgroundColor: '#fff', width: '85%', padding: 25, borderRadius: 20, elevation: 5 },
    modalCorTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center' },
    modalCorSub: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 20, marginTop: 5 },
    inputCorContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 10, padding: 10, marginBottom: 25 },
    bolinhaCorPreview: { width: 30, height: 30, borderRadius: 15, marginRight: 15, borderWidth: 1, borderColor: '#ddd' },
    hexInput: { flex: 1, fontSize: 18, fontWeight: 'bold', color: '#555', letterSpacing: 1 },
    modalCorBtns: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
    btnCorCancelar: { paddingVertical: 10, paddingHorizontal: 15 },
    btnCorCancelarText: { color: '#888', fontWeight: 'bold', fontSize: 15 },
    btnCorSalvar: { backgroundColor: '#ca7df9', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
    btnCorSalvarText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});