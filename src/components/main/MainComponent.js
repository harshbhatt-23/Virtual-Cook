import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  PaperProvider,
  Text,
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";
import Home from "../homescreen/Home";
import RecipesScreen from "../recipes/Recipes";
import SettingsScreen from "../settings/Settings";
import FavouriteScreen from "../favourite/Favourite";
import RecipeDetails from "../recipedetails/RecipeDetails";
import { Provider, connect } from "react-redux";
import store from "../redux/store";
import { setLanguage, setAppColor, setTheme } from "../redux/actions";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  useNavigation,
  useIsFocused,
  CommonActions,
} from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "react-native";
import { getLightAppColorScheme } from "../../components/data/RecipeDataAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainComponent = ({
  language,
  appColor,
  theme,
  setTheme,
}) => {
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
  }, [appColor, theme]);

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

  const RecipesStack = () => {
    const navigation = useNavigation();
    const isRecipesScreenFocused = useIsFocused();

    useEffect(() => {
      if (!isRecipesScreenFocused) {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: "Recipes" }],
        });
        navigation.dispatch(resetAction);
      }
    }, [isRecipesScreenFocused]);

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

  const HomeStack = () => {
    const navigation = useNavigation();
    const isHomeScreenFocused = useIsFocused();

    useEffect(() => {
      if (!isHomeScreenFocused) {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
        navigation.dispatch(resetAction);
      }
    }, [isHomeScreenFocused]);

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
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

  //color from settings screen - App color
  const baseColor = appColor;
  const lightColorScheme = getLightAppColorScheme(baseColor);

  const lightTheme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: lightColorScheme[0].lightColors,
  };

  const darkTheme = {
    ...DarkTheme,
    myOwnProperty: true,
    colors: lightColorScheme[0].darkColors,
  };

  const colorScheme = useColorScheme();
  const isDarkMode = true;

  const themeDisplay = colorScheme === theme ? lightTheme : darkTheme;

  //async code for local storage..
  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("selectedTheme");
        if (storedTheme !== null) {
          setTheme(JSON.parse(storedTheme));
        } else {
          setTheme("light");
          await AsyncStorage.setItem("selectedTheme", "light");
        }
      } catch (error) {
        // Error retrieving data from AsyncStorage
      }
    };

    loadThemeFromStorage();
  }, []);

  return (
    <PaperProvider theme={themeDisplay}>
      <NavigationContainer independent={true}>
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
            component={HomeStack}
            options={{
              title: routes[0].title,
            }}
          />
          <Tab.Screen
            name="recipes"
            component={RecipesStack}
            options={{
              title: routes[1].title,
            }}
          />
          <Tab.Screen
            name="favourite"
            component={FavouriteScreen}
            options={{
              title: routes[2].title,
            }}
          />
          <Tab.Screen
            name="settings"
            component={SettingsScreen}
            options={{
              title: routes[3].title,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  appColor: state.appColor,
  theme: state.theme,
});

const mapDispatchToProps = {
  setLanguage,
  setAppColor,
  setTheme,
};

const ConnectedMainComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ConnectedMainComponent />
      </NavigationContainer>
    </Provider>
  );
};

export default App;