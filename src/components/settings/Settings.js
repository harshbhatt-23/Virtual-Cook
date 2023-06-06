import { Button, Switch } from "react-native-paper";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import style from "./styles";
import "../../i18n";
import { useTranslation } from "react-i18next";

export default function SettingsScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState("en");

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (currentLanguage === "en") {
      changeLanguage("fr");
      //saveLanguage("fr");
    } else {
      changeLanguage("en");
      //saveLanguage("en");
    }
  };

  // const saveLanguage = async (selectedLanguage) => {
  //   try {
  //     await AsyncStorage.setItem("appLanguage", selectedLanguage);
  //     console.log("Language saved successfully");
  //     Updates.reloadAsync();
  //   } catch (error) {
  //     console.log("Error saving language:", error);
  //   }
  // };

  return (
    <View style={style.container}>
      <Button mode="contained">{t("this line is translated")}</Button>

      <View style={style.switch}>
        <Text>
          {currentLanguage === "en"
            ? t("change language")
            : t("change language")}
        </Text>

        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
    </View>
  );
}
