import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const NewCollectionChooseOptions = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params || {};
  const { setChangeNewCollections } = route.params || {};
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.texte}>{t("new_collection_choose_options.choose_how_to_generate")}</Text>

      <CustomButton
        type="white-outline"
        label={t("new_collection_choose_options.by_myself")}
        additionnalStyle={{ marginBottom: 30 }}
        onPress={() => {
          navigation.navigate("AddCollectionByMyself", { id: item.id });
        }}
      />
      <CustomButton
        type="green-full"
        label={t("new_collection_choose_options.from_document")}
        onPress={() => {
          navigation.navigate("AddCollectionByAi", { item: item, setChangeNewCollections: setChangeNewCollections });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
  },
  texte: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 40,
    textAlign: "center",
  },
});

export default NewCollectionChooseOptions;
