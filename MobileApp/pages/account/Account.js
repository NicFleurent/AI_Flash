import { View,Platform, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomInput from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../components/CustomButton';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faLanguage, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { getLocalUser } from '../../api/secureStore';
import { deleteUser, logout, updateUser, updateUserPassword } from '../../api/user';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from '../../components/AlertModal';
import CustomModal from '../../components/CustomModal';
import LanguagesModal from '../../components/LanguagesModal';
import { setNeedsRefresh } from '../../stores/sliceTodayFlashcards';

const Account = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isTablet = useSelector((state) => state.screen.isTablet);

  const [isModalLogoutVisible, setIsModalLogoutVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalUpdatePwdVisible, setIsModalUpdatePwdVisible] = useState(false);
  const [isModalLanguageVisible, setIsModalLanguageVisible] = useState(false);

  const [user, setUser] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [isError, setIsError] = useState(false);

  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [errorsPassword, setErrorsPassword] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    getUser();
  }, [])

  const getUser = async () => {
    const user = await getLocalUser();
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setEmail(user.email);
    setUser(user);
  }

  const onChangeText = (value, setInput) => {
    setInput(value);

    if (isError)
      validateForm();
  }

  const openUpdateAlert = () => {
    if (validateForm()) {
      if(email != user.email || firstname != user.firstname || lastname != user.lastname)
        setIsModalUpdateVisible(true);
      else
        Toast.show({
          type: 'error',
          text1: t('account.no_update')
        });
    }
  }

  const handleSave = async () => {
    try {
      setIsModalUpdateVisible(false);
      setIsLoading(true);
      const response = await updateUser(email, firstname, lastname);

      if(response){
        Toast.show({
          type: 'success',
          text1: t(response.message)
        });
      }

      dispatch(setNeedsRefresh(true));
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
      setIsModalLogoutVisible(false);
      setIsLoading(true);
      const response = await logout();

      navigation.reset({
        index:0,
        routes:[
          {
            name:'Auth',
            params:{
              screen:'Intro',
              params:{success:t(response.message)}
            }
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

  const handleDelete = async () => {
    try {
      setIsModalDeleteVisible(false);
      setIsLoading(true);
      const response = await deleteUser();

      navigation.reset({
        index:0,
        routes:[
          {
            name:'Auth',
            params:{
              screen:'Intro',
              params:{success:t(response.message)}
            }
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

  const handleChangePassword = async () => {
    if(validatePassword()){
      try {
        setIsModalUpdatePwdVisible(false);
        setIsLoading(true);
        const response = await updateUserPassword(password, newPassword, passwordConfirmation);

        setPassword("");
        setNewPassword("");
        setPasswordConfirmation("");

        Toast.show({
          type: 'success',
          text1: t(response.message)
        });
      } catch (error) {
        setPassword("");
        setNewPassword("");
        setPasswordConfirmation("");
        Toast.show({
          type: 'error',
          text1: t('ERROR'),
          text2: t(error.message)
        });
      }
      finally{
        setIsLoading(false)
      }
    }
  }

  const validatePassword = () => {
    let tempErrors = [];

    const numberRegex = /\d/;
    const letterRegex = /[a-zA-Z]/;
    const majNimRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    const specialCaracterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password === "")
      tempErrors.errorPassword = t('input.error.password_required');

    if(newPassword === "")
      tempErrors.errorNewPassword  = t('input.error.password_required');
    else if(newPassword.length < 7)
      tempErrors.errorNewPassword  = t('auth.register_error_password_min');
    else if (!letterRegex.test(newPassword))
      tempErrors.errorNewPassword  = t('auth.register_error_password_letters');
    else if (!majNimRegex.test(newPassword))
      tempErrors.errorNewPassword  = t('auth.register_error_password_mixed');
    else if (!numberRegex.test(newPassword))
      tempErrors.errorNewPassword  = t('auth.register_error_password_numbers');
    else if (!specialCaracterRegex.test(newPassword))
      tempErrors.errorNewPassword  = t('auth.register_error_password_symbols');

    if (newPassword != passwordConfirmation)
      tempErrors.errorPasswordConfirm = t('input.error.passwordConfirm_required');

    setErrorsPassword(tempErrors);

    return Object.keys(tempErrors).length === 0;
  }
  
  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollView} >
        <View style={[styles.containerForm,styles.iosMargin, isTablet && styles.containerFormTablet]}>
          <View style={[styles.containerInputs, isTablet && styles.containerInputsTablet]}>
            <CustomInput
              label={t('input.firstname')}
              value={firstname}
              onChangeText={(value) => onChangeText(value, setFirstname)}
              isPassword={false}
              error={errors.errorFirstname}
              removeBottomMarginErrror={true}
            />
            <CustomInput
              label={t('input.lastname')}
              value={lastname}
              onChangeText={(value) => onChangeText(value, setLastname)}
              isPassword={false}
              error={errors.errorLastname}
              removeBottomMarginErrror={true}
            />
            <CustomInput
              label={t('input.email')}
              value={email}
              onChangeText={(value) => onChangeText(value, setEmail)}
              isPassword={false}
              error={errors.errorEmail}
              keyboardType='email-address'
              removeBottomMarginErrror={true}
            />
          </View>

          <View style={styles.containerButtons}>
            <CustomButton
              type="white-outline"
              label={t('button.save')}
              onPress={openUpdateAlert}
              additionnalStyle={{ marginBottom: 15 }}
              icon={faSave}
            />
            <CustomButton
              type="white-outline"
              label={t('account.languages')}
              onPress={()=>setIsModalLanguageVisible(true)}
              additionnalStyle={{ marginBottom: 15 }}
              icon={faLanguage}
            />
            <CustomButton
              type="white-outline"
              label={t('auth.logout')}
              onPress={()=>setIsModalLogoutVisible(true)}
              additionnalStyle={{ marginBottom: 15 }}
              icon={faArrowRightFromBracket}
            />
            <CustomButton
              type="red-full"
              label={t('auth.deleteAccount')}
              onPress={()=>setIsModalDeleteVisible(true)}
              additionnalStyle={{ marginBottom: 20 }}
              icon={faUserXmark}
            />
            <CustomButton
              type="white-outline"
              label={t('auth.changePassword')}
              onPress={()=>setIsModalUpdatePwdVisible(true)}
              additionnalStyle={{ marginBottom: 20 }}
              icon={faPenToSquare}
            />
          </View>
        </View>
      </ScrollView>

      <AlertModal
        isVisible={isModalUpdateVisible}
        title={t('account.update')}
        description={t('account.update_confirm')}
        cancelButtonText={t('button.cancel')}
        confirmButtonText={t('button.confirm')}
        onCancel={()=>setIsModalUpdateVisible(false)}
        onClose={()=>setIsModalUpdateVisible(false)}
        onConfirm={handleSave}
      />
      <AlertModal
        isVisible={isModalLogoutVisible}
        title={t('auth.logout')}
        description={t('account.logout_confirm')}
        cancelButtonText={t('button.cancel')}
        confirmButtonText={t('button.confirm')}
        onCancel={()=>setIsModalLogoutVisible(false)}
        onClose={()=>setIsModalLogoutVisible(false)}
        onConfirm={handleLogout}
      />
      <AlertModal
        isVisible={isModalDeleteVisible}
        title={t('auth.deleteAccount')}
        description={t('account.delete_confirm')}
        cancelButtonText={t('button.cancel')}
        confirmButtonText={t('button.confirm')}
        onCancel={()=>setIsModalDeleteVisible(false)}
        onClose={()=>setIsModalDeleteVisible(false)}
        onConfirm={handleDelete}
      />
      <CustomModal
        modalTitle={t('auth.changePassword')}
        visible={isModalUpdatePwdVisible}
        setVisible={setIsModalUpdatePwdVisible}
        type_modal="edit"
        isCancel={true}
        onPressCancel={()=>{
          setIsModalUpdatePwdVisible(false);
          setPassword("");
          setNewPassword("");
          setPasswordConfirmation("");
        }}
        onPressEdit={handleChangePassword}
        inputs={[
          {
            label:t('input.password'),
            value:password,
            onChangeText:setPassword,
            isPassword:true,
            error:errorsPassword.errorPassword
          },
          {
            label:t('input.newPassword'),
            value:newPassword,
            onChangeText:setNewPassword,
            isPassword:true,
            error:errorsPassword.errorNewPassword
          },
          {
            label:t('input.passwordConfirm'),
            value:passwordConfirmation,
            onChangeText:setPasswordConfirmation,
            isPassword:true,
            error:errorsPassword.errorPasswordConfirm
          }
        ]}
      />
      <LanguagesModal
        visible={isModalLanguageVisible}
        setVisible={setIsModalLanguageVisible}
      />
            
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
    alignItems: 'stretch',
    backgroundColor: 'black'
  },
  scrollView:{
    flex:1,
    alignItems:'center'
  },
  containerForm: {
    flex: 4,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerFormTablet:{
    width: '50%',
    justifyContent: 'center',
  },
  containerInputs: {
    width: '100%',
  },
  containerInputsTablet:{
    marginBottom:50
  },
  containerButtons: {
    width: '90%',
  },
  iosMargin:{ marginTop: Platform.OS === "ios" ? 20 : 0 }
}

const loadingStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Account