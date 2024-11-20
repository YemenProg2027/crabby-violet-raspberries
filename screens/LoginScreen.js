import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { loginUser } from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      if (user) {
        alert('Login successful!');
        navigation.navigate('Home', { user: user });
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in to your account</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.footerLink} onPress={() => navigation.navigate('Register')}>
          Register
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
