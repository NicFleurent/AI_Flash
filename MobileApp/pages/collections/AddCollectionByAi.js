import React, { useCallback, useRef, useState, useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import AddFlashCardBottomSheet from '../../components/collections_components/bottoms_sheets/AddFlashCardBottomSheet';
import CustomButton from '../../components/CustomButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as DocumentPicker from "expo-document-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload, faL } from "@fortawesome/free-solid-svg-icons";
import { sendPdf } from '../../api/pdf';
import FLashCard from '../../components/publics_pages_components/FlashCard';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { createCollection } from '../../api/collection';
import { createFlashcard } from '../../api/flashcard';
import { useNavigation } from '@react-navigation/native';

const AddCollectionByAi = ({route}) => {
    const { t } = useTranslation()
    const { id } = route.params || {};    
    const navigation = useNavigation();
    
    const { width, height } = useWindowDimensions();
    const [file, setFile] = useState(null);
    const [collectionName, setCollectionName] = useState("");
    const addFlashcardRef = useRef(null);
    const [visibleFlalist, setVisibleFlatlist] = useState(false)
    const [editingCard, setEditingCard] = useState(null);
    const [visibleBtn, setVisibleBtn] = useState(true)
    const [flashCards, setFlashCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [erreurs, setErreurs] = useState({});

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

    const closeBottomSheet = useCallback(() => {
        addFlashcardRef.current?.close();
    }, []);

    const fileDisplayName = useMemo(() => {
        return file ? file.assets[0].name : t("add_collection_by_ai.add_file");
    }, [file]);

    const validerFormulaire = () => {
        const nouvellesErreurs = {};
        if (!collectionName.trim()) nouvellesErreurs.collectionName = t('add_collection_by_myself.collection_name_required');
        setErreurs(nouvellesErreurs);
        return Object.keys(nouvellesErreurs).length === 0;
    };

    const handleAddFlashCard = (card) => {
        setFlashCards([...flashCards, card]);
    };

    const handleEditFlashCard = (updatedCard) => {
        setFlashCards((prevCards) =>
            prevCards.map((card) =>
                card.id === updatedCard.id ? updatedCard : card
            )
        );
    };

    const handleGenerateCards = async () => {
        if (!file) {
            console.log("Aucun fichier sélectionné");
            return;
        }

        try {
            setIsLoading(true);
            const response = await sendPdf(file);
            const formattedDate = new Date();
            const options = { timeZone: 'America/Toronto', year: 'numeric', month: '2-digit', day: '2-digit' };
            const dateDuJour = new Intl.DateTimeFormat('en-CA', options).format(formattedDate);

            if (response && response.message && response.answer) {

                const parseAnswer = JSON.parse(response.answer)

                const objectkeys = Object.entries(parseAnswer).map(([key, value]) => ({
                    id: Date.now(),
                    front_face: key,
                    back_face: value,
                    last_revision_date: dateDuJour,
                    next_revision_date: dateDuJour, 
                    forgetting_curve_stage: 0
                }));

                setFlashCards(objectkeys)
                console.log("Object entries ",  objectkeys)
            }

            setVisibleFlatlist(true)
            setVisibleBtn(false)
        } catch (error) {
            console.error("Erreur lors de l'envoi du fichier :", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveCollection = () => {
        if (validerFormulaire()) {
            createCollectionAndFlashcards(id, collectionName, flashCards);
        }
    };

    const handleDeleteFlashCard = (id) => {
        Alert.alert(
            t('flashcards.delete_confirmation.title'),
            t('flashcards.delete_confirmation.message'),
            [
                {
                    text: t('button.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('button.delete'),
                    onPress: () => {
                        setFlashCards((prevCards) => prevCards.filter((card) => card.id !== id));
                        Toast.show({
                            type: 'success',
                            text1: t('SUCCESS'),
                            text2: t('flashcards.delete_success'),
                        });
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const openBottomSheet = useCallback((card) => {
        console.log("Openning")
        setEditingCard(card);
        console.log(editingCard)
            addFlashcardRef.current?.expand();
        }, []);

        const createCollectionAndFlashcards = async (subjectId, collectionName, flashcardsData) => {
                setIsLoading(true);
                
                try {
                    const collectionResponse = await createCollection(subjectId, collectionName);
                    console.log(collectionResponse);
                    if (collectionResponse && collectionResponse.data) {
                        const collectionId = collectionResponse.data.id;
                        
                        
                        for (const flashcard of flashcardsData) {
                            await createFlashcard({ ...flashcard, collection_id: collectionId });
                        }
        
                        navigation.navigate("Menu", {screen: "Subjects"});
                    }
                } catch (error) {
                    console.log('Error: ' + error);
                } finally {
                    setIsLoading(false);
                }
            };


    const renderItem = ({ item }) => {
        return (
            <FLashCard
                title={item.front_face}
                description={item.back_face}
                isEditable={true}
                handleDelete={() => handleDeleteFlashCard(item.id)}
                handleEdit={() => openBottomSheet(item)}
            />
        )
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <CustomInput
                        label={t("subject.collections.input.title_input")}
                        value={collectionName}
                        onChangeText={setCollectionName}
                        isPassword={false}
                    />
                </View>
                {erreurs.collectionName && (
                    <Text style={styles.errorText}>{erreurs.collectionName}</Text>
                )}

                

                {
                    visibleFlalist &&
                    <>
                    <CustomButton
                    type="white-outline"
                    label={t('add_collection_by_myself.new_card')}
                    additionnalStyle={{ marginTop: 10 }}
                    onPress={() => openBottomSheet()}
                />
                    <FlatList
                        style={styles.flatList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        data={flashCards}
                        numColumns={1}
                        contentContainerStyle={styles.flatListContent}
                    />
                    </>
                }


                {
                    visibleBtn &&
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
                            label={t("add_collection_by_ai.button")}
                            additionnalStyle={styles.generateButton}
                            onPress={handleGenerateCards}
                        />
                    </View>
                }

                {
                    !visibleBtn &&
                    <CustomButton
                        type="green-full"
                        label={t('add_collection_by_myself.save_collection')}
                        additionnalStyle={{ marginBottom: 40 }}
                        onPress={handleSaveCollection}
                    />
                }

                

                {isLoading && (
                    <ActivityIndicator
                        style={styles.overlay}
                        size="large"
                        color="#1DB954"
                    />
                )}


                <AddFlashCardBottomSheet
                    ref={addFlashcardRef}
                    onAddFlashCard={handleAddFlashCard}
                    onEditFlashCard={handleEditFlashCard}
                    collectionId={id}
                    initialData={editingCard}
                />
            </View>
            <Toast />
        </GestureHandlerRootView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: "space-between",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 8,
    },
    inputContainer: {
        marginTop: 20,
    },
    fileContainer: {
        backgroundColor: "white",
        borderRadius: 8,
    },
    fileContent: {
        marginVertical: 18,
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginLeft: 20,
    },
    fileText: {
        marginLeft: 20,
        fontWeight: "bold",
        flexShrink: 1,
    },
    generateButton: {
        marginBottom: 40,
        marginTop: 40,
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    flatList: {
        marginTop: 10,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddCollectionByAi;