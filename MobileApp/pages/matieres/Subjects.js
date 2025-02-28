import { SafeAreaView, StatusBar, StyleSheet, FlatList, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../../api/subject';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Toast from 'react-native-toast-message';
import CustomModal from '../../components/CustomModal'
import CardCollection from '../../components/publics_pages_components/CardCollection';


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
        if (validateForm()) {
            try {
                const response = await updateSubject(id, input);

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
        try {
            const response = await deleteSubject(id);

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

    useEffect(() => {
        getUserSubjects()
    }, [])

    useEffect(() => {
        getUserSubjects()
        setChange(false)
    }, [change])

    const renderItem = ({ item }) => {
        return (
            <CardCollection
                nameMatiere={item.name}
                isPublic={false}
                numberCollection={item.collections_count}
                onArrowPress={() => navigation.navigate("Collections", {'item': item, 'change': change, 'setChange': setChange})}
                onPenPress={() => [setTypeModal("edit"), setVisible(true), setInput(item.name), setId(item.id)]}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView> */}
                <View>
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

                    <Toast position='top' bottomOffset={20} />

                    <StatusBar style="auto" />
                </View>
            {/* </ScrollView> */}
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