import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import style from "./styles";

export default function SwitchWithText({}) {
  return (
    <>
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
    </>
  );
}
