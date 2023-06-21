import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#777",
  },
  prepTime: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 4,
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    position: "relative",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  // horizontal line style
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    marginVertical: 10,
  },
});

export default styles;
