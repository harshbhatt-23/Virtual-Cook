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
import LottieDialogBox from "../ThemeDialogBox/LottieDialogBox";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation, language }) => {
  const [recipeList, setRecipeList] = useState([]);
  const theme = useTheme();
  const [randomNumber, setRandomNumber] = useState(null);
  const [isHandlingShake, setIsHandlingShake] = useState(false);
  const [isShakeDetected, setIsShakeDetected] = useState(false);
  const [randomRecipeData, setRandomRecipeData] = useState(null);
  const [shakeSubscription, setShakeSubscription] = useState(null);

  //code for shake dialog
  const [isHomeTabClicked, setIsHomeTabClicked] = useState(false);
  const isFocused = useIsFocused();
  const [shakeDialogVisible, setShakeDialogVisible] = useState(false);
  const [hasLottieDialogShown, setHasLottieDialogShown] = useState(false);

  const showShakeDialog = () => {
    setShakeDialogVisible(true);
    setHasLottieDialogShown(true);
  };

  // useEffect to handle Home tab click
  // useEffect(() => {
  //   if (isFocused && !hasLottieDialogShown) {
  //     setIsHomeTabClicked(true);
  //     setShakeDialogVisible(true);
  //     setHasLottieDialogShown(true);
  //   }
  // }, [isFocused, hasLottieDialogShown]);

  useEffect(() => {
    checkFirstTimeUser();
  }, []);

  const checkFirstTimeUser = async () => {
    try {
      const value = await AsyncStorage.getItem("firstTimeUser");

      if (value === null) {
        showShakeDialog();
        await AsyncStorage.setItem("firstTimeUser", "true");
      }
    } catch (error) {
      console.log("Error checking first time user:", error);
    }
  };

  // Function to handle the closing of LottieDialogBox
  const handleCloseDialog = () => {
    setShakeDialogVisible(false);
  };

  const shakeFlag = useRef(false);
  const SHAKING_DEBOUNCE_DELAY = 1000;

  useEffect(() => {
    checkRandomNumber();

    const shakeSubscription = ShakeEventExpo.addListener(debouncedHandleShake);
    setShakeSubscription(shakeSubscription);

    return () => {
      if (shakeSubscription) {
        shakeSubscription.remove();
      }
    };
  }, [debouncedHandleShake]);

  useEffect(() => {
    checkRandomNumber();
  }, []);

  const checkRandomNumber = async () => {
    try {
      const storedRandomNumber = await AsyncStorage.getItem("randomNumber");

      if (storedRandomNumber !== null) {
        const randomNumber = Number(storedRandomNumber);

        try {
          const randomRecipeData = await getRecipeById(randomNumber);
          setRandomRecipeData(randomRecipeData);
        } catch (error) {
          console.log("Error fetching random recipe data:", error);
        }
      } else {
        generateRandomNumber();
      }
    } catch (error) {
      console.log("Error reading random number from AsyncStorage:", error);
    }
  };

  const handleShake = useCallback(() => {
    if (shakeFlag.current) {
      return;
    }

    shakeFlag.current = true;
    Vibration.vibrate(500);

    generateRandomNumber().then(() => {
      setTimeout(() => {
        shakeFlag.current = false;
      }, SHAKING_DEBOUNCE_DELAY);
    });
  }, []);

  const debouncedHandleShake = useCallback(
    debounce(handleShake, SHAKING_DEBOUNCE_DELAY),
    [isHandlingShake]
  );

  const generateRandomNumber = async () => {
    const newRandomNumber = Math.floor(Math.random() * 17) + 1;

    await AsyncStorage.setItem("randomNumber", newRandomNumber.toString());
    setRandomNumber(newRandomNumber);
    try {
      const randomRecipeData = await getRecipeById(newRandomNumber);
      setRandomRecipeData(randomRecipeData);
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
    if (randomRecipeData && Object.keys(randomRecipeData).length > 0) {
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
        {/* {isHomeTabClicked && ( */}
        <LottieDialogBox
          isShakeVisible={shakeDialogVisible}
          onClose={handleCloseDialog}
          language={language}
        />
        {/* )} */}

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
