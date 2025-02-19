import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Intro from './pages/authentification/Intro';
import LogIn from './pages/authentification/LogIn';
import SignIn from './pages/authentification/SignIn';
import Home from './pages/Home';
import Ionicons from "react-native-vector-icons/Ionicons";
import Explorez from "./pages/PagesPubliques/Explorez";
import Account from './pages/account/Account';

export default function App() {
  const bottomTabs = createBottomTabNavigator({
    initialRouteName: "Account",
    screenOptions: ({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Account") {
          iconName = focused ? "person" : "person-outline";
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
          title: 'Accueil'
        },
      },
      Account: {
        screen: Account,
        options: {
          title: 'Votre compte'
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
      Explorez: {
        screen: Explorez,
        options: {
          headerShown: true,
        },
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

  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
