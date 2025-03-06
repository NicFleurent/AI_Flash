import React, { useCallback, useRef, useState, useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import AddFlashCardBottomSheet from '../../components/collections_components/bottoms_sheets/AddFlashCardBottomSheet';
import CustomButton from '../../components/CustomButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as DocumentPicker from "expo-document-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const AddCollectionByAi = () => {
    const { width, height } = useWindowDimensions();
    const [file, setFile] = useState(null);
    const [collectionName, setCollectionName] = useState("");
    const addFlashcardRef = useRef(null);

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf", 
                copyToCacheDirectory: true, 
            });

            if (!result.canceled) {
                setFile(result);
                console.log("Fichier sélectionné :", result);
            } else {
                console.log("Sélection annulée");
            }
        } catch (error) {
            console.error("Erreur lors de la sélection du fichier :", error);
        }
    };

    const openBottomSheet = useCallback(() => {
        addFlashcardRef.current?.expand();
    }, []);

    const closeBottomSheet = useCallback(() => {
        addFlashcardRef.current?.close();
    }, []);

    const fileDisplayName = useMemo(() => {
        return file ? file.assets[0].name : "Ajouter un fichier";
    }, [file]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ marginTop: 20 }}>
                    <CustomInput
                        label="Nom de la collection"
                        value={collectionName}
                        onChangeText={setCollectionName}
                        isPassword={false}
                    />
                </View>

                <View>
                    <TouchableOpacity onPress={pickFile}>
                        <View style={styles.fileContainer}>
                            <View style={styles.fileContent}>
                                <FontAwesomeIcon
                                    style={styles.icon}
                                    size={30}
                                    color={"#1DB954"}
                                    icon={faDownload}
                                />
                                <ScrollView horizontal>
                                    <Text style={styles.fileText} numberOfLines={1} ellipsizeMode="tail">
                                        {fileDisplayName}
                                    </Text>
                                </ScrollView>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <CustomButton
                        type="green-full"
                        label="Generer des cartes"
                        additionnalStyle={{ marginBottom: 40, marginTop: 40 }}
                        onPress={() => {
                            
                        }}
                    />
                </View>

                <AddFlashCardBottomSheet ref={addFlashcardRef} />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: "space-between"
    },
    fileContainer: {
        backgroundColor: "white",
        borderRadius: 8
    },
    fileContent: {
        marginVertical: 18,
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        marginLeft: 20
    },
    fileText: {
        marginLeft: 20,
        fontWeight: "bold",
        flexShrink: 1
    }
});

export default AddCollectionByAi;