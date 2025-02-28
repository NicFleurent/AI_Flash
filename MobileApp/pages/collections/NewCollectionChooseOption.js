import React from 'react'
import { View } from 'react-native'

const NewCollectionChooseOption = () => {
  return (
    <View>
      <Text>Comment voulez vous genererz vos cartes ?</Text>

        <CustomButton
            type="green-full"
            label="Par moi meme"
            additionnalStyle={{ marginBottom: 20 }}
            onPress={()=>{}}
        />
        <CustomButton
            type="white-outline"
            label="A partir d'un document"
            additionnalStyle={{ marginBottom: 10 }}
            onPress={()=>{}}
        />
    </View>
  )
}

export default NewCollectionChooseOption
