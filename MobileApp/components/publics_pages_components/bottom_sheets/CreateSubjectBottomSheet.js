import React, { forwardRef, useState, useCallback, useEffect } from "react";
import { View, Text, useWindowDimensions, Keyboard, ActivityIndicator, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import CustomInput from "../../CustomInput";
import CustomButton from "../../CustomButton";
import styles from "./style/ModalStyle";
import { createSubject } from "../../../api/subject";
import { copyCollection } from "../../../api/collection";
import { getFromStorage, getLocalUser } from "../../../api/secureStore";
import { useDispatch } from "react-redux";
import { setValueC } from "../../../stores/sliceChangeCollections";
import { setValueS } from "../../../stores/sliceChangeSubject";

const useKeyboardListener = (setSnapPoints) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setSnapPoints(["90%", "95%"]);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setSnapPoints(["50%"]);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
};

const CreateSubjectBottomSheet = forwardRef(({ onOpenConfirmModal }, ref) => {
  const { width, height } = useWindowDimensions();
  const [matiere, setMatiere] = useState("");
  const [errors, setErrors] = useState({});
  const [snapPoints, setSnapPoints] = useState(["50%"]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useKeyboardListener(setSnapPoints);

  const validateForm = () => {
    const newErrors = {};
    if (!matiere.trim()) newErrors.nom = t("errors.subject_name_required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSubject = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await createSubject(matiere);

      const user = await getLocalUser();
      const collectionIdData = await getFromStorage("collection_id");
      const { collection_id } = JSON.parse(collectionIdData);

      await copyCollection(collection_id, response.data.id, user.id);
      ref.current?.close();
      onOpenConfirmModal();
    } catch (error) {
      console.error("Erreur lors de la création de la matière :", error);
    } finally {
      dispatch(setValueC(true));
      dispatch(setValueS(true));
      setIsLoading(false);
    }
  };

  return (
    <>
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        handleComponent={null}
        backgroundComponent={() => <View style={[styles.blurView, { width, height }]} />}
      >
        <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={{ flexGrow: 1 }}>
          <BottomSheetView style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheet}>
              <View style={styles.handle} />
              <Text style={styles.modalTitle}>{t("explore.bottom_sheet.add_subject")}</Text>

              <CustomInput
                label={t("explore.bottom_sheet.subject_name")}
                value={matiere}
                onChangeText={setMatiere}
                isPassword={false}
              />
              {errors.nom && <Text style={styles.errorText}>{errors.nom}</Text>}

              <CustomButton
                type="green-full"
                label={t("explore.bottom_sheet.add")}
                additionnalStyle={{ marginTop: 20 }}
                onPress={handleAddSubject}
                disabled={isLoading}
              />
            </View>
          </BottomSheetView>
        </KeyboardAwareScrollView>
      </BottomSheet>

      {isLoading && (
        <View style={loadingStyles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </>
  );
});

const loadingStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateSubjectBottomSheet;