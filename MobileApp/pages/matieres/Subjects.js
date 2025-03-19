import { SafeAreaView, StatusBar, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Button, useWindowDimensions } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { setValueS } from "../../stores/sliceChangeSubject";

// const { height } = useWindowDimensions();

const Subjects = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const [subjects, setSubjects] = useState([]);
    const [visible, setVisible] = useState(false)
    const [input, setInput] = useState("")
    const [id, setId] = useState("")
    const [type_modal, setTypeModal] = useState("")
    const [error, setError] = useState([]);
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const subjectChange = useSelector((state) => state.changeSubjectSlice.value)

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
        const fetchCollections = async () => {
            setIsLoading(true);  
            try {
              const response = await getUserSubjects();
              setInput("")
            } catch (error) {
              console.log("Error: ", error);
            } finally {
              setIsLoading(false);  
            }
          };
        
          fetchCollections();
    }, [])

    useEffect(() => {
        if (subjectChange){
            try {
                setIsLoading(true)
                getUserSubjects()
                setInput("")
                dispatch(setValueS(false))
            } catch (error) {
                console.log("Erreru - ", error)
            } finally {
                setIsLoading(false);
            }
        }
    }, [subjectChange])

    const renderItem = ({ item }) => {
        return (
            <CardCollection
                nameMatiere={item.name}
                isPublic={false}
                isEditable={true}
                numberCollection={item.collections_count}
                onArrowPress={() => navigation.navigate("Collections", { item })}
                onPenPress={() => [setTypeModal("edit"), setVisible(true), setInput(item.name), setId(item.id)]}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
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
                type_modal={type_modal}
                setTypeModal={setTypeModal}
                onPressCreate={create}
                onPressEdit={edit}
                onPressDelete={drop}
                inputTitle={t("subject.input.title_input")}
                modalTitle={t("subject.input.title_modal_" + type_modal)}
                deleteMessage={t("subject.input.modal_delete")}
            />

            <TouchableOpacity
                style={styles.floatingInput}
                onPress={() => [setTypeModal("add"), setVisible(true)]}
            >
                <FontAwesomeIcon icon={faPlus} size={20} color="black" />
            </TouchableOpacity>

            <Toast position='top' bottomOffset={20} />

            {isLoading && (
                <ActivityIndicator
                    style={styles.overlay}
                    size="large"
                    color="#1DB954"
                />
            )}
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