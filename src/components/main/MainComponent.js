import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import HomeScreen from "../homescreen/Home";
import DetailsScreen from "../detailscreen/Details";
import RecipesScreen from "../recipes/Recipes";
import SettingsScreen from "../settings/Settings";
import FavouriteScreen from "../favourite/Favourite";

const MainComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "recipes",
      title: "Recipes",
      focusedIcon: "cookie",
      unfocusedIcon: "cookie-outline",
    },
    {
      key: "favourite",
      title: "Favourite",
      focusedIcon: "heart-multiple",
      unfocusedIcon: "heart-multiple-outline",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    recipes: RecipesScreen,
    favourite: FavouriteScreen,
    settings: SettingsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MainComponent;
