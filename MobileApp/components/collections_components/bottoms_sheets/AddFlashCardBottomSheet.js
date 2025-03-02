import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowDimensions, View } from 'react-native'
import styles from "../../publics_pages_components/bottom_sheets/style/ModalStyle";
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';

const AddFlashCardBottomSheet = forwardRef(
  ({ face, onChangeTextFace, enDos, onChangeTextEnDos }, ref) => {

    const { width, height } = useWindowDimensions();
    const {t} = useTranslation();

  return (

    <BottomSheet
        ref={ref}
        snapPoints={["50%"]}
        index={-1}
        enablePanDownToClose
        handleComponent={null}
        backgroundComponent={() => (
            <View
              style={[styles.blurView, { width, height }]}
            />
          )}
    >

        <BottomSheetView style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />
            <View style={{marginTop : 20}}></View>
            <CustomInput
              label="Face"
              value={face}
              onChangeText={onChangeTextFace}
              isPassword={false}
            />

            <CustomInput
              label="Endos"
              value={enDos}
              onChangeText={onChangeTextEnDos}
              isPassword={false}
            />

            <CustomButton
              type="green-full"
              label="Ajouter la carte"
              additionnalStyle={{ marginTop: 20 }}
              onPress={() => {
                ref.current?.close();
              }}
            />
          </View>
        </BottomSheetView>
    </BottomSheet>
  )
});

export default AddFlashCardBottomSheet
