import "react-native-gesture-handler";
import React, { useState } from "react";
import "./src/i18n";
import { useTranslation } from "react-i18next";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import MainComponent from "./src/components/main/MainComponent";

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
      <MainComponent />
    </PaperProvider>
  );
};

export default App;
