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
import { useSelector } from "react-redux";

const ListFlashcardBottomSheet = forwardRef(({ onOpenOtherSheet, name, author, data }, ref) => {
  const { width, height } = useWindowDimensions();
  const {t} = useTranslation();
  const isTablet = useSelector((state) => state.screen.isTablet);

  const renderItemModal = ({ item }) => (
    <FLashCard
      title={item.front_face}
      description={item.back_face}
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
          <Text style={styles.modalTitle}>{name}</Text>
          <Text style={styles.modalSubTitle}>{t('explore.bottom_sheet.author')} {author}</Text>
          <FlatList
            scrollEnabled={true}
            style={styles.flatList}
            renderItem={renderItemModal}
            keyExtractor={(item) => item.id}
            data={data}
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
