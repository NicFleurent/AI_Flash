import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton';
import FlipCard from '../components/flip_card/FlipCard';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Study = ({route}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [progress, setProgress] = useState(0);
  const [displayButton, setDisplayButton] = useState(false);
  const [displayFinalButton, setDisplayFinalButton] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipDuration, setFlipDuration] = useState(0);

  useEffect(()=>{
    navigation.setOptions({
      title: route.params.study_type,
    });
  },[navigation])

  useEffect(()=>{
    const progress = currentCard * 100 / mockUpDataFlashcard.length;
    setProgress(progress)
    if(Math.floor(Math.random() * 2) === 1){
      setIsFlipped(true)
    }
    else{
      setIsFlipped(false)
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
    switchCard();
  }

  const handleForgotten = () => {
    switchCard();
  }

  const switchCard = () => {
    setFlipDuration(0);
    
    setTimeout(()=>{
      if(currentCard < mockUpDataFlashcard.length - 1){
        setCurrentCard(prev => prev += 1)
      }
      else{
        setProgress(100)
        setDisplayFinalButton(true)
      }
    }, 100)

    setDisplayButton(false)
  }

  const mockUpDataFlashcard = [
    {
      id:1,
      front_face:"Capitale de la France",
      back_face:"Paris",
      next_revision_date:'2025-02-26',
      forgetting_curve_stage:1,
      collection_id:1,
      created_at:'2025-02-26',
      updated_at:'2025-02-26',
    },
    {
      id:2,
      front_face:"Capitale de l'Allemagne",
      back_face:"Berlin",
      next_revision_date:'2025-02-26',
      forgetting_curve_stage:1,
      collection_id:1,
      created_at:'2025-02-26',
      updated_at:'2025-02-26',
    },
    {
      id:3,
      front_face:"Capitale de l'Italie",
      back_face:"Rome",
      next_revision_date:'2025-02-26',
      forgetting_curve_stage:1,
      collection_id:1,
      created_at:'2025-02-26',
      updated_at:'2025-02-26',
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressForeground, { width: `${progress}%` }]}></View>
        </View>
      </View>

      <View style={styles.flashcardView}>
        <FlipCard
          isFlipped={isFlipped}
          faceContent={mockUpDataFlashcard[currentCard].front_face}
          backContent={mockUpDataFlashcard[currentCard].back_face}
          onPress={handlePress}
          duration={flipDuration}
        />
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
        {displayFinalButton && (
          <>
            <CustomButton
              type="green-full"
              label={t('button.goBack')}
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