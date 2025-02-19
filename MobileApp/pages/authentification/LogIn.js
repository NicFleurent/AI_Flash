import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { login } from '../../api/authentification/user';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

const LogIn = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isError, setIsError] = useState(false);
  
  const onChangeText = (value, setInput)=>{
    setInput(value);

    if(isError)
      validateForm();
  }

  const handleLogin = async ()=>{
    if(validateForm()){
      try {
        const response = await login(email, password);
  
        const userInfo = {
          token: response.data.token,
          id: response.data.user.id,
          email: response.data.user.email,
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
        };
  
        navigation.navigate("Menu", {
          screen:"Home",
        })

      } catch (error) {
        Toast.show({
          type: 'error',
          text1: t('ERROR'),
          text2: error.message,
        });
      }
    }
    else
      setIsError(true)
  }

  const validateForm = () => {
    let tempErrors = [];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(email === "")
      tempErrors.errorEmail = t('input.error.email_required');
    else if(!emailRegex.test(email))
      tempErrors.errorEmail = t('input.error.email_invalid');

    if(password === "")
      tempErrors.errorPassword = t('input.error.password_required');
    
    setErrors(tempErrors);
    setIsError(!(Object.keys(tempErrors).length === 0))

    return Object.keys(tempErrors).length === 0;
  }

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.containerTitle}>
          <Text style={styles.txtTitle}>{t('auth.connection')}</Text>
        </View>

        <View style={styles.containerForm}>
          <View style={styles.containerInputs}>
            <CustomInput
              label={t('input.email')}
              value={email}
              onChangeText={(value)=>onChangeText(value, setEmail)}
              isPassword={false}
              error={errors.errorEmail}
              keyboardType='email-address'
            />
            <CustomInput
              label={t('input.password')}
              value={password}
              onChangeText={(value)=>onChangeText(value, setPassword)}
              isPassword={true}
              error={errors.errorPassword}
            />
          </View>
          
          <View style={styles.containerButtons}>
            <CustomButton
              type="green-full"
              label={t('auth.login')}
              onPress={async()=>handleLogin()}
              additionnalStyle={{marginBottom:20}}
            /> 
            <CustomButton
              type="white-outline"
              label={t('button.goBack')}
              onPress={()=>navigation.goBack()}
            /> 
          </View>
        </View>
      </ScrollView>
      <Toast position='top' bottomOffset={20} />
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