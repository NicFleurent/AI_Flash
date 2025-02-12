import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  View,
  ScrollView,
} from "react-native";
import CardCollection from "../../components/PagesPubliques/CardCollection";
import CustomInput from "../../components/CustomInput";

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
  const [search, onChangeSearch] = useState("");

  const formData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

    if (numberOfElementsLastRow !== 0) {
      for (let i = numberOfElementsLastRow; i < numColumns; i++) {
        data.push({ id: `blank-${i}`, empty: true });
      }
    }

    return data;
  };

  const renderItem = ({ item }) => {
    if (item.empty) {
      return <View style={styles.itemInvisible} />;
    }
    return (
      <CardCollection
        nameMatiere={"Programation orientee objet"}
        isPublic={true}
        numberFlashcard={25}
        nameAuthor={"Nicolas Fleurent"}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.containerSecond}>
            <Text style={styles.titre}>Explorez</Text>

            <CustomInput
              label="Rechercher"
              value={search}
              onChangeText={onChangeSearch}
              isPassword={false}
            />
          </View>

          <FlatList
            style={styles.flatList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            data={formData(data, 2)}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
          />

          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
  containerSecond: {
    paddingHorizontal: 10,
  },
  titre: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
    marginBottom: 30,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  itemInvisible: {
    flex: 1,
    margin: 5,
    backgroundColor: "transparent",
    paddingLeft: 20,
    borderRadius: 8,
  },
  flatList: {
    marginTop: 10,
  },
});

export default Explorez;
