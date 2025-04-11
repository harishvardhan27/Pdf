// frontend/components/OnboardingSlides.js
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function OnboardingSlides({ slide }) {
  return (
    <View style={[styles.slide, { backgroundColor: slide.backgroundColor }]}>
      <Image source={slide.image} style={styles.image} />
      <Text style={styles.title}>{slide.title}</Text>
      <Text style={styles.text}>{slide.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40
  }
});
