import React, { useRef, forwardRef } from "react";
import { View, ScrollView, Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import CustomInput from "../../CustomInput";
import CustomButton from "../../CustomButton";
import styles from "./style/ModalStyle";
import { useTranslation } from "react-i18next";

const CreateSubjectBottomSheet = forwardRef(
  ({ matiere, setMatiere, onOpenConfirmModal }, ref) => {
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
          <BlurView
            intensity={10}
            style={[styles.blurView, { width, height }]}
          />
        )}
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />

            <Text style={styles.modalTitle}>{t('explore.bottom_sheet.add_subject')}</Text>
            <CustomInput
              label={t('explore.bottom_sheet.subject_name')}
              value={matiere}
              onChangeText={setMatiere}
              isPassword={false}
            />
            <CustomButton
              type="green-full"
              label={t('explore.bottom_sheet.add')}
              additionnalStyle={{ marginTop: 20 }}
              onPress={() => {
                ref.current?.close();
                onOpenConfirmModal();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default CreateSubjectBottomSheet;
