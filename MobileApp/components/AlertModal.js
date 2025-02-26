import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
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
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
        <View style={[styles.blurView, { width: width, height: height, backgroundColor: "rgba(0, 0, 0, 0.5)" }]}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheet}>
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
                  <TouchableOpacity onPress={onCancel}>
                    <View style={styles.cancelButton}>
                      <Text style={styles.cancelButtonText}>
                        {cancelButtonText}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={onConfirm}>
                  <View style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>
                      {confirmButtonText}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 0,
  },
  blurView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  bottomSheetContainer: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#000000",
    borderRadius: 32,
    padding: 20,
  },
  bottomSheet: {
    width: "100%",
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
    alignItems: "center",
    marginBottom: 5,
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
    alignItems: "center",
    marginTop: 20,
    zIndex: 1,
    elevation: 10,
  },
  cancelButton: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
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
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  confirmButtonText: {
    marginVertical: 8,
    marginHorizontal: 25,
    fontWeight: "bold",
  },
});

export default AlertModal;