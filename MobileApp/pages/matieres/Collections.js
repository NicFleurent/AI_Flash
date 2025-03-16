import { SafeAreaView, StatusBar, StyleSheet, Text, FlatList, View, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Toast from 'react-native-toast-message';
import CustomModal from '../../components/CustomModal'
import CardCollection from '../../components/publics_pages_components/CardCollection';
import { getCollections, createCollection, updateCollection, deleteCollection } from "../../api/collection";
import { useDispatch, useSelector } from "react-redux";
import { setValueC } from "../../stores/sliceChangeCollections";
import { setValueS } from "../../stores/sliceChangeSubject";

const Collections = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const { item } = route.params || {}
  const [collections, setCollections] = useState([]);
  const [visible, setVisible] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [input, setInput] = useState("")
  const [collection_id, setCollectionId] = useState("")
  const [type_modal, setTypeModal] = useState("")
  const [error, setError] = useState([]);
  const [isError, setIsError] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const collectionsChange = useSelector((state) => state.changeCollectionsSlice.value)
  
  const onChangeText = (value, setInput) => {
    setInput(value);

    if (isError)
      validateForm();
  }

  const validateForm = () => {
    let tempErrors = [];

    if (input === "")
      tempErrors.errorInput = t('subject.error.title_input_required_collections');

    setError(tempErrors);
    setIsError(!(Object.keys(tempErrors).length === 0))

    return Object.keys(tempErrors).length === 0;
  }

  const getUserCollections = async () => {
    try {
      const response = await getCollections(item.id);
      setCollections(response);
    } catch (error) {
      console.log(error);
    }
  };

  const create = async () => {
    if (validateForm()) {
      try {
        const response = await createCollection(item.id, input);

        if (response && response.message) {
          Toast.show({
            type: 'success',
            text1: t('SUCCESS'),
            text2: t(response.message)
          });
          getUserCollections();
        }

        setInput("")
        setVisible(false)
        dispatch(setValueS(true))
      } catch (error) {
        console.log('Error: ' + error)

        Toast.show({
          type: 'error',
          text1: t('ERROR'),
          text2: t(error.message)
        });
      }
    }
    else
      setIsError(true)
  }

  const edit = async () => {
    if (validateForm()) {
      try {
        const response = await updateCollection(collection_id, input, isPublic);

        if (response && response.message) {
          Toast.show({
            type: 'success',
            text1: t('SUCCESS'),
            text2: t(response.message)
          });

          getUserCollections();
        }

        setInput("")
        setCollectionId(null)
        setVisible(false)
      } catch (error) {
        console.log('Error: ' + error)

        Toast.show({
          type: 'error',
          text1: t('ERROR'),
          text2: t(error.message)
        });
      }
    }
    else
      setIsError(true)
  }

  const drop = async () => {
    try {
      const response = await deleteCollection(collection_id);

      if (response && response.message) {
        Toast.show({
          type: 'success',
          text1: t('SUCCESS'),
          text2: t(response.message)
        });

        getUserCollections();
      }

      setInput("")
      setVisible(false)
      setCollectionId(null)
      dispatch(setValueS(true))
    } catch (error) {
      console.log('Error: ' + error)

      Toast.show({
        type: 'error',
        text1: t('ERROR'),
        text2: t(error.message)
      });
    }
  }

  const handleItemPress = (item) => {
    setSelectItem(item);
  };

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);  
      try {
        const response = await getUserCollections();
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);  
      }
    };
  
    fetchCollections();
  }, []);

  useEffect(() => {
    if (collectionsChange) {
      try {
          setIsLoading(true);
          Toast.show({
            type: 'success',
            text1: t('SUCCESS'),
            text2: t('add_collection_by_ai.success'),
          });
          
          getUserCollections();
          dispatch(setValueC(false))
          dispatch(setValueS(true))
      } catch (error) {
        console.log("Erreru - ", error)
      } finally {
        setIsLoading(false);
      }
    }
  }, [collectionsChange]);

  const renderItem = ({ item }) => {
    return (
      <CardCollection
        nameMatiere={item.name}
        isPublic={true}
        isEditable={true}
        numberFlashcard={item.flashcards_count}
        onArrowPress={() => navigation.navigate("FlashcardsShow", { screen: "Flashcards", params: { item: item } })}
        onPenPress={() => [setTypeModal("edit"), setVisible(true), setInput(item.name), setCollectionId(item.id), setIsPublic(item.is_public)]}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View>
        <Text style={styles.titre}>{t("subject.collections.title")}</Text>

        <FlatList
          style={styles.flatList}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          data={collections}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />

        <CustomModal
          visible={visible}
          setVisible={setVisible}
          input={input}
          isPublic={isPublic === 0 ? false : true}
          setIsPublic={(value) => setIsPublic(value ? 1 : 0)}
          setInput={(value) => onChangeText(value, setInput)}
          error={error}
          setError={setError}
          type_modal={type_modal}
          setTypeModal={setTypeModal}
          onPressCreate={create}
          onPressEdit={edit}
          onPressDelete={drop}
          modalTitle={t("subject.collections.input.title_modal_" + type_modal)}
          inputTitle={t("subject.collections.input.title_input")}
          deleteMessage={t("subject.collections.input.modal_delete")}
        />

        <TouchableOpacity
          style={styles.floatingInput}
          onPress={() => navigation.navigate("CollectionsCreate", { screen: "NewCollectionChooseOptions", params: { item: item } })}
        >
          <FontAwesomeIcon icon={faPlus} size={20} color="black" />
        </TouchableOpacity>

        <Toast position='top' bottomOffset={20} />

        <StatusBar style="auto" />
      </View>

      {isLoading && (
        <ActivityIndicator
          style={styles.overlay}
          size="large"
          color="#1DB954"
        />
      )}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Collections;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
  containerSecond: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  titre: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
  fontIcon: {
    color: "green",
    marginTop: 10,

  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  flatList: {
    marginTop: 10,
  },
  floatingInput: {
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    top: 570,
    right: 20,
    height: 60,
    backgroundColor: 'green',
    borderRadius: 100,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
