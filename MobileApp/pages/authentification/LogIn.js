import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { login } from '../../api/user';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const LogIn = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const isTablet = useSelector((state) => state.screen.isTablet);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const onChangeText = (value, setInput)=>{
    setInput(value);

    if(isError)
      validateForm();
  }

  const handleLogin = async ()=>{
    if(validateForm()){
      try {
        setIsLoading(true);
        const response = await login(email, password);
  
        navigation.reset({
          index:0,
          routes:[
            {
              name:'Menu',
              params:{screen:'Home'}
            }
          ]
        })

      } catch (error) {
        const errorMessage = error.message
        if(errorMessage === "Too Many Attempts."){
          Toast.show({
            type: 'error',
            text1: t('ERROR'),
            text2: t('auth.too_many_attempts'),
          });
        }
        else{
          Toast.show({
            type: 'error',
            text1: t('ERROR'),
            text2: t(errorMessage),
          });
        }
      }
      finally{
        setIsLoading(false)
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

        <View style={[styles.containerForm, isTablet && styles.containerFormTablet]}>
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

      {isLoading && (
        <View style={loadingStyles.overlay}>
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      )}

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
  containerFormTablet:{
    flex:3,
    width:'75%'
  },
  containerInputs:{
    width:'100%',
  },
  containerButtons:{
    width:'90%',
  }
}

const loadingStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LogIn