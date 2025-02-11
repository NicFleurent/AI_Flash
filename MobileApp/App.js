import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Intro from "./pages/Intro";
import LogIn from "./pages/LogIn";
import SignIn from "./pages/SignIn";
import Explorez from "./pages/PagesPubliques/Explorez";

export default function App() {
  const RootStack = createNativeStackNavigator({
    initialRouteName: "Explorez",
    screenOptions: {
      headerStyle: {
        backgroundColor: "#171717",
      },
      headerTintColor: "#1DB954",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
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
