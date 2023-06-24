import React, { useState } from "react";
import { connect } from "react-redux";
import { setLanguage, setMeasurement } from "../redux/actions";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Divider, Switch } from "react-native-paper";
import style from "./styles";
import LocalNotification from "../LocalNotification/LocalNotification";

const SettingsScreen = ({ language, setLanguage, measurement, setMeasurement }) => {
  const settingsLabel = {
    en: {
      changeLanguage: "Change Language:",
      selectTheme: "Dark Mode",
      enableDarkMode: "Enable Dark Mode",
      changeToMetric: "Change to Metric",
      changeToUsImperial: "Change to US/Imperial",
      measurements: "Measurements:",
    },
    fr: {
      changeLanguage: "Changer de langue:",
      selectTheme: "Mode sombre",
      enableDarkMode: "Activer le mode sombre",
      changeToMetric: "Changer en métrique",
      changeToUsImperial: "Changer pour US/Impérial",
      measurements: "Des mesures:"
    },
  };

  const [isSwitchOn, setIsSwitchOn] = useState(language === "fr");
  const [isSwitchOnMeasurement, setIsSwitchOnMeasurement] = useState(measurement === "metric");

  const onToggleSwitch = () => {
    const newLanguage = isSwitchOn ? "en" : "fr";
    setIsSwitchOn(!isSwitchOn);
    setLanguage(newLanguage);
  };

  const onToggleSwitchMeasurement = () => {
    const newMeasurement = isSwitchOnMeasurement ? "us_imperial" : "metric";
    setIsSwitchOnMeasurement(!isSwitchOnMeasurement);
    setMeasurement(newMeasurement);
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
      <Divider/>

      <LocalNotification />

      <Divider/>

      <Text style={style.title}>{settingsLabel[language].measurements}</Text>
      <View style={style.switch}>
        <Text style={style.options.label}>
          {isSwitchOnMeasurement ? settingsLabel[language].changeToUsImperial : settingsLabel[language].changeToMetric}
        </Text>
        <Switch value={isSwitchOnMeasurement} onValueChange={onToggleSwitchMeasurement} />
      </View>

    </View>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  measurement: state.measurement
});

const mapDispatchToProps = {
  setLanguage,
  setMeasurement
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
