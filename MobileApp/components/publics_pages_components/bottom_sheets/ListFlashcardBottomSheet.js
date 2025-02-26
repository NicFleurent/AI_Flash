import React, { forwardRef } from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import FLashCard from "../FlashCard";
import CustomButton from "../../CustomButton";
import styles from "./style/ModalStyle";
import { useTranslation } from "react-i18next";

const ListFlashcardBottomSheet = forwardRef(({ onOpenOtherSheet }, ref) => {
  const { width, height } = useWindowDimensions();
  const {t} = useTranslation();

  const limitedData = [
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
  ];

  const renderItemModal = ({ item }) => (
    <FLashCard
      title="Polymorphisme"
      description="Permet d’interchanger des entités parentes entre elles."
    />
  );

  return (
    <BottomSheet
      ref={ref}
      snapPoints={["50%", "65%", "75%"]}
      index={-1}
      enablePanDownToClose
      handleComponent={null}
      backgroundComponent={() => (
        <View
          style={[styles.absoluteFill, { width, height }]}
        />
      )}
    >
      <BottomSheetView style={styles.bottomSheetContainer}>
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          <Text style={styles.modalTitle}>Programmation orientée objet</Text>
          <Text style={styles.modalSubTitle}>{t('explore.bottom_sheet.author')} Nicolas Fleurent</Text>
          <FlatList
            scrollEnabled={false}
            style={styles.flatList}
            renderItem={renderItemModal}
            keyExtractor={(item) => item.id}
            data={limitedData}
          />
          <CustomButton
            type="green-full"
            label={t('explore.bottom_sheet.copy')}
            additionnalStyle={{ marginBottom: 40, marginTop: 30 }}
            onPress={onOpenOtherSheet}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default ListFlashcardBottomSheet;
