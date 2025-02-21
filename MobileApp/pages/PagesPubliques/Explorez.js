import React, { useState, useMemo, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  View,
} from "react-native";
import CardCollection from "../../components/PagesPubliques/CardCollection";
import CustomInput from "../../components/CustomInput";
import FirstModal from "../../components/PagesPubliques/Modals/FirstModal";
import SecondModal from "../../components/PagesPubliques/Modals/SecondModal";
import ThirdModal from "../../components/PagesPubliques/Modals/ThirdModal";
import FourthModal from "../../components/PagesPubliques/Modals/FourthModal";
import AlertModal from "../../components/AlertModal";
import { useWindowDimensions } from "react-native";

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
  const [activeModal, setActiveModal] = useState(null);
  const [matiere, setMatiere] = useState("");
  const { width, height } = useWindowDimensions();

  const toggleModal = useCallback((modalName) => {
    setActiveModal((prev) => (prev === modalName ? null : modalName));
  }, []);

  const formattedData = useMemo(() => {
    const numColumns = 2;
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    const dataCopy = [...data];

    if (numberOfElementsLastRow !== 0) {
      for (let i = numberOfElementsLastRow; i < numColumns; i++) {
        dataCopy.push({ id: `blank-${i}`, empty: true });
      }
    }

    return dataCopy;
  }, [data]);

  const renderItem = useCallback(
    ({ item }) => {
      if (item.empty) {
        return <View style={styles.itemInvisible} />;
      }
      return (
        <CardCollection
          nameMatiere={"Programation orientee objet"}
          isPublic={true}
          numberFlashcard={25}
          nameAuthor={"Nicolas Fleurent"}
          onPress={() => toggleModal("FirstModal")}
        />
      );
    },
    [toggleModal]
  );

  return (
    <View style={styles.container}>
      <FirstModal
        isVisible={activeModal === "FirstModal"}
        onClose={() => toggleModal("FirstModal")}
        onNext={() => toggleModal("SecondModal")}
      />

      <SecondModal
        isVisible={activeModal === "SecondModal"}
        onClose={() => toggleModal("SecondModal")}
        onNext={() => toggleModal("ThirdModal")}
      />

      <ThirdModal
        isVisible={activeModal === "ThirdModal"}
        onClose={() => toggleModal("ThirdModal")}
        onNext={() => toggleModal("FourthModal")}
      />

      <FourthModal
        isVisible={activeModal === "FourthModal"}
        onClose={() => toggleModal("FourthModal")}
        matiere={matiere}
        setMatiere={setMatiere}
        onSubmit={() => toggleModal("FourthModal")}
        onNext={() => toggleModal("AlertModal")}
      />

      <AlertModal
        isVisible={activeModal === "AlertModal"}
        onClose={() => toggleModal("AlertModal")}
        title="Titre personnalisé"
        description="Description personnalisée"
        cancelButtonText="Fermer"
        confirmButtonText="Accepter"
        onCancel={() => console.log("Annuler cliqué")}
        onConfirm={() => console.log("OK cliqué")}
      />
      <CustomInput
        label="Rechercher"
        value={search}
        onChangeText={onChangeSearch}
        isPassword={false}
      />
      <View style={{ height: height * 0.7 }}>
        <FlatList
          style={styles.flatList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          data={formattedData}
          numColumns={2}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
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
