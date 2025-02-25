import React, { useState, useMemo, useCallback, useRef } from "react";
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

const Explore = () => {
  const [search, onChangeSearch] = useState("");
  const { width, height } = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {t} = useTranslation();
  const listFlashcardRef = useRef(null);
  const chooseCreateSubjectRef = useRef(null);
  const chooseSubjectRef = useRef(null);
  const createSubjectRef = useRef(null);

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
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    const dataCopy = [...data];

    if (numberOfElementsLastRow !== 0) {
      for (let i = numberOfElementsLastRow; i < numColumns; i++) {
        dataCopy.push({ id: `blank-${i}`, empty: true });
      }
    }

    return dataCopy;
  }, [data]);

  const renderItem = useCallback(
    ({ item }) => {
      if (item.empty) {
        return <View style={styles.itemInvisible} />;
      }
      return (
        <CardCollection
          nameMatiere="Programmation orientée objet"
          isPublic={true}
          numberFlashcard={25}
          nameAuthor="Nicolas Fleurent"
          onPress={openListFlashcard}
        />
      );
    },
    [openListFlashcard]
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
            ref={listFlashcardRef}
          />
          <ChooseCreateSubjectBottomSheet
            onOpenOtherSheet={openChooseSubject}
            ref={chooseCreateSubjectRef}
          />
          <ChooseSubjectBottomSheet
            onOpenOtherSheet={openCreateSubject}
            ref={chooseSubjectRef}
          />
          <CreateSubjectBottomSheet
            onOpenConfirmModal={openModal}
            ref={createSubjectRef}
          />

          <AlertModal
            isVisible={isModalVisible}
            onClose={closeModal}
            title="Titre du modal"
            description="Ceci est une description du modal."
            cancelButtonText="Annuler"
            confirmButtonText="Confirmer"
            onCancel={handleCancel}
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
