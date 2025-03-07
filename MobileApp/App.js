import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Intro from "./pages/authentification/Intro";
import LogIn from "./pages/authentification/LogIn";
import SignIn from "./pages/authentification/SignIn";
import Home from "./pages/Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Provider } from 'react-redux';
import { refreshToken } from './api/user';
import Account from "./pages/account/Account";
import Explore from "./pages/publics_pages/Explore";
import store from './stores/store';
import Subjects from './pages/matieres/Subjects';
import Collections from './pages/matieres/Collections';
import Study from './pages/Study';
import NewCollectionChooseOptions from "./pages/collections/NewCollectionChooseOptions";
import AddCollectionByMyself from "./pages/collections/AddCollectionByMyself";
import AddCollectionByAi from "./pages/collections/AddCollectionByAi";

export default function App() {
  const {t} = useTranslation();
  const [landingPage, setLandingPage] = useState("Auth");

  useEffect(()=>{
    isUserLoggedIn();
  },[])

  const isUserLoggedIn = async ()=>{
    try {
      const response = await refreshToken();
      setLandingPage("Menu");
    } catch (error) {
      console.log(error)
      setLandingPage("Auth");
    }
  }

  const collectionsStack =createNativeStackNavigator({
    initialRouteName:"NewCollectionChooseOptions",
    screenOptions:{
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontSize: 32,
        fontWeight: "bold"
      },
      headerTitleAlign: 'left',
    },
    screens:{
      NewCollectionChooseOptions: {
        screen: NewCollectionChooseOptions,
        options:{
          title:"Nouvelle collection"
        }
      },
      AddCollectionByMyself: {
        screen: AddCollectionByMyself,
        options:{
          title:"Nouvelle collection"
        }
      },
      AddCollectionByAi: {
        screen: AddCollectionByAi,
        options:{
          title:"Nouvelle collection"
        }
      },
    }
  });

  const authStack = createNativeStackNavigator({
    initialRouteName:"Intro",
    screenOptions:{
      headerShown:false
    },
    screens:{
      Intro: {
        screen: Intro,
      },
      LogIn: {
        screen: LogIn,
      },
      SignIn: {
        screen: SignIn,
      },
    }
  });

  const bottomTabs = createBottomTabNavigator({
    initialRouteName: "Home",
    screenOptions: ({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Account") {
          iconName = focused ? "person" : "person-outline";
        } else if (route.name === "Subjects") {
          iconName = focused ? "library" : "library-outline";
        } else {
          iconName = focused ? "cloud-download" : "cloud-download-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "green",
      tabBarInactiveTintColor: "gray",
      tabBarShowLabel: false,
      tabBarActiveBackgroundColor: "black",
      tabBarInactiveBackgroundColor: "black",
      tabBarLabelPosition: "beside-icon",
      animation: "shift",
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontSize: 26,
        fontWeight: "bold"
      },
      headerTitleAlign: 'left',
      tabBarStyle: {
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
    }),
    screens: {
      Home: {
        screen: Home,
        options: {
          title: "Accueil",
        },
      },
      Account: {
        screen: Account,
        options: {
          title: "Votre compte",
        },
      },
      Explore: {
        screen: Explore,
        options: {
          title:t('explore.title'),
        },
      },
      Subjects: {
        screen: Subjects,
        options: {
          title: t("subject.title")
        },
      },
    },
  });

  const RootStack = createNativeStackNavigator({
    initialRouteName: landingPage,
    screenOptions:{
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontSize: 26,
        fontWeight: "bold"
      },
      headerTitleAlign: 'left',
    },
    screens: {
      Auth:{
        screen: authStack,
        options:{
          headerShown:false
        }
      },
      Collections: {
        screen: Collections,
        options: ({route}) => ({
          title: route.params?.name || "Collections",
        }),
      },
      Menu: {
        screen: bottomTabs,
        options:{
          headerShown:false
        }
      },
      Study:{
        screen:Study
      },
      CollectionsCreate:{
        screen: collectionsStack,
        options:{
          headerShown:false
        }
      },
    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
