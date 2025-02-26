
import { View, Text, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { defineScreen } from '../../stores/sliceScreen';

const Intro = ({route}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const isTablet = useSelector((state) => state.screen.isTablet);


  useEffect(()=>{
    setScreen(height, width);
  }, [height, width])

  const setScreen = (height, width)=>{
    const screen = {
      height:height,
      width:width
    }

    dispatch(defineScreen(screen));
  }
  
  useEffect(()=>{
    if(route.params){
      if(route.params.success){
        Toast.show({
          type: 'success',
          text1: route.params.success
        });
      }
    }
  },[route])

  return (
    <View style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={['#1DB954','#000000']}
        style={styles.linearGradient}
        locations={[0.10, 0.80]}
      >
        <View style={styles.containerLogo}>
          <Text style={[styles.txtTitle, isTablet && styles.txtTitleTablet]}>{t('APP_NAME')}</Text>
          <Image 
            source={require('../../assets/aiFlash_logo_white.png')}
            style={isTablet ? {height:"400", width:"400"} : {height:"200", width:"200"}} 
          />
          <Text style={[styles.txtQuote, isTablet && styles.txtQuoteTablet]}>{t('APP_CATCHPHRASE')}</Text>
        </View>  

        <View style={[styles.containerButtons, isTablet && styles.containerButtonsTablet]}>
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
      <Toast position='top' bottomOffset={20} />
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
  containerButtonsTablet:{
    width:'40%'
  },
  txtTitle:{
    fontSize:54,
    color:'white',
    fontWeight:'bold'
  },
  txtTitleTablet:{
    fontSize:84,
  },
  txtQuote:{
    fontSize:24,
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    marginHorizontal:50
  },
  txtQuoteTablet:{
    fontSize:32,
  }
}

export default Intro