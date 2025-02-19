import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { BlurView } from "expo-blur";
import CustomButton from "../../CustomButton";
import styles from "./Style/ModalStyle";
import Modal from "react-native-modal";
import { useWindowDimensions } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const ThirdModal = ({ isVisible, onClose, onNext }) => {
  const { width, height } = useWindowDimensions();
  const [matiere, setMatiere] = useState("");

  const deliveryOptions = [
    { key: "1", value: "Cellulaire" },
    { key: "2", value: "Professionnel" },
  ];

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
              <Text style={styles.modalTitle}>Selectionner la matière</Text>

              <SelectList
                setSelected={(val) => setMatiere(val)}
                data={deliveryOptions}
                save="value"
                placeholder="Selectionner une matiere"
                search={false}
                defaultOption={""}
                boxStyles={styles.selectList}
                inputStyles={styles.selectListInput}
                dropdownStyles={styles.dropdownStyle}
              />

              <CustomButton
                type="green-full"
                label="Ajouter"
                additionnalStyle={{ marginBottom: 20 }}
                onPress={onClose}
              />
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ThirdModal;
