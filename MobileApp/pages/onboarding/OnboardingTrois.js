import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const OnboardingTrois = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={require('../../assets/onboarding3.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{t('onboarding.page_three.title')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.page_three.subtitle')}</Text>
        <TouchableOpacity onPress={() => {
            navigation.replace("Auth", { screen: "LogIn" });
        }} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>{t('onboarding.page_three.finish_button')}</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          {t('onboarding.page_three.login_text')} <TouchableOpacity onPress={()=>{navigation.replace("Auth", { screen: "LogIn" })}}><Text style={styles.loginLink}>{t('onboarding.page_three.login_link')}</Text></TouchableOpacity>
        </Text>
      </View>

      <View style={styles.containerCircle}>
        <View style={styles.circle}></View>
        <View style={styles.circle}></View>
        <View style={styles.circleColored}></View>
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

export default OnboardingTrois;