import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
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
      justifyContent: "space-between",
    },
    label: {
      marginTop: 10,
      marginRight: 10,
      fontSize: 18,
    },
  },
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
  logs: {
    container: {
      marginTop: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#777777",
    },
    text: {
      fontSize: 12,
      color: "#777777",
      marginTop: 5,
    },
  },
});
