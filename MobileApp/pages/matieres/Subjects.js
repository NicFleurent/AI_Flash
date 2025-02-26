import { SafeAreaView, StatusBar, StyleSheet, Text, FlatList, View, ScrollView, Button } from "react-native";
import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getSubjects, createSubject } from '../../api/subject';
import CardCollection from '../../components/PagesPubliques/CardCollection';
import Toast from 'react-native-toast-message';


const Subjects = ({route}) => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const [subjects, setSubjects] = useState([]);
    const [visible, setVisible] = useState(false)
    const [input, setInput] = useState("")
    const [type_modal, setTypeModal] = useState("")
    const [error, setError] = useState([]);
    const [isError, setIsError] = useState(false);

    const onChangeText = (value, setInput) => {
        setInput(value);

        if (isError)
            validateForm();
    }

    const createUserSubject = async () => {
        // console.log('Create User Subject called')
        if (validateForm()) {
            try {
                // console.log('Form Good')

                const response = await createSubject(input);
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
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserSubjects();
    }, [])

    useEffect(() => {
        if (route.params?.update)
            getUserSubjects();
    }, [route.params?.update])

    const renderItem = ({ item }) => {
        return (
            <CardCollection
                nameMatiere={item.name}
                isPublic={false}
                numberCollection={item.count}
                onPress={() => navigation.navigate("Collections", item)}
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
{/* 
            <CustomModal
                visible={visible}
                setVisible={setVisible}
                title={t("subject.input.title_modal")}
                title_input={t("subject.input.title_input")}
                input={input}
                setInput={(value) => onChangeText(value, setInput)}
                error={error}
                onPressCreate={createUserSubject}
                type_modal={type_modal}
            /> */}

            <Button title="AJOUTER" onPress={() => [setTypeModal("Add"), setVisible(true)]} />
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
});