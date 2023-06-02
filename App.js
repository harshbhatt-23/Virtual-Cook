import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable } from "react-native";
import "./src/i18n";
import { useTranslation } from "react-i18next";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/components/homescreen/Home";
import DetailsScreen from "./src/components/detailscreen/Details";
import CustomNavigationBar from "./src/components/customNavigationBar/CustomNavigationBar";
import MainComponent from "./src/components/main/MainComponent";

const Stack = createStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState("en");

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };

  return (
    <PaperProvider theme={paperTheme}>
      {/* <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 25, color: "#33A850" }}>
          {t("hello")}{" "}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 25, color: "#33A850" }}>
          {t("this line is translated")}
        </Text>
        <Pressable
          onPress={() => changeLanguage("en")}
          style={{
            backgroundColor: currentLanguage === "en" ? "#33A850" : "#d3d3d3",
            padding: 20,
          }}
        >
          <Text>Select English</Text>
        </Pressable>
        <Pressable
          onPress={() => changeLanguage("fr")}
          style={{
            backgroundColor: currentLanguage === "fr" ? "#33A850" : "#d3d3d3",
            padding: 20,
          }}
        >
          <Text>Sélectionnez l'anglais</Text>
        </Pressable>
      </View> */}
      {/* <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <MainComponent />
    </PaperProvider>
  );
};

export default App;
