import react, { use } from "react";
import { useState, useEffect, } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import TarefaCard from "../components/TarefaCard";
import { useFonts } from "expo-font";

export default function Home() {
    const [fontesCarregadas] = useFonts({ // hook pra carregar fonte
    'Bamboy': require('../../assets/fonts/Bamboy.otf'),
    'Gooper': require('../../assets/fonts/Gooper.otf'),
    });

    const [tarefas, setTarefas] = useState([ // hook pra criar tarefas fictícias.
        {id: '1', titulo: 'estudar react native', feita: false}
    ]);

    if (!fontesCarregadas) {
    return null; //não retorne nada se a fonte não carregar.
    }

    return(
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Minhas tarefas</Text>
            </View>

                <FlatList
                    data={tarefas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TarefaCard
                        titulo={item.titulo}
                        feita={item.feita}
                        />
                    )}
                />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#ffd6ff',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: 10
  },
  titleHeader: {
    fontSize: 28,
    color: '#ca7df9',
    paddingTop: 40,
    fontFamily: 'Gooper'
  }
})