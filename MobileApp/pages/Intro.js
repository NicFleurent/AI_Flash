import { View, Text, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Intro = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={['#1DB954','#000000']}
        style={styles.linearGradient}
        locations={[0.10, 0.80]}
      >
        <View style={styles.containerLogo}>
          <Text style={styles.txtTitle}>AI Flash</Text>
          <Image 
            source={require('../assets/aiFlash_logo_white.png')}
            style={{height:"200", width:"200"}} 
          />
          <Text style={styles.txtQuote}>Des flashcards pour une étude simplifiée</Text>
        </View>  

        <View style={styles.containerButtons}>
          <CustomButton
            type="green-full"
            label="Connexion"
            onPress={()=>navigation.navigate("LogIn")}
            additionnalStyle={{marginBottom:20}}
          /> 
          <CustomButton
            type="white-outline"
            label="Inscription"
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