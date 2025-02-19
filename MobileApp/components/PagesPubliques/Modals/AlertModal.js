import React from "react";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useWindowDimensions } from "react-native";

const AlertModal = ({ isVisible, onClose }) => {
  const { width, height } = useWindowDimensions();
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
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
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  blurView: {
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  bottomSheet: {
    backgroundColor: "#1E1E1E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    minHeight: "30%",
    maxHeight: "80%",
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 20,
    marginTop: 40,
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
  },
  secondModalTitle: {
    fontSize: 20,
    marginTop: 40,
    marginBottom: 50,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  thirdModalTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
  },
  modalSubTitle: {
    fontSize: 15,
    marginBottom: 10,
    color: "#AAA1A1",
    fontWeight: "400",
  },
  selectList: {
    paddingVertical: 20,
    marginBottom: 50,
    borderColor: "#1DB954",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "white",
  },
  selectListInput: {
    color: "black",
  },
  dropdownStyle: {
    backgroundColor: "white",
    color: "black",
  },
});

export default AlertModal;
