import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Vibration,
  ActivityIndicator,
} from "react-native";
import {
  IconButton,
  MD3Colors,
  Divider,
  Button,
  useTheme,
  Text,
  Card,
} from "react-native-paper";
import { recipes } from "../../components/data/RecipeData";
import styles from "./styles";
import { connect } from "react-redux";
import { getRecipeById } from "../data/RecipeDataAPI";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShakeEventExpo } from "../data/ShakeEventExpo";
import { debounce } from "lodash";

const Home = ({ navigation, language }) => {
  const [recipeList, setRecipeList] = useState([]);
  const theme = useTheme();
  const [randomNumber, setRandomNumber] = useState(null);
  const [isHandlingShake, setIsHandlingShake] = useState(false);
  const [isShakeDetected, setIsShakeDetected] = useState(false);
  const [randomRecipeData, setRandomRecipeData] = useState(null);
  const [shakeSubscription, setShakeSubscription] = useState(null);

  const shakeFlag = useRef(false);
  const SHAKING_DEBOUNCE_DELAY = 1000; // Adjust the debounce interval as needed (in milliseconds)

  useEffect(() => {
    // Check if the random number is already generated and stored in AsyncStorage
    checkRandomNumber();

    // Add shake event listener when the component mounts
    const shakeSubscription = ShakeEventExpo.addListener(debouncedHandleShake);
    setShakeSubscription(shakeSubscription);

    // Remove the shake event listener when the component unmounts
    return () => {
      //ShakeEventExpo.removeListener(handleShake);
      if (shakeSubscription) {
        shakeSubscription.remove();
      }
    };
  }, [debouncedHandleShake]);

  useEffect(() => {
    // Check if the random number is already generated and stored in AsyncStorage
    checkRandomNumber();
  }, []);

  const checkRandomNumber = async () => {
    try {
      // Check if the random number exists in AsyncStorage
      const storedRandomNumber = await AsyncStorage.getItem("randomNumber");

      if (storedRandomNumber !== null) {
        // Random number is already generated and stored
        const randomNumber = Number(storedRandomNumber);
        console.log("Random number already generated:", randomNumber);

        // Fetch the recipe data by ID
        try {
          const randomRecipeData = await getRecipeById(randomNumber);
          // Update the state with the fetched recipe data
          setRandomRecipeData(randomRecipeData);
          console.log("Random recipe data:", randomRecipeData);
        } catch (error) {
          console.log("Error fetching random recipe data:", error);
        }
      } else {
        // Random number doesn't exist in AsyncStorage
        // Generate a new random number between 1 and 18
        generateRandomNumber();
      }
    } catch (error) {
      console.log("Error reading random number from AsyncStorage:", error);
    }
  };

  const handleShake = useCallback(() => {
    if (shakeFlag.current) {
      // If shake event is already being handled, ignore additional shakes
      console.log("Already handling shake event");
      return;
    }

    // Set the flag to indicate that the shake event is being handled
    shakeFlag.current = true;

    // Shake event handler
    // Vibrate the device for 500 milliseconds
    Vibration.vibrate(500);

    console.log("Shake detected");

    // Call generateRandomNumber function to generate a new random number
    generateRandomNumber().then(() => {
      // Reset the flag after the debounce interval
      setTimeout(() => {
        shakeFlag.current = false;
        console.log("Reset shakeFlag");
      }, SHAKING_DEBOUNCE_DELAY); // Debounce interval (in milliseconds)
    });
  }, []);

  const debouncedHandleShake = useCallback(
    debounce(handleShake, SHAKING_DEBOUNCE_DELAY),
    [isHandlingShake] // Add isHandlingShake as a dependency
  );

  const generateRandomNumber = async () => {
    const newRandomNumber = Math.floor(Math.random() * 17) + 1;
    // Store the new random number in AsyncStorage
    await AsyncStorage.setItem("randomNumber", newRandomNumber.toString());
    setRandomNumber(newRandomNumber);

    console.log("New random number generated:", newRandomNumber);
    // Fetch the recipe data by ID
    try {
      const randomRecipeData = await getRecipeById(newRandomNumber);
      // Update the state with the fetched recipe data

      setRandomRecipeData(randomRecipeData);
      console.log("Random recipe data from Newly Generated:", randomRecipeData);
    } catch (error) {
      console.log("Error fetching random recipe data:", error);
    }
  };

  function getPopularRecipes(numRecipes) {
    const popularRecipes = [];
    const recipeCount = recipes.length;

    // Make sure the requested number of recipes is not greater than the total available recipes
    const numRequestedRecipes = Math.min(numRecipes, recipeCount);

    // Generate unique random indices until we have the desired number of recipes
    while (popularRecipes.length < numRequestedRecipes) {
      const randomIndex = Math.floor(Math.random() * recipeCount);
      if (!popularRecipes.includes(randomIndex)) {
        popularRecipes.push(randomIndex);
      }
    }

    // Extract the actual recipe objects based on the random indices
    const selectedRecipes = popularRecipes.map((index) => recipes[index]);
    return selectedRecipes;
  }

  useEffect(() => {
    const popularRecipes = getPopularRecipes(5);
    setRecipeList(popularRecipes);
  }, []);

  const menuLabels = {
    en: {
      helloUser: "Hello",
      descriptionText: "What would you like to cook today?",
      recipeText: "Popular recipes",
      randomText: "Random recipe",
      randomTextDescription: "Shake device to get a random recipe",
    },
    fr: {
      helloUser: "Bonjour",
      descriptionText: "Qu'aimeriez-vous cuisiner aujourd'hui?",
      recipeText: "Recettes populaires",
      randomText: "Recette aléatoire",
      randomTextDescription:
        "Secouez l'appareil pour obtenir une recette aléatoire",
    },
  };

  const handleRecipePress = (item) => {
    navigation.navigate("RecipeDetails", {
      item,
      sourceScreen: "Home",
    });
  };

  const headerComponent = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerText}>{menuLabels[language].helloUser}</Text>
        <Text style={styles.description}>
          {menuLabels[language].descriptionText}
        </Text>
      </View>
      <View>
        <IconButton
          icon="account-circle"
          color={MD3Colors.primary50}
          size={50}
        />
      </View>
    </View>
  );

  const randomRecipeTitle = () => {
    return (
      <View style={styles.recipeHeadingView}>
        <Text style={styles.recipeHeadingText}>
          {menuLabels[language].randomText}
        </Text>
        <Text style={styles.recipeHeadingTextDescription}>
          {menuLabels[language].randomTextDescription}
        </Text>
      </View>
    );
  };

  const renderRandomRecipeItem = () => {
    // Check if "randomRecipeData" is not null and not empty
    if (randomRecipeData && Object.keys(randomRecipeData).length > 0) {
      //console.log("Random recipe RENDER:", randomRecipeData);
      return (
        <TouchableOpacity
          style={styles.randomRecipeItemContainer}
          onPress={() => handleRecipePress(randomRecipeData)}
        >
          <Image
            source={{ uri: randomRecipeData.photo_url }}
            style={styles.recipeImage}
          />
          <Text style={styles.recipeTitle}>
            {randomRecipeData.title[language]}
          </Text>
        </TouchableOpacity>
      );
    } else {
      // You can show a loading indicator or some message while waiting for data to be fetched
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }
  };

  const popularRecipesTitle = () => (
    <View style={styles.recipeHeadingView}>
      <Text style={styles.recipeHeadingText}>
        {menuLabels[language].recipeText}
      </Text>
    </View>
  );

  const renderPopularRecipes = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeItemContainer}
      onPress={() => handleRecipePress(item)}
    >
      <Image source={{ uri: item.photo_url }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title[language]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {headerComponent()}

      <Divider style={{ marginHorizontal: 10 }} />

      <ScrollView>
        {randomRecipeTitle()}
        {renderRandomRecipeItem()}

        <>
          {popularRecipesTitle()}
          <View style={styles.horizontalScrollView}>
            <FlatList
              data={recipeList}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.recipeId}`}
              renderItem={renderPopularRecipes}
            />
          </View>
        </>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  veg: state.veg,
});

export default connect(mapStateToProps)(Home);
