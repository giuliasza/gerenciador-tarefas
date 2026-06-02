import react from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TarefaCard ({titulo, feita}){

    return(
        <View style={styles.card}>
            <Text style={[styles.titulo, feita ? styles.textoRiscado : null]}>
                {titulo}
            </Text>
            <TouchableOpacity
                style={[styles.checkbox, feita ? styles.checkboxMarcado : null]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#ffafcc',
    elevation: 2, //sombra
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#e7c6ff',
    marginRight: 12,
  },
  checkboxMarcado: {
    backgroundColor: '#c8b6ff',
  },
  titulo: {
    fontSize: 16,
    color: '#240046',
  },
  textoRiscado: {
    textDecorationLine: 'line-through', //risca o texto.
    color: '#240046',
  }
});