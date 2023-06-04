import { Button } from "react-native-paper";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import style from "./styles";

export default function FavouriteScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Favourites Screen</Text>
      <Button mode="contained">This is Favourites Page</Button>
    </View>
  );
}
