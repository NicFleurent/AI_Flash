import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'

const NewCollectionChooseOptions = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>

      <Text style={styles.texte}>Comment voulez-vous générer vos cartes?</Text>

        <CustomButton
            type="white-outline"
            label="Par moi meme"
            additionnalStyle={{ marginBottom: 30 }}
            onPress={()=>{
              navigation.navigate("AddCollectionByMyself");
            }}
        />
        <CustomButton
            type="green-full"
            label="A partir d'un document"
            onPress={()=>{
              navigation.navigate("AddCollectionByAi");
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
  },
  texte:{
    fontSize: 32,
    color:"white",
    fontWeight:"bold",
    paddingHorizontal: 20,
    marginBottom:40,
    textAlign:"center"
    }
});

export default NewCollectionChooseOptions
