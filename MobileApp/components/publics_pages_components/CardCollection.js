import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faBolt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const CardCollection = ({
  nameMatiere,
  numberFlashcard,
  nameAuthor,
  numberCollection,
  isPublic,
  onArrowPress,
  onPenPress, 
  isStudy,
  isEditable,
}) => {
  const { height } = useWindowDimensions();
  const { t } = useTranslation();

  return (
    <View style={[styles.container]}>
      <View style={styles.textColumn}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {nameMatiere}
        </Text>

        <View style={styles.textWithIconRow}>
          {isPublic ? (
            <View>
              <Text style={styles.numberFlashcard}>
                {numberFlashcard} {t("FLASHCARDS")}
              </Text>
              <Text style={styles.author}>{nameAuthor}</Text>
            </View>
          ) : isStudy ? (
            <View>
              <Text style={styles.collection}>
                {numberFlashcard} {t("FLASHCARDS")}
              </Text>
              <Text style={styles.subjectTxt}>{nameAuthor}</Text>
            </View>
          ):(
            <Text style={styles.collection}>
              {numberCollection} {t("COLLECTIONS")}
            </Text>
          )}
        </View>

        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => onPenPress()}>
            {isStudy ?
              <FontAwesomeIcon
                style={styles.icon}
                size={24}
                color="#1DB954"
                icon={faBolt}
              />
            : isEditable &&
              <FontAwesomeIcon
                style={styles.icon}
                size={24}
                color="#1DB954"
                icon={faPenToSquare}
              />              
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onArrowPress()}>
            <FontAwesomeIcon
              style={styles.icon}
              size={24}
              color="#1DB954"
              icon={faArrowRight}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 5,
    flex: 1,
  },
  textColumn: {
    flex: 2,
    justifyContent: "space-evenly",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
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
  subjectTxt: {
    fontSize: 10,
    marginTop:5
  },
  collection: {
    fontSize: 12,
    fontWeight: "semibold",
  },
  textWithIconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  icon: {
    width: '5%',
  },
});

export default CardCollection;

