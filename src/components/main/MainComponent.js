import React, { useState, useEffect } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import HomeScreen from "../homescreen/Home";
import RecipesScreen from "../recipes/Recipes";
import SettingsScreen from "../settings/Settings";
import FavouriteScreen from "../favourite/Favourite";
import RecipeDetails from "../recipedetails/RecipeDetails";
import { Provider, connect } from "react-redux";
import store from "../redux/store";
import { setLanguage } from "../redux/actions";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
//import Icon from "react-native-vector-icons/FontAwesome";

import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainComponent = ({ language, setLanguage }) => {
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    {
      key: "home",
      title: language === "en" ? "Home" : "Accueil",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "recipes",
      title: language === "en" ? "Recipes" : "Recettes",
      focusedIcon: "cookie",
      unfocusedIcon: "cookie-outline",
    },
    {
      key: "favourite",
      title: language === "en" ? "Favourite" : "Préférée",
      focusedIcon: "heart-multiple",
      unfocusedIcon: "heart-multiple-outline",
    },
    {
      key: "settings",
      title: language === "en" ? "Settings" : "Paramètres",
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
        return language === "en" ? "Home" : "Accueil";
      case "recipes":
        return language === "en" ? "Recipes" : "Recettes";
      case "favourite":
        return language === "en" ? "Favourite" : "Favoris";
      case "settings":
        return language === "en" ? "Settings" : "Paramètres";
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

  const RecipesStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Recipes"
          component={RecipesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetails}
          options={{
            headerShown: false,
            tabBarButton: () => null,
            tabBarLabel: () => null,
          }}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  // return (
  //   <Provider store={store}>
  //     <BottomNavigation
  //       navigationState={{ index, routes }}
  //       onIndexChange={setIndex}
  //       renderScene={renderScene}
  //     />
  //   </Provider>
  // );
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let focusedIcon = routes.focusedIcon;
              let unfocusedIcon = routes.unfocusedIcon;
              switch (route.name) {
                case "home":
                  iconName = focused ? "home" : "home-outline";
                  break;
                case "recipes":
                  iconName = focused ? "cookie" : "cookie-outline";
                  break;
                case "favourite":
                  iconName = focused
                    ? "heart-multiple"
                    : "heart-multiple-outline";
                  break;
                case "settings":
                  iconName = focused ? "cog" : "cog-outline";
                  break;
                default:
              }
              return <Icon name={iconName} size={24} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="home"
            component={HomeScreen}
            options={{ title: routes[0].title }}
          />
          <Tab.Screen
            name="recipes"
            component={RecipesStack}
            options={{ title: routes[1].title }}
          />
          <Tab.Screen
            name="favourite"
            component={FavouriteScreen}
            options={{ title: routes[2].title }}
          />
          <Tab.Screen
            name="settings"
            component={SettingsScreen}
            options={{ title: routes[3].title }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

const mapDispatchToProps = {
  setLanguage,
};

const ConnectedMainComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedMainComponent />
    </Provider>
  );
};

export default App;
