import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
    title: {
      fontSize: 23,
      fontWeight: "bold",
    },
    marginBottom: 8,
  },

  title: {
    marginTop: 8,
    fontSize: 23,
    fontWeight: "bold",
  },
  description: {
    fontSize: 17,
    color: "#777777",
    marginBottom: 10,
  },
  options: {
    container: {
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
      justifyContent: "space-between",
    },
    label: {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default styles;
