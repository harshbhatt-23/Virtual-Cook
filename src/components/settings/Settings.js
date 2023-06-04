import { Button } from "react-native-paper";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import style from "./styles";

export default function SettingsScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Settings Screen</Text>
      <Button mode="contained">This is Settings Page</Button>
    </View>
  );
}
