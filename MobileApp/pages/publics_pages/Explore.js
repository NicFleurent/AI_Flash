import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { StatusBar, StyleSheet, FlatList, View, Platform } from "react-native";
import CardCollection from "../../components/publics_pages_components/CardCollection";
import CustomInput from "../../components/CustomInput";
import { useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ListFlashcardBottomSheet from "../../components/publics_pages_components/bottom_sheets/ListFlashcardBottomSheet";
import ChooseCreateSubjectBottomSheet from "../../components/publics_pages_components/bottom_sheets/ChooseCreateSubjectBottomSheet";
import ChooseSubjectBottomSheet from "../../components/publics_pages_components/bottom_sheets/ChooseSubjectBottomSheet";
import CreateSubjectBottomSheet from "../../components/publics_pages_components/bottom_sheets/CreateSubjectBottomSheet";
import AlertModal from "../../components/AlertModal";
import { useTranslation } from "react-i18next";
import {getPublicCollections} from "../../api/collection";
import { saveToStorage } from "../../api/secureStore";


const Explore = () => {
  const [search, onChangeSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {t} = useTranslation();
  const listFlashcardRef = useRef(null);
  const chooseCreateSubjectRef = useRef(null);
  const chooseSubjectRef = useRef(null);
  const createSubjectRef = useRef(null);
  const [collections, setCollections] = useState([]);
  const [selectItem, setSelectItem] = useState({});

  useEffect(()=>{
    
    const setPublicCollections = async () => {
      try {
          const result = await getPublicCollections();
          setCollections(result);
        } catch (error) {
            console.error(error.message);
        }
    }

    setPublicCollections();

    },[])

  const openBottomSheet = useCallback((ref) => {
    [
      listFlashcardRef,
      chooseCreateSubjectRef,
      chooseSubjectRef,
      createSubjectRef,
    ].forEach((sheetRef) => sheetRef.current?.close());

    ref.current?.expand();
  }, []);

  const closeBottomSheet = useCallback((ref) => {
    ref.current?.close();
  }, []);

  const openChooseCreateSubject = useCallback(() => {
    openBottomSheet(chooseCreateSubjectRef);
  }, [openBottomSheet]);

  const openChooseSubject = useCallback(() => {
    openBottomSheet(chooseSubjectRef);
  }, [openBottomSheet]);

  const openCreateSubject = useCallback(() => {
    openBottomSheet(createSubjectRef);
  }, [openBottomSheet]);

  const openListFlashcard = useCallback(() => {
    openBottomSheet(listFlashcardRef);
  }, [openBottomSheet]);

  const openModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleConfirm = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleCancel = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const formattedData = useMemo(() => {
    const numColumns = 2;
    const numberOfFullRows = Math.floor(collections.length / numColumns);
    let numberOfElementsLastRow = collections.length - numberOfFullRows * numColumns;
    const dataCopy = [...collections];

    if (numberOfElementsLastRow !== 0) {
      for (let i = numberOfElementsLastRow; i < numColumns; i++) {
        dataCopy.push({ id: `blank-${i}`, empty: true });
      }
    }

    return dataCopy;
  }, [collections]);

  const renderItem = useCallback(
    ({ item }) => {
      if (item.empty) {
        return <View style={styles.itemInvisible} />;
      }
  
      const handleArrowPress = async () => {
        setSelectItem(item);
        await saveToStorage("collection_id", JSON.stringify({ collection_id: item.id }));
        openListFlashcard();
      };
  
      return (
        <CardCollection
          nameMatiere={item.name}
          isPublic={true}
          numberFlashcard={item.flashcards.length}
          nameAuthor={item.lastname + " " + item.firstname}
          onArrowPress={handleArrowPress} 
        />
      );
    },
    [openListFlashcard, saveToStorage] 
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ marginTop: Platform.OS === "ios" ? 20 : 0 }}>
          <CustomInput
            label={t('explore.find')}
            value={search}
            onChangeText={onChangeSearch}
            isPassword={false}
          />
        </View>

        <FlatList
          style={styles.flatList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          data={formattedData}
          numColumns={2}
          contentContainerStyle={{ flexGrow: 1 }}
        />

        <View style={styles.overlay}>
          <ListFlashcardBottomSheet
            onOpenOtherSheet={openChooseCreateSubject}
            name={selectItem.name}
            author={selectItem.lastname +" "+selectItem.firstname}
            data={selectItem.flashcards}
            ref={listFlashcardRef}
          />
          <ChooseCreateSubjectBottomSheet
            onSelectSubjectSheet={openChooseSubject} 
            onCreateSubjectSheet={openCreateSubject}
            ref={chooseCreateSubjectRef}
          />
          <ChooseSubjectBottomSheet
            onOpenConfirmModal={openModal}
            ref={chooseSubjectRef}
          />
          <CreateSubjectBottomSheet
            onOpenConfirmModal={openModal}
            ref={createSubjectRef}
          />
          
          <AlertModal
            isVisible={isModalVisible}
            onClose={closeModal}
            showCancelButton={false}
            title="Success"
            description="Collection copier avec suceess"
            confirmButtonText="Ok"
            onConfirm={handleConfirm}
          />
        </View>

        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    paddingHorizontal: 10,
    flex: 1,
  },
  itemInvisible: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    margin: 5,
    flex: 1,
  },
  flatList: {
    marginTop: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: "box-none",
  },
});

export default Explore;
