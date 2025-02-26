import React, { useState, forwardRef } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import CustomButton from "../../CustomButton";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style/ModalStyle";
import { useTranslation } from "react-i18next";

const ChooseSubjectBottomSheet = forwardRef(({ onOpenOtherSheet }, ref) => {
  const { width, height } = useWindowDimensions();
  const {t} = useTranslation();
  const [matiere, setMatiere] = useState("");

  const subjectOptions = [
    { key: "1", value: "Science" },
    { key: "2", value: "Mathematique" },
    { key: "3", value: "Physique" },
    { key: "4", value: "Chimie" },
  ];

  return (
    <BottomSheet
      ref={ref}
      snapPoints={["50%"]}
      index={-1}
      handleComponent={null}
      enablePanDownToClose
      backgroundComponent={() => (
        <View style={[styles.blurView, { width, height }]} />
      )}
    >
      <BottomSheetView style={styles.bottomSheetContainer}>
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />

          <Text style={styles.modalTitle}>{t('explore.bottom_sheet.select_subject')} </Text>

          <SelectList
            setSelected={(val) => setMatiere(val)}
            data={subjectOptions}
            save="value"
            placeholder={t('explore.bottom_sheet.select_subject')}
            search={false}
            defaultOption={""}
            boxStyles={styles.selectList}
            inputStyles={styles.selectListInput}
            dropdownStyles={styles.dropdownStyle}
          />

          <CustomButton
            type="green-full"
            label={t('explore.bottom_sheet.add')}
            additionnalStyle={{ marginBottom: 5, marginTop: 40 }}
            onPress={onOpenOtherSheet}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default ChooseSubjectBottomSheet;
