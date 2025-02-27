import { View, Text } from 'react-native'
import React from 'react'

const FlipCardContent = ({content}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{content}</Text>
    </View>
  )
}

const styles = {
  card: {
    flex: 1,
    backgroundColor: '#1DB954',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize:18,
    fontWeight:'500'
  },
};

export default FlipCardContent