//Importer du site suivant :
//https://docs.swmansion.com/react-native-reanimated/examples/flipCard/

import React, { useState } from 'react';
import { Pressable, SafeAreaView, View, StyleSheet, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import FlipCardContent from './FlipCardContent';

const FlipCard = ({
  isFlipped,
  faceContent,
  backContent,
  onPress
}) => {
  const duration = 300;

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        { rotateY: rotateValue },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
        <Pressable onPress={onPress}>
          <Animated.View
            style={[
              styles.regularCard,
              styles.flipCard,
              regularCardAnimatedStyle,
            ]}>
            <FlipCardContent content={faceContent} />
          </Animated.View>
          <Animated.View
            style={[
              styles.flippedCard,
              styles.flipCard,
              flippedCardAnimatedStyle,
            ]}>
            <FlipCardContent content={backContent} />
          </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    width: 300,
    height: 300,
    backfaceVisibility: 'hidden',
  },
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    zIndex: 2,
  },
});

export default FlipCard