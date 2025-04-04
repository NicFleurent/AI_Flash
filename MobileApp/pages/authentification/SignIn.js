import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { signin } from '../../api/user'
import { useSelector } from 'react-redux'

const SignIn = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const isTablet = useSelector((state) => state.screen.isTablet);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeText = (value, setInput) => {
    setInput(value);

    if (isError)
      validateForm();
  }

  const handleSignin = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await signin(
          email, 
          firstname,
          lastname,
          password,
          passwordConfirm
        );

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
        Toast.show({
          type: 'error',
          text1: t('ERROR'),
          text2: t(error.message),
        });
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
    const numberRegex = /\d/;
    const letterRegex = /[a-zA-Z]/;
    const majNimRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    const specialCaracterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (firstname === "")
      tempErrors.errorFirstname = t('input.error.firstname_required');
    if (lastname === "")
      tempErrors.errorLastname = t('input.error.lastname_required');

    if(email === "")
      tempErrors.errorEmail = t('input.error.email_required');
    else if(!emailRegex.test(email))
      tempErrors.errorEmail = t('input.error.email_invalid');

    if(password === "")
      tempErrors.errorPassword = t('input.error.password_required');
    else if(password.length < 7)
      tempErrors.errorPassword = t('auth.register_error_password_min');
    else if (!letterRegex.test(password))
      tempErrors.errorPassword = t('auth.register_error_password_letters');
    else if (!majNimRegex.test(password))
      tempErrors.errorPassword = t('auth.register_error_password_mixed');
    else if (!numberRegex.test(password))
      tempErrors.errorPassword = t('auth.register_error_password_numbers');
    else if (!specialCaracterRegex.test(password))
      tempErrors.errorPassword = t('auth.register_error_password_symbols');

    if (password != passwordConfirm)
      tempErrors.errorPasswordConfirm = t('input.error.passwordConfirm_required');

    setErrors(tempErrors);
    setIsError(!(Object.keys(tempErrors).length === 0))

    return Object.keys(tempErrors).length === 0;
  }

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={[styles.containerTitle, isTablet && styles.containerTitleTablet]}>
          <Text style={styles.txtTitle}>{t('auth.signin')}</Text>
        </View>

        <View style={[styles.containerForm, isTablet && styles.containerFormTablet]}>
          <View style={styles.containerInputs}>
            <CustomInput
              label={t('input.firstname')}
              value={firstname}
              onChangeText={(value) => onChangeText(value, setFirstname)}
              isPassword={false}
              error={errors.errorFirstname}
            />
            <CustomInput
              label={t('input.lastname')}
              value={lastname}
              onChangeText={(value) => onChangeText(value, setLastname)}
              isPassword={false}
              error={errors.errorLastname}
            />
            <CustomInput
              label={t('input.email')}
              value={email}
              onChangeText={(value) => onChangeText(value, setEmail)}
              isPassword={false}
              error={errors.errorEmail}
              keyboardType='email-address'
            />
            <CustomInput
              label={t('input.password')}
              value={password}
              onChangeText={(value) => onChangeText(value, setPassword)}
              isPassword={true}
              error={errors.errorPassword}
            />
            <CustomInput
              label={t('input.passwordConfirm')}
              value={passwordConfirm}
              onChangeText={(value) => onChangeText(value, setPasswordConfirm)}
              isPassword={true}
              error={errors.errorPasswordConfirm}
            />
          </View>

          <View style={styles.containerButtons}>
            <CustomButton
              type="green-full"
              label={t('auth.register')}
              onPress={async () => handleSignin()}
              additionnalStyle={{ marginBottom: 20 }}
            />
            <CustomButton
              type="white-outline"
              label={t('button.goBack')}
              onPress={() => navigation.goBack()}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  txtTitle: {
    fontSize: 54,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 40
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTitleTablet:{
    marginVertical:50
  },
  containerForm: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFormTablet:{
    marginVertical:50,
    width:'75%'
  },
  containerInputs: {
    width: '100%',
  },
  containerButtons: {
    width: '90%',
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

export default SignIn