import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// O "export default" é o que avisa pro app que essa função é uma tela válida!
export default function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>👩‍💻 Meu Perfil em breve...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  texto: { fontSize: 18, color: '#ca7df9', fontWeight: 'bold' }
});