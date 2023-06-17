import React, { useState } from "react";
import { connect } from "react-redux";
import { setLanguage } from "../redux/actions";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Switch } from "react-native-paper";
import style from "./styles";
import LocalNotification from "../LocalNotification/LocalNotification";

const SettingsScreen = ({ language, setLanguage }) => {
  const settingsLabel = {
    en: {
      changeLanguage: "Change Language:",
      selectTheme: "Dark Mode",
      enableDarkMode: "Enable Dark Mode",
    },
    fr: {
      changeLanguage: "Changer de langue:",
      selectTheme: "Mode sombre",
      enableDarkMode: "Activer le mode sombre",
    },
  };

  const [isSwitchOn, setIsSwitchOn] = useState(language === "fr");

  const onToggleSwitch = () => {
    const newLanguage = isSwitchOn ? "en" : "fr";
    setIsSwitchOn(!isSwitchOn);
    setLanguage(newLanguage);
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>{settingsLabel[language].changeLanguage}</Text>
      <View style={style.switch}>
        <Text style={style.options.label}>
          {isSwitchOn ? "Passer à l'anglais" : "Change to French"}
        </Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>

      <View style={style.lineStyle} />

      <LocalNotification />

      <View style={style.lineStyle} />

      <View style={style.switch}>
        <Text style={style.switch.title}>
          {settingsLabel[language].selectTheme}
        </Text>
        <Switch value={isSwitchOn} onValueChange={() => {}} />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

const mapDispatchToProps = {
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
