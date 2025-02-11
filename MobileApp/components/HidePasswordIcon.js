import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";

const HidePasswordIcon = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="eye-off" size={30}/>
    </View>
  )
}

const styles = {
  container:{
    alignItems: 'center', 
    justifyContent: 'center'
  }
}

export default HidePasswordIcon