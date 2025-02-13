import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

const SignIn = () => {
  const navigation = useNavigation();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState([]);
  const [isError, setIsError] = useState(false);

  const onChangeText = (value, setInput) => {
    setInput(value);

    if (isError)
      validateForm();
  }

  const handleSignin = async () => {
    if (validateForm()) {
      // try {
      //   const response = await login(email, password);

      //   const userInfo = {
      //     token: response.data.token,
      //     id: response.data.user.id,
      //     email: response.data.user.email,
      //     firstname: response.data.user.firstname,
      //     lastname: response.data.user.lastname,
      //   };

      //   navigation.navigate("Menu", {
      //     screen: "Home",
      //   })

      // } catch (error) {
      //   Toast.show({
      //     type: 'error',
      //     text1: "Erreur",
      //     text2: error.message,
      //   });
      // }
    }
    else
      setIsError(true)
  }

  const validateForm = () => {
    let tempErrors = [];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (firstname === "")
      tempErrors.errorFirstname = "Veuillez votre prénom";
    if (lastname === "")
      tempErrors.errorLastname = "Veuillez votre nom";

    if (email === "")
      tempErrors.errorEmail = "Veuillez entrer le courriel";
    else if (!emailRegex.test(email))
      tempErrors.errorEmail = "Le courriel n'est pas valide";

    if (password === "")
      tempErrors.errorPassword = "Veuillez entrer le mot de passe"
    if (password != passwordConfirm)
      tempErrors.errorPasswordConfirm = "Les mots de passe ne correspondent pas"

    setErrors(tempErrors);
    setIsError(!(Object.keys(tempErrors).length === 0))

    return Object.keys(tempErrors).length === 0;
  }

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.containerTitle}>
          <Text style={styles.txtTitle}>Inscription</Text>
        </View>

        <View style={styles.containerForm}>
          <View style={styles.containerInputs}>
            <CustomInput
              label='Prénom'
              value={firstname}
              onChangeText={(value) => onChangeText(value, setFirstname)}
              isPassword={false}
              error={errors.errorFirstname}
            />
            <CustomInput
              label='Nom'
              value={lastname}
              onChangeText={(value) => onChangeText(value, setLastname)}
              isPassword={false}
              error={errors.errorLastname}
            />
            <CustomInput
              label='Adresse courriel'
              value={email}
              onChangeText={(value) => onChangeText(value, setEmail)}
              isPassword={false}
              error={errors.errorEmail}
              keyboardType='email-address'
            />
            <CustomInput
              label='Mot de passe'
              value={password}
              onChangeText={(value) => onChangeText(value, setPassword)}
              isPassword={true}
              error={errors.errorPassword}
            />
            <CustomInput
              label='Confirmer le mot de passe'
              value={passwordConfirm}
              onChangeText={(value) => onChangeText(value, setPasswordConfirm)}
              isPassword={true}
              error={errors.errorPasswordConfirm}
            />
          </View>

          <View style={styles.containerButtons}>
            <CustomButton
              type="green-full"
              label="S'incrire"
              onPress={async () => handleSignin()}
              additionnalStyle={{ marginBottom: 20 }}
            />
            <CustomButton
              type="white-outline"
              label="Retour"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 30
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInputs: {
    width: '100%',
  },
  containerButtons: {
    width: '90%',
  }
}

export default SignIn