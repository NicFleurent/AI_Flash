import React from "react";
import { View, ScrollView, Text } from "react-native";
import { BlurView } from "expo-blur";
import CustomInput from "../../CustomInput";
import styles from "./Style/ModalStyle";
import CustomButton from "../../CustomButton";
import Modal from "react-native-modal";
import { useWindowDimensions } from "react-native";

const FourthModal = ({ isVisible, onClose, matiere, setMatiere, onSubmit }) => {
  const { width, height } = useWindowDimensions();
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
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
              <Text style={styles.modalTitle}>Nouvelle matière</Text>
              <CustomInput
                label="Nom de la matiere"
                value={matiere}
                onChangeText={setMatiere}
                isPassword={false}
              />
              <CustomButton
                type="green-full"
                label="Ajouter"
                additionnalStyle={{ marginBottom: 20 }}
                onPress={onSubmit}
              />
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default FourthModal;
