import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton';
import FlipCard from '../components/flip_card/FlipCard';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { getCollectionTodayFlashCards, getFlashCards, getTodayFlashcards, updateForgottenFlashcard, updateRememberedFlashcard } from '../api/flashcard';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { setNeedsRefresh } from '../stores/sliceTodayFlashcards';

const Study = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const isTablet = useSelector((state) => state.screen.isTablet);
  const [progress, setProgress] = useState(0);
  const [displayButton, setDisplayButton] = useState(false);
  const [displayNextButton, setDisplayNextButton] = useState(false);
  const [displayFinalButton, setDisplayFinalButton] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(-1);
  const [flipDuration, setFlipDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [flashcards, setFlashcards] = useState();

  useEffect(()=>{
    navigation.setOptions({
      title: route.params.study_type,
    });
  },[navigation])

  
  useEffect(()=>{
    const getFlashcards = async () => {
      try {
        setIsLoading(true);
        if(route.params.source_page === 'Home'){
          if(route.params.study_type === t('home.flash_study')){
            const data = await getTodayFlashcards();
            setFlashcards(data.flashcards);
            setCurrentCard(0);
            setTimeout(()=>setFlipDuration(300), 100)
          }
          else{
            if(route.params.collection){
              const data = await getCollectionTodayFlashCards(route.params.collection);
              setFlashcards(data.flashcards);
              setCurrentCard(0);
              setTimeout(()=>setFlipDuration(300), 100)
            }
          }
        }
        if(route.params.source_page === 'Flashcards'){
          const data = await getFlashCards(route.params.collection.id)
          setFlashcards(data);
          setCurrentCard(0);
          setTimeout(()=>setFlipDuration(300), 100)
        }
      } catch (error) {
        console.log(error)
        Toast.show({
          type: 'error',
          text1: t('ERROR'),
          text2: t('home.today_card_failed'),
        });
      }
      finally{
        setIsLoading(false);
      }
    }
    getFlashcards();
  },[])

  useEffect(()=>{
    if(flashcards){
      const progress = currentCard * 100 / flashcards.length;
      setProgress(progress)
      if(Math.floor(Math.random() * 2) === 1){
        setIsFlipped(true)
      }
      else{
        setIsFlipped(false)
      }
    }
  },[currentCard])
  
  const handlePress = () => {
    setTimeout(()=>setIsFlipped(!isFlipped), 100)
    setTimeout(cardFlipped, 500)
  };

  const cardFlipped = () => {
    if(!displayFinalButton && ! displayNextButton)
      setDisplayButton(true);
  }

  const handleRemembered = (id) => {
    try {
      dispatch(setNeedsRefresh(true));
      updateRememberedFlashcard(id);
      displayTransitionButton();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('ERROR'),
        text2: t(error.message),
      });
    }
    
  }

  const handleForgotten = (id) => {
    try {
      dispatch(setNeedsRefresh(true));
      updateForgottenFlashcard(id);
      displayTransitionButton();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('ERROR'),
        text2: t(error.message),
      });
    }
  }

  const displayTransitionButton = () => {
    setDisplayButton(false)
    if(currentCard < flashcards.length - 1){
      setDisplayNextButton(true);
    }
    else{
      setProgress(100)
      setDisplayFinalButton(true)
    }
  }

  const switchCard = () => {
    setFlipDuration(0);
    setCurrentCard(prev => prev += 1)
    setTimeout(()=>setFlipDuration(300), 200)
    setDisplayNextButton(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressForeground, { width: `${progress}%` }]}></View>
        </View>
      </View>

      <View style={styles.flashcardView}>
        {flashcards &&
          <FlipCard
            isFlipped={isFlipped}
            faceContent={flashcards[currentCard].front_face}
            backContent={flashcards[currentCard].back_face}
            onPress={handlePress}
            duration={flipDuration}
          />
        }
      </View>

      <View style={styles.buttonContainer}>
        <View style={isTablet && styles.buttonContainerTablet}>
          {displayButton && (
            <>
              <CustomButton
                type="green-full"
                label={t('study.remembered')}
                onPress={()=>handleRemembered(flashcards[currentCard].id)}
                additionnalStyle={{ marginTop: 20 }}
              />
              <CustomButton
                type="white-outline"
                label={t('study.forgotten')}
                onPress={()=>handleForgotten(flashcards[currentCard].id)}
                additionnalStyle={{ marginTop: 20 }}
              />
            </>
          )}
          {displayNextButton && (
            <>
              <CustomButton
                type="green-full"
                label={t('button.next')}
                onPress={switchCard}
                additionnalStyle={{ marginTop: 20 }}
              />
            </>
          )}
          {displayFinalButton && (
            <>
              <CustomButton
                type="green-full"
                label={t('button.finish')}
                onPress={()=>navigation.goBack()}
                additionnalStyle={{ marginTop: 20 }}
              />
            </>
          )}
        </View>
      </View>
            
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
    backgroundColor: 'black',
    paddingHorizontal: 20
  },
  progressContainer: {
    flex: 1,
    paddingTop: 20
  },
  progressBackground: {
    width: '100%',
    height: 20,
    backgroundColor: '#757575',
    borderRadius: 10
  },
  progressForeground: {
    height: 20,
    backgroundColor: '#1DB954',
    borderRadius: 10
  },
  flashcardView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%'
  },
  buttonContainer: {
    flex: 3,
    paddingHorizontal:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerTablet:{
    width:'50%'
  },
}

const loadingStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Study