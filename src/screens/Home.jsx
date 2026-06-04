import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

export default function Home({ navigation }) {
    const [fontesCarregadas] = useFonts({
        'Bamboy': require('../../assets/fonts/Bamboy.otf'),
        'Gooper': require('../../assets/fonts/Gooper.otf'),
    });

    if (!fontesCarregadas) return null;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Bom dia,</Text>
                <Text style={styles.title}>Maria Giulia!</Text>
                <Text style={styles.subtitle}>Aqui está o resumo do seu dia.</Text>
            </View>

            <View style={styles.dashboardContainer}>
                {/* O nosso Gráfico de Pizza virá para cá depois! */}
                <View style={styles.cardResumo}>
                    <Text style={styles.cardTitulo}>Progresso de Hoje</Text>
                    <Text style={styles.cardNumero}>3/5 Tarefas</Text>
                </View>

                <TouchableOpacity
                    style={styles.botaoPrincipal}
                    // Esse botão faz a navegação nativa para a aba de Tarefas!
                    onPress={() => navigation.navigate('Tarefas')}
                >
                    <Text style={styles.botaoTexto}>Ver todas as tarefas ➔</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { paddingTop: 60, paddingBottom: 30, paddingHorizontal: 24, backgroundColor: '#ffd6ff', borderBottomRightRadius: 30, borderBottomLeftRadius: 30, elevation: 5 },
    greeting: { fontSize: 20, color: '#666', fontWeight: '500' },
    title: { fontSize: 32, color: '#ca7df9', fontFamily: 'Gooper', marginTop: 5 },
    subtitle: { fontSize: 16, color: '#8a5a9e', marginTop: 10, fontWeight: '500' },
    dashboardContainer: { padding: 24, flex: 1, justifyContent: 'center' },
    cardResumo: { backgroundColor: '#fff', padding: 24, borderRadius: 20, alignItems: 'center', elevation: 2, marginBottom: 30 },
    cardTitulo: { fontSize: 18, color: '#555', fontWeight: 'bold', marginBottom: 10 },
    cardNumero: { fontSize: 36, color: '#ca7df9', fontWeight: 'bold' },
    botaoPrincipal: { backgroundColor: '#ca7df9', paddingVertical: 18, borderRadius: 15, alignItems: 'center' },
    botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});