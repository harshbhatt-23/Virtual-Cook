import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import style from "./styles";

export default function SwitchWithText({
  title,
  description,
  isSwitchOn,
  onToggleSwitch,
}) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <>
      <Text style={style.title}>{title}</Text>
      <View style={style.switch}>
        <Text style={style.options.label}>{description}</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
    </>
  );
}
