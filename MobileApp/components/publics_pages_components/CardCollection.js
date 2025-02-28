// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   useWindowDimensions,
// } from "react-native";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { useTranslation } from "react-i18next";

// const CardCollection = ({
//   nameMatiere,
//   numberFlashcard,
//   nameAuthor,
//   numberCollection,
//   isPublic,
//   onPress,
// }) => {
//   const { height } = useWindowDimensions();
//   const {t} = useTranslation();

//   return (
//     <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
//       <View style={[styles.container]}>
//         <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
//           {nameMatiere}
//         </Text>
//         {isPublic ? (
//           <View style={styles.textIconeZone}>
//             <View>
//               <Text style={styles.numberFlashcard}>
//                 {numberFlashcard} {t('FLASHCARDS')}
//               </Text>
//               <Text style={styles.author}>{nameAuthor}</Text>
//             </View>
//             <FontAwesomeIcon
//               style={{ marginRight: 20 }}
//               size={24}
//               color="#1DB954"
//               icon={faArrowRight}
//             />
            
//           </View>
//         ) : (
//           <View style={styles.textIconeZoneMatiereDisplay}>
//             <View>
//               <Text style={styles.collection}>
//                 {numberCollection} {t('COLLECTIONS')}
//               </Text>
//             </View>
//             <FontAwesomeIcon
//               style={{ marginRight: 20 }}
//               size={24}
//               color="#1DB954"
//               icon={faArrowRight}
//             />
            
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#D9D9D9",
//     paddingLeft: 20,
//     borderRadius: 8,
//     margin: 5,
//     flex: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 20,
//     marginBottom: 15,
//     marginRight: 20,
//   },
//   numberFlashcard: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#1DB954",
//     marginBottom: 5,
//   },
//   author: {
//     fontSize: 12,
//     fontWeight: "300",
//   },
//   collection: {
//     fontSize: 12,
//     fontWeight: "semibold",
//   },
//   textIconeZone: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   textIconeZoneMatiereDisplay: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
// });

// export default CardCollection;


import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Imported faPenToSquare
import { useTranslation } from "react-i18next";

const CardCollection = ({
  nameMatiere,
  numberFlashcard,
  nameAuthor,
  numberCollection,
  isPublic,
  onArrowPress, // Function to handle arrow press
  onPenPress,   // Function to handle pen press
}) => {
  const { height } = useWindowDimensions();
  const { t } = useTranslation();

  return (
    <View style={[styles.container]}>
      {/* Grouping title with the arrow icon */}
      <View style={styles.textColumn}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {nameMatiere}
          </Text>
          <TouchableOpacity onPress={() => onPenPress()}>
            <FontAwesomeIcon
              style={styles.icon}
              size={24}
              color="#1DB954"
              icon={faPenToSquare}
            />
          </TouchableOpacity>
        </View>
        
        {/* Grouping the collection/flashcards and author with the pen icon */}
        <View style={styles.textWithIconRow}>
          {isPublic ? (
            <View>
              <Text style={styles.numberFlashcard}>
                {numberFlashcard} {t("FLASHCARDS")}
              </Text>
              <Text style={styles.author}>{nameAuthor}</Text>
            </View>
          ) : (
            <Text style={styles.collection}>
              {numberCollection} {t("COLLECTIONS")}
            </Text>
          )}
          <TouchableOpacity onPress={() => onArrowPress()}>
            <FontAwesomeIcon
              style={styles.icon}
              size={24}
              color="#1DB954" // You can change the color as needed
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
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    width: '60%',
    fontSize: 18,
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
  textWithIconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  icon: {
    width: '5%',
  },
});

export default CardCollection;

