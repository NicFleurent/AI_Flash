import React, { useState, forwardRef, useEffect, useCallback } from "react";
import { View, Text, useWindowDimensions, ActivityIndicator, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { SelectList } from "react-native-dropdown-select-list";
import { useTranslation } from "react-i18next";
import CustomButton from "../../CustomButton";
import styles from "./style/ModalStyle";
import { getSubjects } from "../../../api/subject";
import { getFromStorage, getLocalUser } from "../../../api/secureStore";
import { copyCollection } from "../../../api/collection";

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getSubjects();
      const transformedSubjects = response.map(({ id, name }) => ({ key: id, value: name }));
      setSubjects(transformedSubjects);
    } catch (err) {
      setError(err);
      console.error("Erreur lors de la récupération des matières :", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return { subjects, isLoading, error };
};

const ChooseSubjectBottomSheet = forwardRef(({ onOpenConfirmModal }, ref) => {
  const { width, height } = useWindowDimensions();
  const { t } = useTranslation();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isCopying, setIsCopying] = useState(false);
  const { subjects, isLoading: isSubjectsLoading } = useSubjects();

  const handleCopyCollection = useCallback(async () => {
    if (!selectedSubject) return;

    setIsCopying(true);
    try {
      const collectionIdData = await getFromStorage("collection_id");
      const { collection_id } = JSON.parse(collectionIdData);
      const user = await getLocalUser();

      const data = await copyCollection(collection_id, selectedSubject, user.id);

      ref.current?.close();
      onOpenConfirmModal();
    } catch (error) {
      console.error("Erreur lors de la copie de la collection :", error);
    } finally {
      setIsCopying(false);
    }
  }, [selectedSubject, ref, onOpenConfirmModal]);

  return (
    <>
      <BottomSheet
        ref={ref}
        snapPoints={["50%"]}
        index={-1}
        handleComponent={null}
        enablePanDownToClose
        backgroundComponent={() => <View style={[styles.blurView, { width, height }]} />}
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />

            <Text style={styles.modalTitle}>{t("explore.bottom_sheet.select_subject")}</Text>

            {isSubjectsLoading ? (
              <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            ) : (
              <SelectList
                setSelected={setSelectedSubject}
                data={subjects}
                save="key"
                placeholder={t("explore.bottom_sheet.select_subject")}
                search={false}
                defaultOption={""}
                boxStyles={styles.selectList}
                inputStyles={styles.selectListInput}
                dropdownStyles={styles.dropdownStyle}
              />
            )}

            <CustomButton
              type="green-full"
              label={t("explore.bottom_sheet.add")}
              additionnalStyle={{ marginBottom: 5, marginTop: 40 }}
              onPress={handleCopyCollection}
              disabled={isCopying || !selectedSubject}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>

      {isCopying && (
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
    zIndex: 9999, 
  },
});

export default ChooseSubjectBottomSheet;