import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const OnboardingDeux = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <ImageBackground 
      source={require('../../assets/onboarding2.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{t('onboarding.page_two.title')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.page_two.subtitle')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("OnboardingTrois")} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>{t('onboarding.page_two.next_button')}</Text>
        </TouchableOpacity>
        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>
            {t('onboarding.page_two.login_text')} 
          </Text>
          <TouchableOpacity onPress={()=>{navigation.replace("Auth", { screen: "LogIn" })}}>
            <Text style={styles.loginLink}>{" "+t('onboarding.page_two.login_link')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerCircle}>
        <View style={styles.circle}></View>
        <View style={styles.circleColored}></View>
        <View style={styles.circle}></View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: '#191414',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 50,
  },
  nextButton: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },
  nextButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginTextContainer:{
    flexDirection:"row"
  },
  loginText: {
    color: 'white',
    fontSize: 14,
  },
  loginLink: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
  containerCircle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    margin: 2,
    backgroundColor: "black",
  },
  circleColored: {
    width: 20,
    height: 20,
    borderRadius: 50,
    margin: 2,
    backgroundColor: "#1DB954",
  },
});

export default OnboardingDeux;