import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions, Modal, TextInput, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faWarning, faX } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "./CustomInput";
import { useTranslation } from 'react-i18next'
import CustomButton from "./CustomButton";

const CustomModal = ({
  visible,
  setVisible,
  input,
  setInput,
  error,
  setTypeModal,
  type_modal,
  onPressCreate,
  onPressDelete,
  onPressEdit,
}) => {
  const { t } = useTranslation();

  return (
    <View>
      <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={() => [setVisible(false), setInput("")]}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {
              type_modal === "edit" && 
              <>
                <View style={styles.containerHead}> 
                  <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                    {t("subject.input.title_modal_edit")}
                  </Text>
                  <TouchableOpacity onPress={() => [setVisible(false), setInput("")]}>
                    <FontAwesomeIcon icon={faX} size={20} color="green"/>
                  </TouchableOpacity>
                </View>

                <CustomInput
                  label={t("subject.input.title_input")}
                  value={input}
                  onChangeText={setInput}
                  isPassword={false}
                  error={error.errorInput}
                />

                <View style={styles.buttonsContainer}>
                  <CustomButton
                    type="white-outline"
                    label={t('button.delete')}
                    onPress={() => setTypeModal("delete")}
                  /> 
                  <CustomButton
                    type="green-full"
                    label={t('button.save')}
                    onPress={async () => onPressEdit()}
                  />
                </View>
              </>
            }

            {
              type_modal === "add" &&
              <>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                  {t("subject.input.title_modal_add")}
                </Text>

                <CustomInput
                  label={t("subject.input.title_input")}
                  value={input}
                  onChangeText={setInput}
                  isPassword={false}
                  error={error.errorInput}
                />

                <View style={styles.buttonsContainer}>
                  <CustomButton
                    type="white-outline"
                    label={t('button.cancel')}
                    onPress={() => [setVisible(false), setInput("")]}
                  /> 
                  <CustomButton
                    type="green-full"
                    label={t('button.add')}
                    onPress={async () => onPressCreate()}
                  />
                </View>
              </>
            }

            {
              type_modal === "delete" && 
              <>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                  <View style={{marginRight: 30}}>
                    <FontAwesomeIcon icon={faWarning} size={20} color="white" />
                  </View>

                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%'}}>
                      <Text style={[styles.title, {marginBottom: 0}]} numberOfLines={2} ellipsizeMode="tail">Attention</Text>
                      <TouchableOpacity onPress={() => [setVisible(false), setInput("")]}>
                        <FontAwesomeIcon icon={faX} size={20} color="green" />
                      </TouchableOpacity>
                    </View>

                    <Text style={{textAlign: 'center', marginTop: 10, color: 'white', fontSize: 15}}>
                      Voulez-vous vraiment supprimer la matière "{input}" ?
                    </Text>

                    <View style={styles.buttonsContainer}>
                      <CustomButton
                        type="white-outline"
                        label={t('button.cancel')}
                        onPress={() => [setVisible(false), setInput("")]}
                      /> 
                      <CustomButton
                        type="green-full"
                        label={t('button.yes')}
                        onPress={async () => onPressDelete()}
                      />
                    </View>
                  </View>                
                </View>              
              </>
            }
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
    borderRadius: 50
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
    justifyContent: 'space-around',
    width: '50%',
    height: 60,
    marginTop: 20
  },
  containerHead: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
});

export default CustomModal;
