import { SafeAreaView, StatusBar, StyleSheet, FlatList, TouchableOpacity, Button, useWindowDimensions } from "react-native";
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { getSubjects, createSubject, updateSubject, deleteSubject, getAIflashcards } from '../../api/subject';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Toast from 'react-native-toast-message';
import CustomModal from '../../components/CustomModal'
import CardCollection from '../../components/publics_pages_components/CardCollection';
import CustomInput from "../../components/CustomInput";
import FLashCard from "../../components/publics_pages_components/FlashCard";

// const { height } = useWindowDimensions();

const Subjects = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const [subjects, setSubjects] = useState([]);
    const [flashCards, setFlashCards] = useState([]);
    const [visible, setVisible] = useState(false)
    const [input, setInput] = useState("")
    const [id, setId] = useState("")
    const [type_modal, setTypeModal] = useState("")
    const [name_modal, setNameModal] = useState("")
    const [error, setError] = useState([]);
    const [isError, setIsError] = useState(false)
    const [change, setChange] = useState(false)

    const onChangeText = (value, setInput) => {
        setInput(value);

        if (isError)
            validateForm();
    }

    const validateForm = () => {
        let tempErrors = [];

        if (input === "")
            tempErrors.errorInput = t('subject.error.title_input_required');

        setError(tempErrors);
        setIsError(!(Object.keys(tempErrors).length === 0))

        return Object.keys(tempErrors).length === 0;
    }

    const getUserSubjects = async () => {
        try {
            const response = await getSubjects();
            setSubjects(response);
        } catch (error) {
            console.log(error);
        }
    }

    const create = async () => {
        if (validateForm()) {
            try {
                const response = await createSubject(input);
                if (response && response.message) {
                    Toast.show({
                        type: 'success',
                        text1: t('SUCCESS'),
                        text2: t(response.message),
                    });

                    getUserSubjects();
                }

                setInput("")
                setVisible(false)
            } catch (error) {
                console.log('Error: ' + error)

                Toast.show({
                    type: 'error',
                    text1: t('ERROR'),
                    text2: t(error.message),
                });
            }
        }
        else
            setIsError(true)
    }

    const edit = async () => {
        if (validateForm()) {
            try {
                const response = await updateSubject(id, input);
                if (response && response.message) {
                    Toast.show({
                        type: 'success',
                        text1: t('SUCCESS'),
                        text2: t(response.message)
                    });

                    getUserSubjects();
                }

                setInput("")
                setVisible(false)
            } catch (error) {
                console.log('Error: ' + error)

                Toast.show({
                    type: 'error',
                    text1: t('ERROR'),
                    text2: t(error.message)
                });
            }
        }
        else
            setIsError(true)
    }

    const drop = async () => {
        try {
            const response = await deleteSubject(id);
            if (response && response.message) {
                Toast.show({
                    type: 'success',
                    text1: t('SUCCESS'),
                    text2: t(response.message)
                });

                getUserSubjects();
            }

            setInput("")
            setVisible(false)
        } catch (error) {
            console.log('Error: ' + error)

            Toast.show({
                type: 'error',
                text1: t('ERROR'),
                text2: t(error.message)
            });
        }
    }

    useEffect(() => {
        getUserSubjects()
        setInput("")
    }, [])

    useEffect(() => {
        getUserSubjects()
        setChange(false)
        setInput("")
    }, [change])

    const renderItem = ({ item }) => {
        return (
            <CardCollection
                nameMatiere={item.name}
                isPublic={false}
                isEditable={true}
                numberCollection={item.collections_count}
                onArrowPress={() => navigation.navigate("Collections", { 'item': item, 'change': change, 'setChange': setChange })}
                onPenPress={() => [setTypeModal("edit"), setVisible(true), setInput(item.name), setId(item.id)]}
            />
        )
    }

    // const renderItem = ({ item }) => {
    //     return (
    //         <FLashCard 
    //             title={item[0]}
    //             description={item[1]}
    //         />
    //     )
    // }

    // const envoyer = async () => {
    //     try {
    //         const response = await getAIflashcards(input);

    //         if (response && response.message && response.answer) {
    //             Toast.show({
    //                 type: 'success',
    //                 text1: t('SUCCESS'),
    //                 text2: response.message,
    //             });
    //             console.log("Response - " + response.answer)

    //             const parseAnswer = JSON.parse(response.answer)
    //             console.log("ParsedANSWER - " + parseAnswer)

    //             setFlashCards(Object.entries(parseAnswer))
    //         }

    //         setInput("")
    //         setVisible(false)

    //     } catch (error) {
    //         console.log('Error: ' + error)

    //         Toast.show({
    //             type: 'error',
    //             text1: t('ERROR'),
    //             text2: error.message,
    //         });
    //     }
    // }

    return (
        <SafeAreaView style={styles.container}>
            {/* 
                <CustomInput
                    label={"Posez votre question"}
                    value={input}
                    onChangeText={setInput}
                    isPassword={false}
                    error={error.errorInput}
                />

                <Button title="Envoyer" onPress={() => envoyer()}/>

                <FlatList
                    style={styles.flatList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    data={flashCards}
                    numColumns={1}
                    contentContainerStyle={styles.flatListContent}
                /> 
            */}

            <FlatList
                style={styles.flatList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                data={subjects}
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
            />

            <CustomModal
                visible={visible}
                setVisible={setVisible}
                input={input}
                setInput={(value) => onChangeText(value, setInput)}
                error={error}
                setError={setError}
                name_modal={name_modal}
                type_modal={type_modal}
                setTypeModal={setTypeModal}
                onPressCreate={create}
                onPressEdit={edit}
                onPressDelete={drop}
                modalTitle={t("subject.input.title_modal_" + type_modal)}
                deleteMessage={t("subject.input.modal_delete")}
            />

            <TouchableOpacity
                style={styles.floatingInput}
                onPress={() => [setTypeModal("add"), setVisible(true), setNameModal("matiere")]}
            >
                <FontAwesomeIcon icon={faPlus} size={20} color="black" />
            </TouchableOpacity>

            <Toast position='top' bottomOffset={20} />

            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

export default Subjects

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
    flatList: {
        marginTop: 10,
    },
    floatingInput: {
        borderWidth: 1,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 50,
        right: 20,
        backgroundColor: 'green',
        borderRadius: 100,
    }
});