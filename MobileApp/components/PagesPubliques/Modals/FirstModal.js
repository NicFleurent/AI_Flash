import React from "react";
import { View, ScrollView, Text, FlatList } from "react-native";
import { BlurView } from "expo-blur";
import FLashCard from "../FlashCard";
import styles from "./Style/ModalStyle";
import CustomButton from "../../CustomButton";
import Modal from "react-native-modal";
import { useWindowDimensions } from "react-native";

const FirstModal = ({ isVisible, onClose, onNext }) => {
  const limitedData = [
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
  ];

  const { width, height } = useWindowDimensions();

  const renderItemModal = ({ item }) => (
    <FLashCard
      title="Polymorphisme"
      description="Permet d’interchanger des entités parentes entre elles."
    />
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onDismiss={onNext}
      swipeDirection="down"
      style={styles.modal}
    >
      <BlurView
        intensity={10}
        style={[styles.blurView, { width: width, height: height }]}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Programmation orientée objet
              </Text>
              <Text style={styles.modalSubTitle}>
                Créée par Nicolas Fleurent
              </Text>
              <FlatList
                scrollEnabled={false}
                style={styles.flatList}
                renderItem={renderItemModal}
                keyExtractor={(item) => item.id}
                data={limitedData}
              />
              <CustomButton
                type="green-full"
                label="Copier"
                additionnalStyle={{ marginBottom: 40, marginTop: 10 }}
                onPress={onClose}
              />
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default FirstModal;
