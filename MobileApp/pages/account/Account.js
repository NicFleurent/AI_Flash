import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../components/CustomButton';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { getLocalUser } from '../../api/secureStore';
import { deleteUser, logout, updateUser } from '../../api/user';
import Toast from 'react-native-toast-message';

const Account = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [isError, setIsError] = useState(false);``

  useEffect(()=>{
    getUser();
  }, [])

  const getUser = async () => {
    const user = await getLocalUser();
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setEmail(user.email);
  }

  const onChangeText = (value, setInput) => {
    setInput(value);

    if (isError)
      validateForm();
  }

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const response = await updateUser(email, firstname, lastname);

        if(response){
          Toast.show({
            type: 'success',
            text1: response.data.message
          });
        }

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

    if (firstname === "")
      tempErrors.errorFirstname = t('input.error.firstname_required');
    if (lastname === "")
      tempErrors.errorLastname = t('input.error.lastname_required');

    if (email === "")
      tempErrors.errorEmail = t('input.error.email_required');
    else if (!emailRegex.test(email))
      tempErrors.errorEmail = t('input.error.email_invalid');

    setErrors(tempErrors);
    setIsError(!(Object.keys(tempErrors).length === 0))

    return Object.keys(tempErrors).length === 0;
  }

  const handleLogout = async () => {
    try {
      const response = await logout();

      navigation.navigate("Auth", {screen: "Intro", params:{success:response.data.message}})
      navigation.reset({
        index:0,
        routes:[
          {
            name:'Auth',
            params:{
              screen:'Intro',
              params:{success:response.data.message}
            }
          }
        ]
      })

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('ERROR'),
        text2: error.message,
      });
    }
  }

  const handleDelete = async () => {
    try {
      const response = await deleteUser();

      navigation.navigate("Auth", {screen: "Intro", params:{success:response.message}})

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('ERROR'),
        text2: error.message,
      });
    }
  }

  const handleChangePassword = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
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
        </View>

        <View style={styles.containerButtons}>
          <CustomButton
            type="white-outline"
            label={t('button.save')}
            onPress={handleSave}
            additionnalStyle={{ marginBottom: 20 }}
            icon={faSave}
          />
          <CustomButton
            type="white-outline"
            label={t('auth.logout')}
            onPress={handleLogout}
            additionnalStyle={{ marginBottom: 20 }}
            icon={faArrowRightFromBracket}
          />
          <CustomButton
            type="red-full"
            label={t('auth.deleteAccount')}
            onPress={handleDelete}
            additionnalStyle={{ marginBottom: 20 }}
            icon={faUserXmark}
          />
          <CustomButton
            type="white-outline"
            label={t('auth.changePassword')}
            onPress={handleChangePassword}
            additionnalStyle={{ marginBottom: 20 }}
            icon={faPenToSquare}
          />
        </View>
      </View>
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
  containerForm: {
    flex: 4,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerInputs: {
    width: '100%',
  },
  containerButtons: {
    width: '90%',
  }
}

export default Account