import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    justifyContent: "center",
    padding: 20,
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

  // horizontal line style
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    marginVertical: 10,
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
