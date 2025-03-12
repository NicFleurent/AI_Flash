import { SafeAreaView, StatusBar, StyleSheet, Text, FlatList, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Toast from 'react-native-toast-message';
import CustomModal from '../../components/CustomModal'
import CardCollection from '../../components/publics_pages_components/CardCollection';
import { getCollections, createCollection, updateCollection, deleteCollection } from "../../api/collection";

const Collections = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { id } = route.params?.item
  const { setChange } = route.params
  const [collections, setCollections] = useState([]);
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState("")
  const [collection_id, setCollectionId] = useState("")
  const [type_modal, setTypeModal] = useState("")
  const [name_modal, setNameModal] = useState("")
  const [error, setError] = useState([]);
  const [isError, setIsError] = useState(false);
  const [selectItem, setSelectItem] = useState({});

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
      const response = await getCollections(id);
      setCollections(response);
    } catch (error) {
      console.log(error);
    }
  };

  const create = async () => {
    if (validateForm()) {
      try {
        const response = await createCollection(id, input);

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
        setChange(true)
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
        const response = await updateCollection(collection_id, input);

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
    getUserCollections();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <CardCollection
        nameMatiere={item.name}
        isPublic={true}
        isEditable={true}
        numberFlashcard={item.flashcards_count}
        onArrowPress={() => navigation.navigate("FlashcardsShow", { screen: "Flashcards", params: { item: item } })}
        onPenPress={() => [setTypeModal("edit"), setVisible(true), setInput(item.name), setCollectionId(item.id)]}
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
            setInput={(value) => onChangeText(value, setInput)}
            error={error}
            setError={setError}
            name_modal={name_modal}
            type_modal={type_modal}
            setTypeModal={setTypeModal}
            onPressCreate={create}
            onPressEdit={edit}
            onPressDelete={drop}
            modalTitle={t("subject.collections.input.title_modal_"+type_modal)}
            deleteMessage={t("subject.collections.input.modal_delete")}
          />

          <TouchableOpacity
            style={styles.floatingInput}
            onPress={() => navigation.navigate("CollectionsCreate", { screen: "NewCollectionChooseOptions", params: { id: id } })}
            // onPress={() => [setTypeModal("add"), setVisible(true), setNameModal("collection")]}
          >
            <FontAwesomeIcon icon={faPlus} size={20} color="black" />
          </TouchableOpacity>

          <Toast position='top' bottomOffset={20} />

          <StatusBar style="auto" />
        </View>
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
    paddingHorizontal: 20,
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
  }
});
