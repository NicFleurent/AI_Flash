import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import CardCollection from '../components/PagesPubliques/CardCollection';

const Home = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [firstname, setFirstname] = useState("Nicolas");

  const [mockData, setMockData] = useState({
    "total_count":50,
    "collections":[
      {
        id:1,
        name:"Examen Mi-Session",
        flashcards_count:25,
        subject:"Introduction à la programmation"
      },
      {
        id:2,
        name:"Révision générale",
        flashcards_count:10,
        subject:"Communication en informatique"
      },
      {
        id:3,
        name:"Quiz Scrum",
        flashcards_count:5,
        subject:"Génie logiciel"
      },
      {
        id:4,
        name:"Quiz Scrum",
        flashcards_count:5,
        subject:"Génie logiciel"
      },
      {
        id:5,
        name:"Quiz Scrum",
        flashcards_count:5,
        subject:"Génie logiciel"
      },
      {
        id:6,
        name:"Quiz Scrum",
        flashcards_count:5,
        subject:"Génie logiciel"
      },
      {
        id:7,
        name:"Quiz Scrum",
        flashcards_count:5,
        subject:"Génie logiciel"
      },
      {
        id:8,
        name:"Quiz Scrum",
        flashcards_count:5,
        subject:"Génie logiciel"
      },
      {
        id:9,
        name:"Quiz Scrum",
        flashcards_count:5,
        subject:"Génie logiciel"
      },
      {
        id:10,
        name:"Quiz Scrum",
        flashcards_count:5,
        subject:"Génie logiciel"
      }
    ]
  })

  useEffect(()=>{
    navigation.setOptions({
      title:`${t('home.hello')} ${firstname}`
    })
  },[])

  const handleFlashStudy = () => {
    navigation.navigate("Study");
  }

  const renderItem = ({ item }) => {
    return (
      <CardCollection
        nameMatiere={item.name}
        numberCollection={item.flashcards_count}
        nameAuthor={item.subject}
      />
    );
  };
  const listeVide = () => {
    return (
      <View>
        <Text style={styles.txtEmptyList}>{t('home.no_studies_today')}</Text>
      </View>
    )
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{t('home.today')}</Text>
      <TouchableOpacity
        onPress={handleFlashStudy}
        style={styles.flashStudyContainer}
      >
        <View>
          <Text style={styles.flashStudyTitle}>{t('home.flash_study')}</Text>
          <Text style={styles.flashStudyCount}>{mockData.total_count} {t('home.remaining_flashcards')}</Text>
        </View>
        <View>
          <FontAwesomeIcon icon={faBolt} size={40} color='black'/>
        </View>
      </TouchableOpacity>

      <Text style={styles.titleText}>{t('home.detailed_studies')}</Text>
      <FlatList 
        data={mockData.collections} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        numColumns={2}
        ListEmptyComponent={listeVide}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
            colors={["#1DB954"]} // Couleur (Android)
            tintColor="#1DB954" // Couleur (iOS)
          />
        }
      />
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal:20
  },
  titleText:{
    color:'white',
    fontSize:24,
    fontWeight:500
  },
  flashStudyContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:"#1DB954",
    width:'100%',
    padding:20,
    borderRadius:8,
    marginVertical:20
  },
  flashStudyCount:{
    fontWeight:700,
    fontSize:18
  },
  flashStudyTitle:{
    fontWeight:900,
    fontSize:20
  },
  txtEmptyList:{
    color:'white',
    fontSize:20,
    marginTop:20,
    textAlign:'center'
  }
}

export default Home