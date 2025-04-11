import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to PDF MCQ Reader</Text>
      <Text style={styles.subtitle}>Study Smart. Highlight Fast. MCQ Instantly.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Reader')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#121212',
    alignItems: 'center', justifyContent: 'center'
  },
  logo: { width: 150, height: 150, marginBottom: 30 },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#ccc', fontSize: 16, marginBottom: 30, textAlign: 'center' },
  button: {
    backgroundColor: '#FFD700', padding: 12, paddingHorizontal: 40, borderRadius: 30
  },
  buttonText: { fontSize: 18, fontWeight: 'bold' }
});
