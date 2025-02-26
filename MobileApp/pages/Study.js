import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton';

const Study = () => {
  const [progress, setProgress] = useState(20);
  const [displayButton, setDisplayButton] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressForeground, {width:`${progress}%`}]}></View>
        </View>
      </View>

      <View style={styles.flashcardView}>
        <Text style={{color:'white'}}>Test</Text>
      </View>

      <View style={styles.buttonContainer}>
        {displayButton && (
          <>
            <CustomButton 
              type="green-full"
              label="Je m'en souvenais"
              onPress={()=>setProgress(prev => prev += 10)}
              additionnalStyle={{marginTop:20}}
            />
            <CustomButton 
              type="white-outline"
              label="J'avais oublié"
              onPress={()=>setProgress(prev => prev += 10)}
              additionnalStyle={{marginTop:20}}
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
    paddingHorizontal:20
  },
  progressContainer:{
    flex:2,
  },
  progressBackground:{
    width:'100%',
    height:20,
    backgroundColor:'#757575',
    borderRadius:10
  },
  progressForeground:{
    height:20,
    backgroundColor:'#1DB954',
    borderRadius:10
  },
  flashcardView:{
    flex:3,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonContainer:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
  }
}

export default Study