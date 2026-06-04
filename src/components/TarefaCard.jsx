import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TarefaCard({ titulo, feita, onClick, urgencia, tags, cor }) {

    return (
        <View style={[styles.card, { borderLeftColor: cor || '#e7c6ff' }]}>

            <View style={styles.infoContainer}>
                <Text style={[styles.titulo, feita ? styles.textoRiscado : null]}>
                    {titulo}
                </Text>

                <View style={styles.tagsContainer}>
                    {urgencia === 'alta' && (
                        <Text style={[styles.urgenciaTag, styles.urgenciaAlta]}>🚩 Alta</Text>
                    )}
                    {urgencia === 'media' && (
                        <Text style={[styles.urgenciaTag, styles.urgenciaMedia]}>🍊 Média</Text>
                    )}

                    {tags && tags.map((tag, index) => (
                        <View key={index} style={[styles.categoriaBadge, { backgroundColor: cor || '#e7c6ff' }]}>
                            <Text style={styles.categoriaTexto}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <TouchableOpacity
                onPress={onClick}
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
    borderLeftWidth: 6,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    color: '#240046',
    fontWeight: '500',
  },
  textoRiscado: {
    textDecorationLine: 'line-through',
    color: '#a0a0a0',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
    flexWrap: 'wrap', 
  },
  urgenciaTag: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  urgenciaAlta: {
    color: '#ff4d4d',
  },
  urgenciaMedia: {
    color: '#ff9900',
  },
  categoriaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoriaTexto: {
    fontSize: 11,
    color: '#333',
    fontWeight: 'bold',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#e7c6ff',
    marginLeft: 12,
  },
  checkboxMarcado: {
    backgroundColor: '#c8b6ff',
  },
});