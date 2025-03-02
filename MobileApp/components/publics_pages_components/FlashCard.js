import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const FLashCard = ({ title, description, isEditable }) => {
  const iconColor = "#1DB954";
  const iconSize = 24;

  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {isEditable && (
          <FontAwesomeIcon
            style={styles.icon}
            size={iconSize}
            color={iconColor}
            icon={faPenToSquare}
          />
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
    flex: 1,
  },
  icon: {
    marginRight: 20,
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