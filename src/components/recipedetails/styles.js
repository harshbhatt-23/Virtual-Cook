import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    //backgroundColor: "#fff",
    paddingTop: 50,
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    justifyContent: "flex-start",
    padding: 16,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 6,
    //color: "#36454F",
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    // color: "#36454F",
  },
  prepTime: {
    fontSize: 16,
    fontWeight: "bold",
    //color: "#000",
  },
  fabContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  recipeDescription: {
    fontSize: 16,
    //color: "#000",
    marginBottom: 16,
    marginLeft: 20,
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
    alignSelf: "center",
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
  headerTitle: {
    fontWeight: "bold",
  },
  dietImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  typeWithIcon: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default styles;
