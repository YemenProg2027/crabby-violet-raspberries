import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { registerUser, checkEmailExists } from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !name) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        alert('Email is already registered');
        return;
      }

      const active = true;
      const userData = { email, password, name, active };
      const newUser = await registerUser(userData);
      if (newUser) {
        alert('Registration successful!');
        navigation.navigate('Login');
      }
    } catch (error) {
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Create your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.footerLink} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff0f6', // Light pink background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d63384', // Deep pink
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderColor: '#d63384', // Pink border
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#d63384', // Deep pink
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footerLink: {
    color: '#d63384',
    fontWeight: 'bold',
  },
});
