import React from "react";
import { View, StyleSheet } from "react-native";

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    marginVertical: 10,
  },
});

export default HorizontalLine;
