import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/onboarding.json')} // Make sure the path is correct
        autoPlay
        loop
        style={{ width: width * 0.8, height: width * 0.8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default OnboardingScreen;
