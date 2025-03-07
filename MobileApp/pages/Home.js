import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import CardCollection from '../components/publics_pages_components/CardCollection';
import { getLocalUser } from '../api/secureStore';
import { useSelector } from 'react-redux';
import { getTodayCollections } from '../api/collection';
import { getTodayFlashcardsCount } from '../api/flashcard';

const Home = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const isTablet = useSelector((state) => state.screen.isTablet);
  
  const [refreshing, setRefreshing] = useState(false);
  const [firstname, setFirstname] = useState("");

  const [totalCount, setTotalCount] = useState(0)
  const [collections, setCollections] = useState([])

  useEffect(()=>{
    const setUser = async () => {
      const user = await getLocalUser();
      setFirstname(user.firstname)
    }
    const getCollections = async () => {
      const data = await getTodayCollections();
      setCollections(data.collections);
    }
    const getFlashcardsCount = async () => {
      const data = await getTodayFlashcardsCount();
      setTotalCount(data.flashcard_count);
    }
    setUser();
    getCollections();
    getFlashcardsCount();
  },[])

  useEffect(()=>{
    navigation.setOptions({
      title:`${t('home.hello')} ${firstname}`
    })
  },[navigation, firstname])

  const handleFlashStudy = () => {
    navigation.navigate("Study", {source_page:'Home',study_type:t('home.flash_study')});
  }

  const formattedData = useMemo(() => {
      const numColumns = 2;
      const numberOfFullRows = Math.floor(collections.length / numColumns);
      let numberOfElementsLastRow = collections.length - numberOfFullRows * numColumns;
      const dataCopy = [...collections];
  
      if (numberOfElementsLastRow !== 0) {
        for (let i = numberOfElementsLastRow; i < numColumns; i++) {
          dataCopy.push({ id: `blank-${i}`, empty: true });
        }
      }
  
      return dataCopy;
    }, [collections]);

  const renderItem = useCallback(
    ({ item }) => {
      if (item.empty) {
        return <View style={styles.itemInvisible} />;
      }
      return (
        <CardCollection
          nameMatiere={item.name}
          numberFlashcard={item.flashcards_count}
          nameAuthor={item.subject.name}
          onArrowPress={()=>alert("Diriger vers page librairie")}
          onPenPress={()=>navigation.navigate("Study", {source_page:'Home',study_type:item.name,collection:item.id})}
          isStudy={true}
        />
      );
    },
    []
  );

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
      {totalCount > 0 &&
        <TouchableOpacity
          onPress={handleFlashStudy}
          style={styles.flashStudyContainer}
        >
          <View>
            <Text style={styles.flashStudyTitle}>{t('home.flash_study')}</Text>
            <Text style={styles.flashStudyCount}>{totalCount} {t('home.remaining_flashcards')}</Text>
          </View>
          <View>
            <FontAwesomeIcon icon={faBolt} size={40} color='black'/>
          </View>
        </TouchableOpacity>
      ||
        <View
        style={[styles.flashStudyContainer, {backgroundColor:'#c0c0c0'}]}
      >
        <View>
          <Text style={styles.flashStudyTitle}>{t('home.flash_study')}</Text>
          <Text style={styles.flashStudyCount}>Aucune cartes à étudier</Text>
        </View>
        <View>
          <FontAwesomeIcon icon={faBolt} size={40} color='black'/>
        </View>
      </View>
      }
      <Text style={styles.titleText}>{t('home.detailed_studies')}</Text>
      <FlatList 
        data={formattedData} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        numColumns={isTablet ? 3 : 2}
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
  },
  itemInvisible: {
    flex: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 5,
    flex: 1,
    backgroundColor: "transparent",
  },
}

export default Home