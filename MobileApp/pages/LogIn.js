import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import CustomInput from '../components/CustomInput'

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [test, setTest] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>Connexion</Text>
      <CustomInput
        label='Adresse courriel'
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        label='Mot de passe'
        value={password}
        onChangeText={setPassword}
      />
      <CustomInput
        label='test'
        value={test}
        onChangeText={setTest}
      />
      
      <View>
        <CustomButton
          type="green-full"
          label="Se connecter"
          //onPress={()=>navigation.navigate("SignIn")}
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