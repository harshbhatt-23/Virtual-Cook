import { StyleSheet } from "react-native";
import { RecipeCard } from '../../AppStyles';

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
    marginTop: 80,
    marginLeft: 20,
    marginRight: 20
  },
  settingHeaderIcon: {
    flexDirection: "row-reverse"
  },
  buttonMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20
  },
  buttoncontainer: {
    //flex: 1, 

  },
  recipeContainer: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,

  recipeCount:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:15

  },
  selectedFilter:{
    marginTop:10,
    flexDirection:"row"
  },
  checkboxContainer: {
    flexDirection:"row",
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
  },
  dataBottomMargin: {
    marginBottom: 480
  }
});

export default styles;