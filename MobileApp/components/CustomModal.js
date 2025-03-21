import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions, Modal, TextInput, TouchableOpacity, Switch } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faWarning, faX } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "./CustomInput";
import { useTranslation } from 'react-i18next'
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";

const CustomModal = ({
  visible,
  setVisible,
  inputs,
  input,
  setInput,
  error,
  setError,
  setTypeModal,
  type_modal,
  onPressCreate,
  onPressDelete,
  onPressEdit,
  isCancel,
  onPressCancel,
  modalTitle,
  inputTitle,
  deleteMessage,
  isPublic,
  setIsPublic
}) => {
  const { t } = useTranslation();
  const isTablet = useSelector((state) => state.screen.isTablet);

  return (
    <View>
      <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={() => [setVisible(false), setInput("")]}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isTablet && styles.modalContentTablet]}>
            {
              type_modal === "edit" && 
              <>
                <View style={styles.containerHead}> 
                  <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                    {modalTitle}
                  </Text>
                  <TouchableOpacity onPress={() => [setVisible(false), isCancel ? onPressCancel() : setInput(""), !isCancel && setError([])]}>
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
                    label={inputTitle}
                    value={input}
                    onChangeText={setInput}
                    isPassword={false}
                    error={error && error.errorInput}
                  />
                }

                {isPublic !== undefined && (
                  <View style={styles.switchContainer}>
                    <Text style={styles.isPublicTxt}>{t('switch.public')}</Text>
                    <Switch
                        value={isPublic}
                        onValueChange={setIsPublic}
                        trackColor={{ false: 'lightgray', true: '#8EDCAA' }}
                        thumbColor={isPublic ? '#1DB954' : 'gray'}
                        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                      />
                  </View>
                )}

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
              </>
            }

            {
              type_modal === "add" &&
              <>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                  {modalTitle}
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
                    isSmall={true}
                    additionnalStyle={{width:'35%', marginRight:10}}
                    onPress={() => [setVisible(false), setInput(""), setError([])]}
                  /> 
                  <CustomButton
                    type="green-full"
                    label={t('button.add')}
                    onPress={async () => onPressCreate()}
                    isSmall={true}
                    additionnalStyle={{width:'35%'}}
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
                      <TouchableOpacity onPress={() => [setVisible(false), setInput(""), setError([])]}>
                        <FontAwesomeIcon icon={faX} size={20} color="green" />
                      </TouchableOpacity>
                    </View>

                    <Text style={{textAlign: 'left', marginTop: 10, color: 'white', fontSize: 15}}>
                      {deleteMessage}"{input}" ?
                    </Text>

                    <View style={styles.buttonsContainer}>
                      <CustomButton
                        type="white-outline"
                        label={t('button.cancel')}
                        isSmall={true}
                        additionnalStyle={{width:'35%', marginRight:10, marginTop:20}}
                        onPress={() => [setVisible(false), setInput(""), setError([])]}
                      /> 
                      <CustomButton
                        type="green-full"
                        label={t('button.yes')}
                        onPress={async () => onPressDelete()}
                        isSmall={true}
                        additionnalStyle={{width:'35%', marginTop:20}}
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
  
  switchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    marginBottom:20
  },
  isPublicTxt: {
    color:"white",
    marginRight: 20,
    fontSize: 16,
    fontWeight: '700'
  },
});

export default CustomModal;
