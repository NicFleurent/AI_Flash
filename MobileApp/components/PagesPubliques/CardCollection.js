import React from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CardCollection = ({
  nameMatiere,
  numberFlashcard,
  nameAuthor,
  numberCollection,
  isPublic,
  onPress,
}) => {
  const { height } = useWindowDimensions();

  return (
    <View style={[styles.container, { height: height / 6 }]}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {nameMatiere}
      </Text>
      {isPublic ? (
        <View style={styles.textIconeZone}>
          <View>
            <Text style={styles.numberFlashcard}>
              {numberFlashcard} Flashcards
            </Text>
            <Text style={styles.author}>{nameAuthor}</Text>
          </View>
          <FontAwesomeIcon
            style={{ marginRight: 20 }}
            size={24}
            color="#1DB954"
            icon={faArrowRight}
          />
        </View>
      ) : (
        <Pressable onPress={onPress} >
          <View style={styles.textIconeZoneMatiereDisplay}>
            <View>
              <Text style={styles.collection}>
                {numberCollection} Collections
              </Text>
            </View>
            <FontAwesomeIcon
              style={{ marginRight: 20 }}
              size={24}
              color="#1DB954"
              icon={faArrowRight}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    paddingLeft: 20,
    borderRadius: 8,
    margin: 5,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    marginRight: 20,
  },
  numberFlashcard: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1DB954",
    marginBottom: 5,
  },
  author: {
    fontSize: 12,
    fontWeight: "300",
  },
  collection: {
    fontSize: 12,
    fontWeight: "semibold",
  },
  textIconeZone: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textIconeZoneMatiereDisplay: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

export default CardCollection;
