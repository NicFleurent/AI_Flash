import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions, Modal, TextInput, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faWarning, faX } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "./CustomInput";
import { useTranslation } from 'react-i18next'
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";

const LanguagesModal = ({
  visible,
  setVisible,
  inputs,
  input,
  setInput,
  error,
  setTypeModal,
  type_modal,
  onPressCreate,
  onPressDelete,
  onPressEdit,
  isCancel,
  onPressCancel,
  modalTitle,
  deleteMessage
}) => {
  const { t } = useTranslation();
  const isTablet = useSelector((state) => state.screen.isTablet);

  return (
    <View>
      <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isTablet && styles.modalContentTablet]}>
            <View style={styles.containerHead}> 
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {t('language_modal.title')}
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <FontAwesomeIcon icon={faX} size={20} color="green"/>
              </TouchableOpacity>
            </View>

            {inputs && inputs.map((input, index)=>(
              <CustomInput
                key={index}
                label={input.label}
                value={input.value}
                onChangeText={input.onChangeText}
                isPassword={input.isPassword}
                error={input.error}
              />
            )) ||

              <CustomInput
                label={t("subject.input.title_input")}
                value={input}
                onChangeText={setInput}
                isPassword={false}
                error={error && error.errorInput}
              />
            }

            <View style={styles.buttonsContainer}>
              {isCancel &&
                <CustomButton
                  type="white-outline"
                  label={t('button.cancel')}
                  onPress={onPressCancel}
                  isSmall={true}
                  additionnalStyle={{width:'35%', marginRight:10}}
                /> 
              ||
                <CustomButton
                  type="white-outline"
                  label={t('button.delete')}
                  onPress={() => setTypeModal("delete")}
                  isSmall={true}
                  additionnalStyle={{width:'35%', marginRight:10}}
                /> 
              }
              <CustomButton
                type="green-full"
                label={t('button.save')}
                onPress={async () => onPressEdit()}
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
});

export default LanguagesModal;
