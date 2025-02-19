import { View, Text, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Intro = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={['#1DB954','#000000']}
        style={styles.linearGradient}
        locations={[0.10, 0.80]}
      >
        <View style={styles.containerLogo}>
          <Text style={styles.txtTitle}>{t('APP_NAME')}</Text>
          <Image 
            source={require('../../assets/aiFlash_logo_white.png')}
            style={{height:"200", width:"200"}} 
          />
          <Text style={styles.txtQuote}>{t('APP_CATCHPHRASE')}</Text>
        </View>  

        <View style={styles.containerButtons}>
          <CustomButton
            type="green-full"
            label={t('auth.connection')}
            onPress={()=>navigation.navigate("LogIn")}
            additionnalStyle={{marginBottom:20}}
          /> 
          <CustomButton
            type="white-outline"
            label={t('auth.signin')}
            onPress={()=>navigation.navigate("SignIn")}
          /> 
        </View>  
      </LinearGradient>
    </View>
  )
}

const styles = {
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  linearGradient: {
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  containerLogo:{
    flex:4,
    justifyContent:'center',
    alignItems:'center'
  },
  containerButtons:{
    flex:2,
    width:'80%',
    justifyContent:'center',
    alignItems:'center'
  },
  txtTitle:{
    fontSize:54,
    color:'white',
    fontWeight:'bold'
  },
  txtQuote:{
    fontSize:24,
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    marginHorizontal:50
  }
}

export default Intro