import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'

const LogIn = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>Connexion</Text>
      <View>
        <CustomButton
          type="green-full"
          label="Se connecter"
          onPress={()=>navigation.navigate("SignIn")}
          additionnalStyle={{marginBottom:20}}
        /> 
        <CustomButton
          type="white-outline"
          label="Retour"
          onPress={()=>navigation.goBack()}
        /> 
      </View>
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
  txtTitle:{
    fontSize:54,
    color:'white',
    fontWeight:'bold'
  },
}

export default LogIn