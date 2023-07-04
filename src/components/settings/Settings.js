import React, { useState } from "react";
import { connect } from "react-redux";
import { setLanguage, setMeasurement, setVeg } from "../redux/actions";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Divider, Switch } from "react-native-paper";
import style from "./styles";
import LocalNotification from "../LocalNotification/LocalNotification";

const SettingsScreen = ({
  language,
  setLanguage,
  measurement,
  setMeasurement,
  veg,
  setVeg,
}) => {
  const settingsLabel = {
    en: {
      changeLanguage: "Change Language:",
      selectTheme: "Dark Mode",
      enableDarkMode: "Enable Dark Mode",
      changeToMetric: "Change to Metric",
      changeToUsImperial: "Change to US/Imperial",
      measurements: "Measurements:",
      diet: "Dietery Restrictions:",
      veg: "Vegetarian only",
    },
    fr: {
      changeLanguage: "Changer de langue:",
      selectTheme: "Mode sombre",
      enableDarkMode: "Activer le mode sombre",
      changeToMetric: "Changer en métrique",
      changeToUsImperial: "Changer pour US/Impérial",
      measurements: "Des mesures:",
      diet: "Restrictions alimentaires:",
      veg: "Végétarien seulement",
    },
  };

  const [isSwitchOn, setIsSwitchOn] = useState(language === "fr");
  const [isSwitchOnMeasurement, setIsSwitchOnMeasurement] = useState(
    measurement === "metric"
  );
  const [isSwitchOnVeg, setIsSwitchOnVeg] = useState(false);

  //Language Switch
  const onToggleSwitch = () => {
    const newLanguage = isSwitchOn ? "en" : "fr";
    setIsSwitchOn(!isSwitchOn);
    setLanguage(newLanguage);
  };

  //Measurement Switch
  const onToggleSwitchMeasurement = () => {
    const newMeasurement = isSwitchOnMeasurement ? "us_imperial" : "metric";
    setIsSwitchOnMeasurement(!isSwitchOnMeasurement);
    setMeasurement(newMeasurement);
    console.log("Is Metric on ?", isSwitchOnMeasurement);
  };

  //Veg Switch
  const onToggleSwitchVeg = () => {
    setIsSwitchOnVeg(!isSwitchOnVeg);
    setVeg(!isSwitchOnVeg);
    console.log("Is Veg ?", !isSwitchOnVeg);
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
      <Divider />

      <LocalNotification />

      <Divider />

      <Text style={style.title}>{settingsLabel[language].measurements}</Text>
      <View style={style.switch}>
        <Text style={style.options.label}>
          {isSwitchOnMeasurement
            ? settingsLabel[language].changeToUsImperial
            : settingsLabel[language].changeToMetric}
        </Text>
        <Switch
          value={isSwitchOnMeasurement}
          onValueChange={onToggleSwitchMeasurement}
        />
      </View>

      <Divider />

      <Text style={style.title}>{settingsLabel[language].diet}</Text>
      <View style={style.switch}>
        <Text style={style.options.label}>{settingsLabel[language].veg}</Text>
        <Switch value={isSwitchOnVeg} onValueChange={onToggleSwitchVeg} />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  measurement: state.measurement,
  veg: state.veg,
});

const mapDispatchToProps = {
  setLanguage,
  setMeasurement,
  setVeg,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
