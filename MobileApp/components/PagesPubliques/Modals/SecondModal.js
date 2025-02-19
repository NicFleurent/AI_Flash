import React from "react";
import { View, ScrollView, Text } from "react-native";
import { BlurView } from "expo-blur";
import CustomButton from "../../CustomButton";
import styles from "./Style/ModalStyle";
import Modal from "react-native-modal";
import { useWindowDimensions } from "react-native";

const SecondModal = ({ isVisible, onClose, onNext }) => {
  const { width, height } = useWindowDimensions();

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
              <Text style={styles.secondModalTitle}>
                Souhaitez-vous l’ajouter à une matière déjà existante ou en
                créer une nouvelle ?
              </Text>
              <CustomButton
                type="green-full"
                label="Ajouter à une matière existante"
                additionnalStyle={{ marginBottom: 20 }}
                onPress={onClose}
              />
              <CustomButton
                type="white-outline"
                label="Créer une nouvelle matière"
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

export default SecondModal;
