import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChatBubble() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.chat} onPress={() => navigation.navigate('Chat')}>
      <Image source={require('../assets/chat.png')} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chat: {
    position: 'absolute', bottom: 30, right: 30,
    backgroundColor: '#FFD700', padding: 15, borderRadius: 50,
    elevation: 5
  },
  icon: { width: 24, height: 24 }
});
