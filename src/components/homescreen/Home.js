import { Button } from "react-native-paper";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import style from "./styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate("Details")}>
        Go to details
      </Button>
    </View>
  );
}
