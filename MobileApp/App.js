import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Intro from './pages/authentification/Intro';
import LogIn from './pages/authentification/LogIn';
import SignIn from './pages/authentification/SignIn';
import Home from './pages/Home';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function App() {
  const bottomTabs = createBottomTabNavigator({
    screenOptions: ({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Profil") {
          iconName = focused ? "person" : "person-outline";
        }
        else{
          iconName = focused ? "cloud-download" : "cloud-download-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "green",
      tabBarInactiveTintColor: "gray",
      tabBarShowLabel: false,
      tabBarActiveBackgroundColor: "black",
      tabBarInactiveBackgroundColor: "black",
      // tabBarInactiveBackgroundColor: "white",
      tabBarLabelPosition: "beside-icon",
      animation: "shift",
    }),
    screens: {
      Home: {
        screen: Home,
      },
    },
  });

  const RootStack = createNativeStackNavigator({
    initialRouteName: 'Intro',
    screenOptions: {
      headerStyle: {
        backgroundColor: '#171717',
      },
      headerTintColor: '#1DB954',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    screens: {
      Intro: {
        screen: Intro,
        options: {
          headerShown: false,
        },
      },
      LogIn:{
        screen: LogIn,
        options: {
          headerShown: false,
        },
      },
      SignIn:{
        screen: SignIn,
        options: {
          headerShown: false,
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

  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
