import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  blurView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bottomSheetContainer: {
    flex: 1,
    width: "100%",
  },
  bottomSheet: {
    backgroundColor: "#1E1E1E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    height: "100%",
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
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
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
    marginBottom: 10,
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
  absoluteFill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
