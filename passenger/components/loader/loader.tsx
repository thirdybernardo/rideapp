import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

const Loader: React.FC = () => {
  return (
    <View style={styles.loaderContainer}>
      <LottieView
        source={require('../../assets/lottie/loader.json')} // Adjust the path to your animation file
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default Loader;
