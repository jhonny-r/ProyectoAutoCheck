import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import axios from 'axios';

export default function RegistroScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [alias, setAlias] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleRegistro = async () => {
    const aliasFinal = alias.trim() === '' ? nombre : alias;

    if (contrasena !== confirmarContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = {
      nombre,
      alias: aliasFinal,
      telefono,
      direccion,
      email,
      contrasena,
      confirmarContrasena,
    };

    try {
      await axios.post('http://172.29.49.49:8000/api/usuarios', nuevoUsuario);
      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.card}>
            <Text style={styles.header}>REGISTRO DE USUARIO</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Alias (opcional)"
              value={alias}
              onChangeText={setAlias}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={direccion}
              onChangeText={setDireccion}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              value={confirmarContrasena}
              onChangeText={setConfirmarContrasena}
              secureTextEntry
            />

            <TouchableOpacity style={styles.registrarBtn} onPress={handleRegistro}>
              <Text style={styles.btnText}>REGISTRARSE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelarBtn} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.btnCancelText}>← CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  scroll: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 30,
    elevation: 15,
  },
  header: {
    backgroundColor: '#1e293b',
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    borderRadius: 16,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 14,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    fontSize: 14,
  },
  registrarBtn: {
    backgroundColor: '#059669',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  cancelarBtn: {
    borderColor: 'rgba(148, 163, 184, 0.3)',
    borderWidth: 2,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnCancelText: {
    color: '#64748b',
    fontSize: 14,
  },
});
