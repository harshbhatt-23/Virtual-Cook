import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    //padding: 22,
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
      marginTop: 10,
      justifyContent: "space-between",
    },
    label: {
      marginRight: 10,
      fontSize: 18,
    },
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
