import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { View, ScrollView, Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import CustomButton from "../../CustomButton";
import styles from "./style/ModalStyle";
import { useTranslation } from "react-i18next";

const ChooseCreateSubjectBottomSheet = React.forwardRef(
  ({ onOpenOtherSheet }, ref) => {
    const { width, height } = useWindowDimensions();
    const {t} = useTranslation();
    return (
      <BottomSheet
        ref={ref}
        snapPoints={["55%"]}
        index={-1}
        enablePanDownToClose
        handleComponent={null}
        backgroundComponent={() => (
          <BlurView
            intensity={50}
            style={[styles.blurView, { width, height }]}
          />
        )}
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />

            <Text style={styles.secondModalTitle}>
              {t('explore.bottom_sheet.choose')}
            </Text>
            <CustomButton
              type="green-full"
              label={t('explore.bottom_sheet.add_to_existing_subject')}
              additionnalStyle={{ marginBottom: 20 }}
              onPress={onOpenOtherSheet}
            />
            <CustomButton
              type="white-outline"
              label={t('explore.bottom_sheet.create_new_subject')}
              additionnalStyle={{ marginBottom: 10 }}
              onPress={onOpenOtherSheet}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default ChooseCreateSubjectBottomSheet;
