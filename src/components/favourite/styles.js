import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
  },
  container: {
    flex: 1,
    //  backgroundColor: "#fff",
    padding: 16,
    marginTop: 45,
  },
  card: {
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    shadowColor: "#B3B3B3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    marginTop: 15,
    padding: 16,
    flexDirection: "row",
    flex: 8,
  },
  imageContainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 75,
  },
  cardTextContainer: {
    flex: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 75,
  },
  textContainer: {
    flex: 8,
    marginLeft: 8,
  },
  buttonContainer: {
    flex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: "#888",
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 4,
    marginTop: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyListText: {
    fontSize: 18,
    color: "#999999",
  },
  emptyListTextSub: {
    fontSize: 15,
    margin: 15,
    color: "#bcbcbc",
  },
});

export default styles;
