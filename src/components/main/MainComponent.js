import React, { useState, useEffect } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import HomeScreen from "../homescreen/Home";
import RecipesScreen from "../recipes/Recipes";
import SettingsScreen from "../settings/Settings";
import FavouriteScreen from "../favourite/Favourite";
import { Provider, connect } from 'react-redux';
import store from '../redux/store';
import { setLanguage } from '../redux/actions';

const MainComponent = ({ language, setLanguage }) => {
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    {
      key: "home",
      title: language === 'en' ? "Home" : "Accueil",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "recipes",
      title: language === 'en' ? "Recipes" : "Recettes",
      focusedIcon: "cookie",
      unfocusedIcon: "cookie-outline",
    },
    {
      key: "favourite",
      title: language === 'en' ? "Favourite" : "Préférée",
      focusedIcon: "heart-multiple",
      unfocusedIcon: "heart-multiple-outline",
    },
    {
      key: "settings",
      title: language === 'en' ? "Settings" : "Paramètres",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  useEffect(() => {
    // Update the titles of the routes when the language changes
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) => ({
        ...route,
        title: getRouteTitle(route.key, language),
      }))
    );
  }, [language]);

  const getRouteTitle = (key, language) => {
    // Return the corresponding title based on the route key and language
    switch (key) {
      case "home":
        return language === 'en' ? "Home" : "Accueil";
      case "recipes":
        return language === 'en' ? "Recipes" : "Recettes";
      case "favourite":
        return language === 'en' ? "Favourite" : "Favoris";
      case "settings":
        return language === 'en' ? "Settings" : "Paramètres";
      default:
        return "";
    }
  };

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    recipes: RecipesScreen,
    favourite: FavouriteScreen,
    settings: SettingsScreen,
  });

  return (
    <Provider store={store}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </Provider>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

const mapDispatchToProps = {
  setLanguage,
};

const ConnectedMainComponent = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedMainComponent />
    </Provider>
  );
};

export default App;
