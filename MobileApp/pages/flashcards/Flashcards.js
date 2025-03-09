import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import FLashCard from '../../components/publics_pages_components/FlashCard';
import { deleteFlashcard, getFlashCards } from '../../api/flashcard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EditDeleteCardRemoteBottomSheet from '../../components/collections_components/bottoms_sheets/EditDeleteCardRemoteBottomSheet';
import { useTranslation } from 'react-i18next';

const Flashcards = ({ route }) => {
    const { t } = useTranslation();
    const { item } = route.params;
    const bottomSheetRef = useRef(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectItem, setSelectItem] = useState({});

    const handleEditFlashCard = (updatedCard) => {
        setFlashcards((prevFlashcards) =>
            prevFlashcards.map((card) =>
                card.id === updatedCard.id ? updatedCard : card
            )
        );
    };

    const handleDeleteFlashCard = async (id) => {
        setIsDeleting(true);
        Alert.alert(
            t("flashcards.delete_confirmation.title"),
            t("flashcards.delete_confirmation.message"),
            [
                { text: t("button.cancel"), style: "cancel" },
                {
                    text: t("button.delete"),
                    onPress: async () => {
                        try {
                            await deleteFlashcard(id);
                            setFlashcards((prevFlashcards) =>
                                prevFlashcards.filter((card) => card.id !== id)
                            );
                            Alert.alert(t("SUCCESS"), t("flashcards.delete_success"));
                        } catch (error) {
                            console.error("Erreur lors de la suppression de la flashcard :", error);
                            Alert.alert(t("ERROR"), t("flashcards.delete_error"));
                        } finally {
                            setIsDeleting(false);
                        }
                    },
                },
            ]
        );
    };

    const getFlashCardsCollection = async (id) => {
        try {
            const response = await getFlashCards(id);
            setFlashcards(response);
            setError(null);
        } catch (error) {
            console.log("Erreur lors de la récupération des flashcards : ", error);
            setError(t("flashcards.error"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFlashCardsCollection(item.id);
    }, [item.id, flashcards]);

    const renderItemModal = ({ item }) => (
        <FLashCard
            title={item.front_face}
            description={item.back_face}
            isEditable={true}
            handleEdit={() => {
                setSelectItem(item);
                bottomSheetRef.current?.snapToIndex(0);
            }}
            handleDelete={() => handleDeleteFlashCard(item.id)}
        />
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}>{t("flashcards.loading")}</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <CustomButton
                    type="green-full"
                    label={t("flashcards.retry")}
                    onPress={() => getFlashCardsCollection(item.id)}
                />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>{item.name}</Text>

                <FlatList
                    scrollEnabled={true}
                    style={styles.flatList}
                    renderItem={renderItemModal}
                    keyExtractor={(item) => item.id.toString()}
                    data={flashcards}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>{t("flashcards.empty")}</Text>
                    }
                />

                <View style={styles.buttonContainer}>
                    <CustomButton
                        type="green-full"
                        label={t("flashcards.study")}
                        additionnalStyle={{ marginTop: 20 }}
                        onPress={() => {}}
                    />
                </View>

                {/* Overlay pour la BottomSheet */}
                <View style={styles.overlay}>
                    <EditDeleteCardRemoteBottomSheet
                        ref={bottomSheetRef}
                        initialData={selectItem}
                        onEditFlashCard={handleEditFlashCard}
                    />
                </View>

                {isDeleting && (
                    <View style={styles.deletingOverlay}>
                        <ActivityIndicator size="large" color="#ffffff" />
                        <Text style={styles.deletingText}>{t("flashcards.deleting")}</Text>
                    </View>
                )}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    flatList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        paddingHorizontal: 60,
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    loadingText: {
        color: "#ffffff",
        marginTop: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingHorizontal: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 20,
    },
    emptyText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: "box-none",
    },
    deletingOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    deletingText: {
        color: "#ffffff",
        marginTop: 10,
    },
});

export default Flashcards;