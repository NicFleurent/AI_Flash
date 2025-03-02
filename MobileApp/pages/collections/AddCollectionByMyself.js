import React, { useCallback, useRef, useState } from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import CustomInput from '../../components/CustomInput'
import AddFlashCardBottomSheet from '../../components/collections_components/bottoms_sheets/AddFlashCardBottomSheet'
import CustomButton from '../../components/CustomButton'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import FLashCard from '../../components/publics_pages_components/FlashCard'

const AddCollectionByMyself = () => {

    const { width, height } = useWindowDimensions();

    const data = [
        { id: "1", text: "Item 1" },
        { id: "2", text: "Item 2" },
        { id: "3", text: "Item 3" },
        { id: "4", text: "Item 4" },
        { id: "5", text: "Item 5" },
        { id: "6", text: "Item 6" },
        { id: "7", text: "Item 7" },
        { id: "8", text: "Item 8" },
        { id: "9", text: "Item 9" },
      ];

    const [collectionName, setCollectionName] = useState("");
    const addFlashcardRef = useRef(null);

    const openBottomSheet = useCallback(() => {    
        addFlashcardRef.current?.expand();
    }, []);
    
    const closeBottomSheet = useCallback(() => {
        addFlashcardRef.current?.close();
    }, []);

    const renderItem = ({ item }) => {
        return (
          <FLashCard title={"Paris"} description={"Capitale de la france"} isEditable={true} />
        );
    };       
    
  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.container}>
            <View style={{marginTop: 20}}>
                <CustomInput
                    label= "Nom de la collection"
                    value={collectionName}
                    onChangeText={setCollectionName}
                    isPassword={false}
                />
                <CustomButton
                    type="white-outline"
                    label="nouvelle carte"
                    additionnalStyle={{ marginTop: 20 }}
                    onPress={()=>{
                        openBottomSheet();
                    }}
                />

                <View style={{height : height * 0.5, marginTop: 20}}>
                    <FlatList 
                        data={data} 
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}>
                        
                    </FlatList>
                </View>
            </View>

            <CustomButton
                type="green-full"
                label="Enregistrer la collection"
                additionnalStyle={{ marginBottom: 40 }}
                onPress={()=>{
                    
                }}
            />

            <AddFlashCardBottomSheet ref={addFlashcardRef}/>
        </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#000000",
      paddingHorizontal: 10,
      flex: 1,
      justifyContent:"space-between"
    },
  });

export default AddCollectionByMyself
