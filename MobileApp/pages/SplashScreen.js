import React, { useEffect } from 'react';
import { Image, Text, View, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { defineScreen } from '../stores/sliceScreen';

const SplashScreen = () => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();

  useEffect(()=>{
    setScreen(height, width);
  }, [height, width])

  const setScreen = (height, width)=>{
    const screen = {
      height:height,
      width:width
    }

    dispatch(defineScreen(screen));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>IA Flash</Text>
      <View style={styles.containerSecond}>
        <Image 
          source={require('../assets/aiFlash_logo_green.png')} 
          style={styles.image} 
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  containerSecond: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#1DB954",
    fontSize: 64,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,  
    height: 200, 
  },
});

export default SplashScreen;
