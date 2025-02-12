import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isError, setIsError] = useState(false);
  
  const onChangeText = (value, setInput)=>{
    setInput(value);

    if(isError)
      validateForm();
  }

  const handleConnection = ()=>{
    if(validateForm()){
      navigation.navigate("Menu", {
        screen:"Home",
        params:{
          test:'banane'
        }
      })
    }
    else
      setIsError(true)
  }

  const validateForm = () => {
    let tempErrors = [];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(email === "")
      tempErrors.errorEmail = "Veuillez entrer le courriel";
    else if(!emailRegex.test(email))
      tempErrors.errorEmail = "Le courriel n'est pas valide";

    if(password === "")
      tempErrors.errorPassword = "Veuillez entrer le mot de passe"
    
    setErrors(tempErrors);
    setIsError(!(Object.keys(tempErrors).length === 0))

    return Object.keys(tempErrors).length === 0;
  }

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.containerTitle}>
          <Text style={styles.txtTitle}>Connexion</Text>
        </View>

        <View style={styles.containerForm}>
          <View style={styles.containerInputs}>
            <CustomInput
              label='Adresse courriel'
              value={email}
              onChangeText={(value)=>onChangeText(value, setEmail)}
              isPassword={false}
              error={errors.errorEmail}
              keyboardType='email-address'
            />
            <CustomInput
              label='Mot de passe'
              value={password}
              onChangeText={(value)=>onChangeText(value, setPassword)}
              isPassword={true}
              error={errors.errorPassword}
            />
          </View>
          
          <View style={styles.containerButtons}>
            <CustomButton
              type="green-full"
              label="Se connecter"
              onPress={()=>handleConnection()}
              additionnalStyle={{marginBottom:20}}
            /> 
            <CustomButton
              type="white-outline"
              label="Retour"
              onPress={()=>navigation.goBack()}
            /> 
          </View>
        </View>
      </ScrollView>
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
  scrollView:{
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
  containerTitle:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
  },
  containerForm:{
    flex:4,
    width:'100%',
    justifyContent:'start',
    alignItems:'center',
  },
  containerInputs:{
    width:'100%',
  },
  containerButtons:{
    width:'90%',
  }
}

export default LogIn