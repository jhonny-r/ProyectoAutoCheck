// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ route, navigation }) {
  const { usuario } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Bienvenido a</Text>
      <Text style={styles.brand}>AutoCheck 🚗</Text>

      {usuario?.nombre && (
        <Text style={styles.subtitle}>Hola, {usuario.nombre} 👋</Text>
      )}

      <View style={styles.separator} />

      <Button
        title="Cerrar sesión"
        onPress={() => navigation.navigate('Login')}
        color="#ff4444"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333',
  },
  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0055ff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#ccc',
  },
});
