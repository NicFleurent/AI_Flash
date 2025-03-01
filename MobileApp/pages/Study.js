import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton';
import FlipCard from '../components/flip_card/FlipCard';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { getCollectionTodayFlashCards, getTodayFlashcards } from '../api/flashcard';

const Study = ({route}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [progress, setProgress] = useState(0);
  const [displayButton, setDisplayButton] = useState(false);
  const [displayNextButton, setDisplayNextButton] = useState(false);
  const [displayFinalButton, setDisplayFinalButton] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipDuration, setFlipDuration] = useState(0);

  const [flashcards, setFlashcards] = useState();

  useEffect(()=>{
    navigation.setOptions({
      title: route.params.study_type,
    });
  },[navigation])

  
  useEffect(()=>{
    const getFlashcards = async () => {
      if(route.params.source_page === 'Home'){
        if(route.params.study_type === t('home.flash_study')){
          const data = await getTodayFlashcards();
          setFlashcards(data.flashcards);
        }
        else{
          if(route.params.collection){
            const data = await getCollectionTodayFlashCards(route.params.collection);
            setFlashcards(data.flashcards);
          }
        }
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
    setFlipDuration(300)
    setTimeout(()=>setIsFlipped(!isFlipped), 100)
    setTimeout(cardFlipped, 500)
  };

  const cardFlipped = () => {
    setDisplayButton(true);
  }

  const handleRemembered = () => {
    displayTransitionButton();
  }

  const handleForgotten = () => {
    displayTransitionButton();
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
    setTimeout(()=>setCurrentCard(prev => prev += 1), 100)
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
        {displayButton && (
          <>
            <CustomButton
              type="green-full"
              label={t('study.remembered')}
              onPress={handleRemembered}
              additionnalStyle={{ marginTop: 20 }}
            />
            <CustomButton
              type="white-outline"
              label={t('study.forgotten')}
              onPress={handleForgotten}
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
              onPress={()=>navigation.reset({
                index:0,
                routes:[
                  {
                    name:'Menu',
                    params:{screen:route.params.source_page}
                  }
                ]
              })}
              additionnalStyle={{ marginTop: 20 }}
            />
          </>
        )}
      </View>
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
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    paddingHorizontal:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1DB954',
    width:'100%',
  },
  face: {
    backgroundColor: 'red',
    height:250,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back:{
    backgroundColor: 'blue',
    height:250,
    width:300,
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export default Study