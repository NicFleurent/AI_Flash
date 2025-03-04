import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useState, useEffect } from 'react';
import { Text, useWindowDimensions, View, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "../../publics_pages_components/bottom_sheets/style/ModalStyle";
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { useTranslation } from 'react-i18next';

const AddFlashCardBottomSheet = forwardRef(({ onAddFlashCard, onEditFlashCard, initialData, collectionId }, ref) => {
  const { width, height } = useWindowDimensions();
  const [face, setFace] = useState(initialData?.front_face || "");
  const [enDos, setEnDos] = useState(initialData?.back_face || "");
  const [erreurs, setErreurs] = useState({});
  const [snapPoints, setSnapPoints] = useState(["50%"]);
  const { t } = useTranslation();

  useEffect(() => {
      setFace(initialData?.front_face || "");
      setEnDos(initialData?.back_face || "");
  }, [initialData]);

  useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
              setSnapPoints(["90%", "95%"]);
          }
      );

      const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
              setSnapPoints(["50%"]);
          }
      );

      return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
      };
  }, []);

  const validerFormulaire = () => {
      const nouvellesErreurs = {};
      if (!enDos.trim()) nouvellesErreurs.endos = t("bottom_sheet_add_flashcard.back_required");
      if (!face.trim()) nouvellesErreurs.face = t("bottom_sheet_add_flashcard.face_required");
      setErreurs(nouvellesErreurs);
      return Object.keys(nouvellesErreurs).length === 0;
  };

  const handleAdd = () => {
      if (validerFormulaire()) {
        if (initialData) {
          onEditFlashCard?.({ 
            ...initialData, 
            front_face: face, 
            back_face: enDos 
          });
        } else {
          const formattedDate = new Date();
          formattedDate.setDate(formattedDate.getDate()); 
          const nextRevisionDate = formattedDate.toISOString().split("T")[0];
          onAddFlashCard?.({ 
              id: Date.now(),
              front_face: face,
              back_face: enDos,
              next_revision_date: nextRevisionDate, 
              forgetting_curve_stage: 0, 
              collection_id: collectionId 
          });
        }      
        setFace("");
        setEnDos("");
        ref.current?.close();
      }
  };

  return (
      <BottomSheet
          ref={ref}
          snapPoints={snapPoints} 
          index={-1}
          enablePanDownToClose
          handleComponent={null}
          backgroundComponent={() => <View style={[styles.blurView, { width, height }]} />}
      >
          <KeyboardAwareScrollView
              enableOnAndroid={true} 
              contentContainerStyle={{ flexGrow: 1 }}
          >
              <BottomSheetView style={styles.bottomSheetContainer}>
                  <View style={styles.bottomSheet}>
                      <View style={styles.handle} />
                      <CustomInput
                          label={t("bottom_sheet_add_flashcard.face")}
                          value={face}
                          onChangeText={setFace}
                          isPassword={false}
                      />
                      {erreurs.face && <Text style={{color: "red", fontSize: 12, marginBottom: 8,}}>{erreurs.face}</Text>}

                      <CustomInput
                          label={t("bottom_sheet_add_flashcard.back")}
                          value={enDos}
                          onChangeText={setEnDos}
                          isPassword={false}
                      />
                      {erreurs.endos && <Text style={{color: "red", fontSize: 12, marginBottom: 8,}}>{erreurs.endos}</Text>}

                      <CustomButton
                          type="green-full"
                          label={t(initialData ? "bottom_sheet_add_flashcard.edit_card" : "bottom_sheet_add_flashcard.add_card")}
                          additionnalStyle={{ marginTop: 20 }}
                          onPress={handleAdd}
                      />
                  </View>
              </BottomSheetView>
          </KeyboardAwareScrollView>
      </BottomSheet>
  );
});

export default AddFlashCardBottomSheet;
