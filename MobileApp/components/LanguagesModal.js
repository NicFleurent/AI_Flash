import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions, Modal, TextInput, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faWarning, faX } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "./CustomInput";
import { useTranslation } from 'react-i18next'
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { getLocalData, saveLocalData } from "../api/asyncStorage";

const LanguagesModal = ({
  visible,
  setVisible
}) => {
  const { t, i18n } = useTranslation();
  const isTablet = useSelector((state) => state.screen.isTablet);

  const [language, setLanguage] = useState("");

  const languageData = [
    { label: 'Français', value: 'fr' },
    { label: 'English', value: 'en' },
  ]

  useEffect(()=>{
    const getParams = async () =>{
      const langue = await getLocalData("language");
      setLanguage(langue);
    }
    getParams()
  },[])

  const handleSave = () => {
    saveLocalData("language", language);
    i18n.changeLanguage(language.value);
  }

  return (
    <View>
      <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isTablet && styles.modalContentTablet]}>
            <View style={styles.containerHead}> 
              <Text style={styles.title}>
                {t('language_modal.title')}
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <FontAwesomeIcon icon={faX} size={20} color="green"/>
              </TouchableOpacity>
            </View>

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={languageData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Veuillez choisir une option"
              value={language}
              onChange={setLanguage}
            />

            <Text style={styles.warning}>
              {t('language_modal.warning')}
            </Text>

            <View style={styles.buttonsContainer}>
              <CustomButton
                type="white-outline"
                label={t('button.cancel')}
                onPress={() => setVisible(false)}
                isSmall={true}
                additionnalStyle={{width:'35%', marginRight:10}}
              /> 
              <CustomButton
                type="green-full"
                label={t('button.save')}
                onPress={handleSave}
                isSmall={true}
                additionnalStyle={{width:'35%'}}
              />
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 35
  },
  modalContentTablet:{
    width:'50%'
  },
  title: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  warning: {
    fontSize: 18,
    color: 'red',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  containerHead: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'white'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'white'
  },
});

export default LanguagesModal;
