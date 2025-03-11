import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useState, useEffect } from 'react';
import { Text, useWindowDimensions, View, Keyboard, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "../../publics_pages_components/bottom_sheets/style/ModalStyle";
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { useTranslation } from 'react-i18next';
import { createFlashcard } from '../../../api/flashcard';

const AddFlashCardBottomSheet = forwardRef(({ onAddFlashCard, onEditFlashCard, initialData, collectionId, isRemoteAddFlashcard = false }, ref) => {
  const { width, height } = useWindowDimensions();
  const [face, setFace] = useState(initialData?.front_face || "");
  const [enDos, setEnDos] = useState(initialData?.back_face || "");
  const [erreurs, setErreurs] = useState({});
  const [snapPoints, setSnapPoints] = useState(["50%"]);
  const [isAdding, setIsAdding] = useState(false);
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

  const handleAdd = async ()  => {
      if (validerFormulaire()) {
        if(isRemoteAddFlashcard){
            try{
                setIsAdding(true);
                const formattedDate = new Date();
                const options = { timeZone: 'America/Toronto', year: 'numeric', month: '2-digit', day: '2-digit' };
                const dateDuJour = new Intl.DateTimeFormat('en-CA', options).format(formattedDate);
                const flashcard = { 
                    id: Date.now(),
                    front_face: face,
                    back_face: enDos,
                    last_revision_date: dateDuJour,
                    next_revision_date: dateDuJour, 
                    forgetting_curve_stage: 0, 
                    collection_id: collectionId 
                }
                await createFlashcard(flashcard);
            }catch(e){
                console.log("Erreur lors de l'ajout en remote : "+e);
            }finally{
                setIsAdding(false);
            }
        }
        else if (initialData) {
          onEditFlashCard?.({ 
            ...initialData, 
            front_face: face, 
            back_face: enDos 
          });
        } else {
            const formattedDate = new Date();
            const options = { timeZone: 'America/Toronto', year: 'numeric', month: '2-digit', day: '2-digit' };
            const dateDuJour = new Intl.DateTimeFormat('en-CA', options).format(formattedDate);
          onAddFlashCard?.({ 
              id: Date.now(),
              front_face: face,
              back_face: enDos,
              last_revision_date: dateDuJour,
              next_revision_date: dateDuJour, 
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
          {isAdding && (
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#1DB954" />
            </View>
      )}
      </BottomSheet>
  );
});

export default AddFlashCardBottomSheet;
