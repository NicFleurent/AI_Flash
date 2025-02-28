import { SafeAreaView, StatusBar, StyleSheet, Text, FlatList, View, ScrollView, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { getSubjects, createSubject, editSubject, deleteSubject } from '../../api/subject';
import CardCollection from '../../components/publics_pages_components/CardCollection';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import AlertModal from '../../components/AlertModal'
import { getLocalUser } from '../../api/secureStore';
import CustomModal from '../../components/CustomModal'


const Subjects = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const [subjects, setSubjects] = useState([]);
    const [visible, setVisible] = useState(false)
    const [input, setInput] = useState("")
    const [id, setId] = useState("")
    const [type_modal, setTypeModal] = useState("")
    const [error, setError] = useState([]);
    const [isError, setIsError] = useState(false)

    const onChangeText = (value, setInput) => {
        setInput(value);

        if (isError)
            validateForm();
    }

    const getUserSubjects = async () => {
        try {
            const response = await getSubjects();
            setSubjects(response);
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const create = async () => {
        // console.log('Create User Subject called')
        if (validateForm()) {
            try {
                // console.log('Form Good')

                const response = await createSubject(input);
                // console.log('Response : ' + response.message)

                if (response && response.message) {
                    Toast.show({
                        type: 'success',
                        text1: t('SUCCESS'),
                        text2: response.message,
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
                    text2: error.message,
                });
            }
        }
        else
            setIsError(true)
    }

    const edit = async () => {
        // console.log('Create User Subject called')
        if (validateForm()) {
            try {
                // console.log('Form Good')

                const response = await editSubject(id, input);
                // console.log('Response : ' + response.message)

                if (response && response.message) {
                    Toast.show({
                        type: 'success',
                        text1: t('subject.success'),
                        text2: response.message,
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
                    text2: error.message,
                });
            }
        }
        else
            setIsError(true)
    }

    const drop = async () => {
        // console.log('Create User Subject called')
        try {
            // console.log('Form Good')

            const response = await deleteSubject(id);
            // console.log('Response : ' + response.message)

            if (response && response.message) {
                Toast.show({
                    type: 'success',
                    text1: t('subject.success'),
                    text2: response.message,
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
                text2: error.message,
            });
        }
    }

    const validateForm = () => {
        let tempErrors = [];

        if (input === "")
            tempErrors.errorInput = t('subject.error.title_input_required');

        setError(tempErrors);
        setIsError(!(Object.keys(tempErrors).length === 0))

        return Object.keys(tempErrors).length === 0;
    }

    useEffect(()=>{
        getUserSubjects()
    }, [])

    const renderItem = ({ item }) => {
        return (
            <CardCollection
                nameMatiere={item.name}
                isPublic={false}
                numberCollection={item.collections_count}
                onArrowPress={() => navigation.navigate("Collections", item)}
                onPenPress={() => [setTypeModal("edit"), setVisible(true), setInput(item.name), setId(item.id)]}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView>
                <View> */}
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
                setTypeModal={setTypeModal}
                onPressCreate={create}
                onPressEdit={edit}
                onPressDelete={drop}
                type_modal={type_modal}
            />

            <TouchableOpacity
                style={styles.floatingInput}
                onPress={() => [setTypeModal("add"), setVisible(true)]}
            >
                <FontAwesomeIcon icon={faPlus} size={20} color="black" />
            </TouchableOpacity>

            {/* <Button title="MODIFIER" onPress={() => [setTypeModal("edit"), setVisible(true)]} /> */}
            <Toast position='top' bottomOffset={20} />

            <StatusBar style="auto" />
            {/* </View>
            </ScrollView> */}
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
        position: 'absolute',
        top: 570,
        right: 20,
        height: 60,
        backgroundColor: 'green',
        borderRadius: 100,
    }
});