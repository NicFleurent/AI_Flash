import { StyleSheet, SafeAreaView, FlatList, StatusBar, Text, View, TouchableOpacity, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import CardCollection from "../../components/PagesPubliques/CardCollection";
import { getCollections, editSubject } from "../../api/collection";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import CustomModal from '../../components/CustomModal'
import Toast from 'react-native-toast-message';



const Collections = ({ route }) => {

  const navigation = useNavigation();
  const { t } = useTranslation();
  const { id, name } = route.params
  // console.log(id)
  const [collections, setCollections] = useState([]);
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState("")
  const [type_modal, setTypeModal] = useState("")
  const [error, setError] = useState([]);
  const [isError, setIsError] = useState(false);

  const onChangeText = (value, setInput) => {
    setInput(value);

    if (isError)
      validateForm();
  }

  const validateForm = () => {
    let tempErrors = [];

    if (input === "")
      tempErrors.errorInput = t('subject.error.title_input_required');

    setError(tempErrors);
    setIsError(!(Object.keys(tempErrors).length === 0))

    return Object.keys(tempErrors).length === 0;
  }

  const updateHeader = (newTitle) => {
    navigation.setOptions({
      title: newTitle || "Collections"
    })
  }

  const editUserSubject = async () => {
    // console.log('Create User Subject called')
    if (validateForm()) {
      try {
        // console.log('Form Good')

        const response = await editSubject(id, input);
        // console.log('Response : ' + response.message)

        if (response && response.message) {
          Toast.show({
            type: 'success',
            text1: t('subject.success'),
            text2: response.message,
          });

          getUserCollections();
          updateHeader(input)
          navigation.setParams({'update': input})
        }

        setInput("")
        setVisible(false)
      } catch (error) {
        console.log('Error: ' + error)

        Toast.show({
          type: 'error',
          text1: t('ERROR'),
          text2: error.message,
        });
      }
    }
    else
      setIsError(true)
  }

  const getUserCollections = async () => {
    try {
      const response = await getCollections(id);
      setCollections(response);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCollections();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <CardCollection
        nameMatiere={item.name}
        isPublic={false}
        numberCollection={item.count}
        onPress={() => navigation.navigate("Collections")}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView>
                    <View> */}
      <View style={styles.containerSecond}>
        <Text style={styles.titre}>{t("subject.collections.title")}</Text>
        <TouchableOpacity onPress={() => [setVisible(true), setInput(name), setTypeModal("Edit")]}>
          <FontAwesomeIcon icon={faPenToSquare} size={20} style={styles.fontIcon} />
        </TouchableOpacity>
      </View>

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
        title={t("subject.collections.input.title_modal")}
        title_input={t("subject.collections.input.title_input")}
        input={input}
        setInput={(value) => onChangeText(value, setInput)}
        error={error}
        onPressEdit={editUserSubject}
        type_modal={type_modal}
      />

      <Button title="MODIFIER" onPress={() => [setTypeModal("Edit"), setVisible(true)]} />
      <StatusBar style="auto" />
      {/* </View>
                </ScrollView> */}
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
});
