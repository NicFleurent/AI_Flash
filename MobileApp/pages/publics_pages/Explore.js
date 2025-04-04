import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { StatusBar, StyleSheet, FlatList, View, Platform, ActivityIndicator, RefreshControl } from "react-native"; // Ajoutez ActivityIndicator ici
import CardCollection from "../../components/publics_pages_components/CardCollection";
import CustomInput from "../../components/CustomInput";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ListFlashcardBottomSheet from "../../components/publics_pages_components/bottom_sheets/ListFlashcardBottomSheet";
import ChooseCreateSubjectBottomSheet from "../../components/publics_pages_components/bottom_sheets/ChooseCreateSubjectBottomSheet";
import ChooseSubjectBottomSheet from "../../components/publics_pages_components/bottom_sheets/ChooseSubjectBottomSheet";
import CreateSubjectBottomSheet from "../../components/publics_pages_components/bottom_sheets/CreateSubjectBottomSheet";
import AlertModal from "../../components/AlertModal";
import { useTranslation } from "react-i18next";
import { getPublicCollections } from "../../api/collection";
import { saveToStorage } from "../../api/secureStore";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updateExplore } from "../../stores/sliceUpdateExplore";

const Explore = () => {
  const [search, onChangeSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const listFlashcardRef = useRef(null);
  const chooseCreateSubjectRef = useRef(null);
  const chooseSubjectRef = useRef(null);
  const createSubjectRef = useRef(null);
  const isTablet = useSelector((state) => state.screen.isTablet);
  const [collections, setCollections] = useState([]);
  const [selectItem, setSelectItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const updateExploreState = useSelector((state) => state.updateExplore.value);
  const dispatch = useDispatch();

  const onRefresh = async () => {
    setRefreshing(true);
    const setPublicCollections = async () => {
      setIsLoading(true); 
      try {
        const result = await getPublicCollections();
        setCollections(result);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setPublicCollections();
    setRefreshing(false);
    return true;
  };

  useEffect(() => {
    const setPublicCollections = async () => {
      try {
        const result = await getPublicCollections();
        setCollections(result);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false); 
      }
    };

    setPublicCollections();
  }, []);

  useEffect(()=>{
    const setPublicCollections = async () => {
      setIsLoading(true); 
      try {
        const result = await getPublicCollections();
        setCollections(result);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setPublicCollections();

      dispatch(updateExplore(false));
  }, [updateExploreState]);

  const filteredCollections = useMemo(() => {
    if (!search) return collections; 
    return collections.filter((collection) =>
      collection.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [collections, search]);

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
    const numColumns = isTablet ? 3 :2;
    const numberOfFullRows = Math.floor(filteredCollections.length / numColumns);
    let numberOfElementsLastRow = filteredCollections.length - numberOfFullRows * numColumns;
    const dataCopy = [...filteredCollections];

    if (numberOfElementsLastRow !== 0) {
      for (let i = numberOfElementsLastRow; i < numColumns; i++) {
        dataCopy.push({ id: `blank-${i}`, empty: true });
      }
    }

    return dataCopy;
  }, [filteredCollections]);

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
    [openListFlashcard]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#1DB954" />
          </View>
        )}

        <View style={{ marginTop: Platform.OS === "ios" ? 20 : 0 }}>
          <CustomInput
            label={t("explore.find")}
            value={search}
            onChangeText={onChangeSearch}
            isPassword={false}
            placeholder={t("explore.search_placeholder")} />
        </View>

        <FlatList
          style={styles.flatList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          data={formattedData}
          numColumns={isTablet ? 3 : 2}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
              colors={["#1DB954"]}
              tintColor="#1DB954"
            />
          }
        />

        <View style={styles.overlay}>
          <ListFlashcardBottomSheet
            onOpenOtherSheet={openChooseCreateSubject}
            name={selectItem.name}
            author={selectItem.lastname + " " + selectItem.firstname}
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
            description="Collection copiée avec succès"
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
  loadingOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    zIndex: 9999, 
  },
});

export default Explore;