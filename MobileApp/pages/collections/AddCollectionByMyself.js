import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator, Alert } from 'react-native'; // Ajouter Alert
import CustomInput from '../../components/CustomInput';
import AddFlashCardBottomSheet from '../../components/collections_components/bottoms_sheets/AddFlashCardBottomSheet';
import CustomButton from '../../components/CustomButton';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import FLashCard from '../../components/publics_pages_components/FlashCard';
import { createCollection } from '../../api/collection';
import { createFlashcard } from '../../api/flashcard';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const AddCollectionByMyself = ({ route }) => {
    const { width, height } = useWindowDimensions();
    const { id } = route.params || {};
    const [collectionName, setCollectionName] = useState("");
    const [erreurs, setErreurs] = useState({});
    const addFlashcardRef = useRef(null);
    const [flashCards, setFlashCards] = useState([]);
    const [editingCard, setEditingCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Fonction pour valider le formulaire
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

    const handleSaveCollection = () => {
        if (validerFormulaire()) {
            createCollectionAndFlashcards(id, collectionName, flashCards);
        }
    };

    const createCollectionAndFlashcards = async (subjectId, collectionName, flashcardsData) => {
        setIsLoading(true);

        try {
            const collectionResponse = await createCollection(subjectId, collectionName);

            if (collectionResponse && collectionResponse.data) {
                const collectionId = collectionResponse.data.id;

                for (const flashcard of flashcardsData) {
                    await createFlashcard({ ...flashcard, collection_id: collectionId });
                }

                Toast.show({
                    type: 'success',
                    text1: t('SUCCESS'),
                    text2: t('add_collection_by_myself.collection_and_flashcards_created'),
                });

                navigation.navigate("Subjects");
            }
        } catch (error) {
            console.log('Error: ' + error);

            Toast.show({
                type: 'error',
                text1: t('ERROR'),
                text2: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const openBottomSheet = useCallback((card = null) => {
        setEditingCard(card);
        addFlashcardRef.current?.expand();
    }, []);

    const closeBottomSheet = useCallback(() => {
        setEditingCard(null);
        addFlashcardRef.current?.close();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <FLashCard
                title={item.front_face}
                description={item.back_face}
                isEditable={true}
                handleDelete={() => handleDeleteFlashCard(item.id)} 
                handleEdit={() => openBottomSheet(item)}
            />
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ marginTop: 20 }}>
                    <CustomInput
                        label={t('add_collection_by_myself.collection_name')}
                        value={collectionName}
                        onChangeText={setCollectionName}
                        isPassword={false}
                    />
                    {erreurs.collectionName && (
                        <Text style={styles.errorText}>{erreurs.collectionName}</Text>
                    )}
                    <CustomButton
                        type="white-outline"
                        label={t('add_collection_by_myself.new_card')}
                        additionnalStyle={{ marginTop: 20 }}
                        onPress={() => openBottomSheet()}
                    />

                    <View style={{ height: height * 0.5, marginTop: 20 }}>
                        <FlatList
                            data={flashCards}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()} 
                        />
                    </View>
                </View>

                <CustomButton
                    type="green-full"
                    label={t('add_collection_by_myself.save_collection')}
                    additionnalStyle={{ marginBottom: 40 }}
                    onPress={handleSaveCollection}
                />

                <AddFlashCardBottomSheet
                    ref={addFlashcardRef}
                    onAddFlashCard={handleAddFlashCard}
                    onEditFlashCard={handleEditFlashCard}
                    collectionId={id}
                    initialData={editingCard}
                />

                {isLoading && (
                    <ActivityIndicator
                        style={styles.overlay}
                        size="large"
                        color="#1DB954"
                    />
                )}
            </View>
        </GestureHandlerRootView>
    );
};

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

export default AddCollectionByMyself;