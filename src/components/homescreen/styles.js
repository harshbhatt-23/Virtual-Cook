import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  horizontalScrollView: {
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 50,
  },
  headerLeft: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 26,
    marginTop: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    alignSelf: "center",
  },
  randomRecipeItemContainer: {
    margin: 10,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 0.5,
  },
  recipeItemContainer: {
    margin: 10,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 0.5,
    width: 200,
  },
  recipeImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    padding: 8,
    textAlign: "center",
  },
  recipeHeadingText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 8,
    paddingLeft: 12,
  },
  recipeHeadingTextDescription: {
    fontSize: 14,
    paddingLeft: 12,
    color: "#777777",
    marginBottom: 10,
  },

  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
