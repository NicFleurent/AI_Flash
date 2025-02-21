import React from "react";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useWindowDimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const AlertModal = ({
  isVisible,
  onClose,
  title,
  description,
  cancelButtonText,
  confirmButtonText,
  showCancelButton = true,
  onCancel,
  onConfirm,
}) => {
  const { width, height } = useWindowDimensions();

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <BlurView
        intensity={10}
        style={[styles.blurView, { width: width, height: height }]}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.entete}>
                <View style={styles.sousEntete}>
                  <TouchableOpacity onPress={onClose}>
                    <FontAwesomeIcon
                      style={styles.icon}
                      size={24}
                      color="#1DB954"
                      icon={faCircleCheck}
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalTitle}>{title}</Text>
                </View>

                <TouchableOpacity onPress={onClose}>
                  <FontAwesomeIcon
                    style={styles.icon}
                    size={24}
                    color="#1DB954"
                    icon={faXmark}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.buttonContainer}>
                {showCancelButton && (
                  <TouchableOpacity onPress={onCancel || onClose}>
                    <View style={styles.cancelButton}>
                      <Text style={styles.cancelButtonText}>
                        {cancelButtonText}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={onConfirm || onClose}>
                  <View style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>
                      {confirmButtonText}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 0,
  },
  blurView: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: "center",
    width: "90%",
  },
  bottomSheet: {
    backgroundColor: "#000000",
    borderRadius: 32,
    padding: 20,
    width: "100%",
    minHeight: "20%",
    maxHeight: "20%",
  },
  modalContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  description: {
    color: "white",
    marginLeft: 45,
    marginTop: 20,
  },
  entete: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sousEntete: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 15,
  },
  cancelButton: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
  },
  cancelButtonText: {
    color: "white",
    marginVertical: 8,
    marginHorizontal: 25,
  },
  confirmButton: {
    backgroundColor: "#1DB954",
    borderRadius: 30,
    marginLeft: 20,
  },
  confirmButtonText: {
    marginVertical: 8,
    marginHorizontal: 25,
    fontWeight: "bold",
  },
});

export default AlertModal;
