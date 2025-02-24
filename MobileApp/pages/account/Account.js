import { View, Text } from 'react-native'
import React from 'react'

const Account = () => {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
    </View>
  )
}

const styles = {
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black'
  },
}

export default Account