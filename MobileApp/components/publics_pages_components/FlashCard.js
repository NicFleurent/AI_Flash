import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"; 

const FLashCard = ({ title, description, isEditable, handleEdit, handleDelete }) => {
  const iconColor = "#1DB954";
  const deleteIconColor = "#FF0000"; 
  const iconSize = 24;

  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>{title}</Text>
        {isEditable && (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
              <FontAwesomeIcon
                size={iconSize}
                color={iconColor}
                icon={faPenToSquare}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
              <FontAwesomeIcon
                size={iconSize}
                color={deleteIconColor}
                icon={faTrash}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.containerCircle}>
        <View style={styles.circle}></View>
        <View style={styles.circle}></View>
        <View style={styles.circle}></View>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
    width:"60%",
    marginRight: 10,
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    flexDirection: "row", 
  },
  iconButton: {
    marginLeft: 10, 
  },
  containerCircle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    margin: 2,
    backgroundColor: "white",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default FLashCard;