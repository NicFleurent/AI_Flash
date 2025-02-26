import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Intro from "./pages/authentification/Intro";
import LogIn from "./pages/authentification/LogIn";
import SignIn from "./pages/authentification/SignIn";
import Home from "./pages/Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import Account from "./pages/account/Account";
import Explore from "./pages/publics_pages/Explore";
import { useTranslation } from "react-i18next";
import { Provider } from 'react-redux';
import store from './stores/store';
import Subjects from './pages/matieres/Subjects';
import Collections from './pages/matieres/Collections';


export default function App() {
  const {t} = useTranslation();
  const bottomTabs = createBottomTabNavigator({
    initialRouteName: "Subjects",
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
        fontSize: 24,
        fontWeight: "bold",
      },
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
          headerShown: true,
          headerTitleAlign: "left",
          title:t('explore.title'),
          headerTitleStyle: {
            fontSize: 38,
            color: "white",
            fontWeight: "bold",
          },
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
    initialRouteName: "Menu",
    screens: {
      Intro: {
        screen: Intro,
        options: {
          headerShown: false,
        },
      },
      LogIn: {
        screen: LogIn,
        options: {
          headerShown: false,
        },
      },
      SignIn: {
        screen: SignIn,
        options: {
          headerShown: false,
        },
      },
      Collections: {
        screen: Collections,
        options: ({route}) => ({
          title: route.params?.name || "Collections",
          headerShown: true,
        }),
      },
      Menu: {
        screen: bottomTabs,
        options: {
          headerShown: false,
        },
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
