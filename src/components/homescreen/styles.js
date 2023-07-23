import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 50,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {},
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 26,
    marginTop: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  recipeItemContainer: {
    margin:10,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: "#cccccc",
    borderWidth: 0.5,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    padding: 8,
    textAlign: 'center',
  },
  recipeHeadingView:{
    
  },
  recipeHeadingText:{
    fontSize: 18,
    marginTop: 10,
    marginBottom: 8,
    paddingLeft: 12,
  }
});

export default styles;
