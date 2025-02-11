import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  View,
} from "react-native";
import CardCollection from "../../components/PagesPubliques/CardCollection";

const data = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
  { id: "4", text: "Item 4" },
  { id: "5", text: "Item 5" },
  { id: "6", text: "Item 6" },
  { id: "7", text: "Item 7" },
  { id: "8", text: "Item 8" },
  { id: "9", text: "Item 9" },
];

const Explorez = () => {
  const renderItem = ({ item }) => (
    <CardCollection
      nameMatiere={"Programation orientee objet"}
      displayMode={"Public"}
      numberFlashcard={25}
      nameAuthor={"Nicolas Fleurent"}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerSecond}>
        <Text style={styles.titre}>Explorez</Text>

        <FlatList
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          data={data}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
  containerSecond: {
    paddingHorizontal: 0,
  },
  titre: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
});

export default Explorez;
