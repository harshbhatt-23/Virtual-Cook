import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    // marginTop: 100,
    // marginLeft: 20,
    // marginRight: 20
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  searchConatiner: {
    //  marginTop: Platform.OS === "android" ? 50 : 0,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  settingHeaderIcon: {
    flexDirection: "row-reverse",
  },
  buttonMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttoncontainer: {
    //flex: 1,
  },

  recipeContainer: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,

  recipeCount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  selectedFilter: {
    marginTop: 10,
    flexDirection: "row",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
  },
  dataBottomMargin: {
    //marginBottom: 480,
  },
  speakTitle: {
    //add style for microphone icon
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  closeModalButton: {
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modal: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
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
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
