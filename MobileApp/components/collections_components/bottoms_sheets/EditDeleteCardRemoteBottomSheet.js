import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { Text, useWindowDimensions, View, Keyboard, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { updateFlashcard } from '../../../api/flashcard';
import styles from "../../publics_pages_components/bottom_sheets/style/ModalStyle";

const EditDeleteCardRemoteBottomSheet = forwardRef(({ onEditFlashCard, initialData, onClose }, ref) => {
  const { width, height } = useWindowDimensions();
  const [face, setFace] = useState(initialData?.front_face || "");
  const [enDos, setEnDos] = useState(initialData?.back_face || "");
  const [erreurs, setErreurs] = useState({});
  const [snapPoints, setSnapPoints] = useState(["50%"]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setFace(initialData?.front_face || "");
    setEnDos(initialData?.back_face || "");
  }, [initialData]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setSnapPoints(["90%", "95%"]);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setSnapPoints(["50%"]);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validerFormulaire = useCallback(() => {
    const nouvellesErreurs = {};
    if (!enDos.trim()) nouvellesErreurs.endos = t("bottom_sheet_add_flashcard.back_required");
    if (!face.trim()) nouvellesErreurs.face = t("bottom_sheet_add_flashcard.face_required");
    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  }, [enDos, face, t]);

  const handleEdit = useCallback(async () => {
    if (validerFormulaire()) {
      setIsUpdating(true);
      try {
        const updatedData = {
          ...initialData,
          front_face: face,
          back_face: enDos,
        };

        const response = await updateFlashcard(initialData.id, updatedData);

        Toast.show({
          type: 'success',
          text1: t('SUCCESS'),
          text2: t('bottom_sheet_add_flashcard.flashcard_updated'),
        });

        onEditFlashCard?.(response);
        ref.current?.close();
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: t('ERROR'),
          text2: error.message || t('bottom_sheet_add_flashcard.flashcard_update_failed'),
        });
      } finally {
        setIsUpdating(false);
      }
    }
  }, [validerFormulaire, initialData, face, enDos, t, onEditFlashCard, ref]);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      handleComponent={null}
      backgroundComponent={() => <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width, height }} />}
    >
      <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={{ flexGrow: 1 }}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />
            <CustomInput
              label={t("bottom_sheet_add_flashcard.face")}
              value={face}
              onChangeText={setFace}
              isPassword={false}
            />
            {erreurs.face && <Text style={styles.errorText}>{erreurs.face}</Text>}

            <CustomInput
              label={t("bottom_sheet_add_flashcard.back")}
              value={enDos}
              onChangeText={setEnDos}
              isPassword={false}
            />
            {erreurs.endos && <Text style={styles.errorText}>{erreurs.endos}</Text>}

            <CustomButton
              type="green-full"
              label={t("bottom_sheet_add_flashcard.edit_card")}
              additionnalStyle={{ marginTop: 20 }}
              onPress={handleEdit}
              disabled={isUpdating}
            />
            <Toast position='top' bottomOffset={20} />
          </View>
        </BottomSheetView>
      </KeyboardAwareScrollView>

      {isUpdating && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      )}
    </BottomSheet>
  );
});

export default React.memo(EditDeleteCardRemoteBottomSheet);