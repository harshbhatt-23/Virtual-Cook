import { Button } from "react-native-paper";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import style from "./styles";

export default function RecipesScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Recipe Screen</Text>
      <Button mode="contained">This is Recipes Page</Button>
    </View>
  );
}
