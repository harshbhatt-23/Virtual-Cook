import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
  Share,
} from "react-native";
import { connect } from "react-redux";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  getCategoryName,
  getDirectionById,
  getIngredientById,
} from "../../components/data/RecipeDataAPI";
import {
  FAB,
  Appbar,
  IconButton,
  MD3Colors,
  Snackbar,
  Divider,
  Button,
  useTheme,
  Text,
} from "react-native-paper";
import styles from "./styles";
import * as Speech from "expo-speech";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { addToFavorites, removeFromFavorites } from "../redux/actions";
import nonVegImage from "../../../assets/non-veg-48.png";
import vegImage from "../../../assets/veg-48.png";

const RecipeDetails = ({
  route,
  language,
  measurement,
  addToFavorites,
  removeFromFavorites,
  favoriteRecipes,
}) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFirstIcon, setIsFirstIcon] = useState(false);

  const { item } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleBackPress = () => {
    Speech.stop();
    // Navigate back to RecipesScreen
    const sourceScreen = route.params.sourceScreen;
    navigation.navigate(sourceScreen);
    return true;
  };

  const displayWords = {
    en: {
      PrepTime: "Prep Time",
      CookTime: "Cook Time",
      Ingredients: "Ingredients",
      Directions: "Directions",
      Description: "Description",
      addToFavoritesButton: "Add to favorite",
      shareButton: "Share",
      shareTitle: "Check out this recipe",
      title: "Title",
    },
    fr: {
      PrepTime: "Temps de préparation",
      CookTime: "Temps de cuisson",
      Ingredients: "Ingrédients",
      Directions: "Directions",
      Description: "Description",
      addToFavoritesButton: "Ajouter aux Favoris",
      shareButton: "Partager",
      shareTitle: "Vérifiez cette recette",
      title: "Titre",
    },
  };

  const ingredientData = getIngredientById(
    item.ingredientId,
    language,
    measurement
  );
  const ingredients = ingredientData && ingredientData[0]; // Assuming the array contains a single set of ingredients

  const directionData = getDirectionById(item.ingredientId, language);
  const directions = directionData && directionData[0];

  const speakRecipe = () => {
    if (isClicked) {
      setIsClicked(!isClicked);
      stopTextToSpeech();
      return;
    }
    setIsClicked(!isClicked);
    if (language == "fr") {
      Speech.speak(
        "Le titre de la recette est " +
          item.title[language] +
          ". La catégorie est " +
          getCategoryName(item.categoryId, language) +
          ". Le temps de préparation est " +
          item.preptime +
          ". Le temps de cuisson est " +
          item.cooktime +
          ". Les ingrédients sont " +
          getIngredientById(item.ingredientId, language, measurement) +
          ". Les directions sont " +
          getDirectionById(item.ingredientId, language) +
          ". La description est " +
          item.description[language] +
          "."
      );
    } else {
      Speech.speak(
        "The title of the recipe is " +
          item.title[language] +
          ". The category is " +
          getCategoryName(item.categoryId, language) +
          ". The prep time is " +
          item.preptime +
          ". The cook time is " +
          item.cooktime +
          ". The ingredients are " +
          getIngredientById(item.ingredientId, language, measurement) +
          ". The directions are " +
          getDirectionById(item.ingredientId, language) +
          ". The description is " +
          item.description[language] +
          "."
      );
    }
  };

  useEffect(() => {
    const handleBackPress = () => {
      stopTextToSpeech();
      return false;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    navigation.addListener("blur", () => {
      if (isFocused) {
        stopTextToSpeech();
      }
    });
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const stopTextToSpeech = async () => {
    Speech.stop();
  };

  const [showInfo, setShowInfo] = useState(false);

  const handleIconLongPress = (isTrue) => {
    setShowSnackbar(true);
    isTrue ? setIsFirstIcon(true) : setIsFirstIcon(false);
  };

  const hideSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleFavoritePress = (id) => {
    if (isRecipeFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  const handleSharePress = async (id) => {
    try {
      // const result = await Share.share({
      //     message: `Check out this recipe: \n\nTitle: ${item.title[language]} \n\nIngredients:\n${ingredients.map(
      //         (ingredient, index) => ` ${index + 1}. ${ingredient} \n`
      //     )} \nDirections:\n${directions.map(
      //         (direction, index) => ` ${index + 1}. ${direction} \n`
      //     )} \n\nDescription: ${item.description[language]} \n\nPrep Time: ${item.preptime} \n\nCook Time: ${item.cooktime}`
      // });

      const result = await Share.share({
        message: `${displayWords[language].shareTitle}: \n\n${
          displayWords[language].title
        }: ${item.title[language]} \n\n${
          displayWords[language].Ingredients
        }:\n${ingredients
          .map((ingredient, index) => `${index + 1}. ${ingredient}`)
          .join("\n")} \n\n${displayWords[language].Directions}:\n${directions
          .map((direction, index) => `${index + 1}. ${direction}`)
          .join("\n")} \n\n${displayWords[language].Description}: ${
          item.description[language]
        } \n\n${displayWords[language].PrepTime}: ${item.preptime} \n\n${
          displayWords[language].CookTime
        }: ${item.cooktime}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const isRecipeFavorite = (id) => {
    const isFavorite = favoriteRecipes.some((recipe) => recipe === id);
    return isFavorite;
  };

  const theme = useTheme();

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      style={[{ backgroundColor: theme.colors.background }]}
    >
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            handleBackPress();
          }}
        />
        <Appbar.Content title={item.title[language]} />
      </Appbar.Header>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.photo_url }} />
      </View>

      {/* Breakfast */}
      <View style={styles.content}>
        <View style={styles.typeWithIcon}>
          <Text style={styles.categoryName}>
            {getCategoryName(item.categoryId, language)}
          </Text>
          <Image
            source={item.isVeg ? vegImage : nonVegImage}
            // style={[styles.dietImage, { backgroundColor: theme.colors.surface }]}
            style={styles.dietImage}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onLongPress={() => handleIconLongPress(true)}
              onPressOut={() => setShowInfo(false)}
            >
              <IconButton
                icon="clipboard-clock"
                size={24}
                iconColor={theme.colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.prepTime}>{item.preptime}</Text>

            <TouchableOpacity
              onLongPress={() => handleIconLongPress(false)}
              onPressOut={() => setShowInfo(false)}
            >
              <IconButton
                icon="cookie-clock"
                size={24}
                iconColor={theme.colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.prepTime}>{item.cooktime}</Text>
          </View>

          <FAB
            icon={isClicked ? "text-to-speech-off" : "text-to-speech"}
            style={styles.fab}
            onPress={() => speakRecipe()}
          />

          <Snackbar
            visible={showSnackbar}
            onDismiss={hideSnackbar}
            duration={3000}
            action={{
              label: "Dismiss",
              onPress: hideSnackbar,
            }}
          >
            {isFirstIcon
              ? "Preparation Time: " + item.preptime
              : "Cooking Time: " + item.cooktime}
          </Snackbar>
        </View>

        <Divider />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <IconButton icon="file-document" iconColor={theme.colors.primary} />
          <Text style={styles.recipeName}>
            {displayWords[language].Ingredients}
          </Text>
        </View>
        {ingredients && (
          <View>
            {ingredients.map((ingredient, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <IconButton
                  icon="circle-medium"
                  iconColor={theme.colors.onSurfaceSecondary}
                />
                <Text style={{ fontSize: 16, marginRight: 30 }}>
                  {ingredient}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Divider />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <IconButton icon="bowl-mix" iconColor={theme.colors.primary} />
          <Text style={styles.recipeName}>
            {displayWords[language].Directions}
          </Text>
        </View>
        {directions && (
          <View style={{ marginBottom: 16 }}>
            {directions.map((direc, index) => (
              <View key={index}>
                <Text style={styles.recipeDescription}>
                  {index + 1}. {"\u00A0"}
                  {direc}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Divider />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <IconButton
            icon="book-open-variant"
            iconColor={theme.colors.primary}
          />
          <Text style={styles.recipeName}>
            {displayWords[language].Description}
          </Text>
        </View>

        <Text style={styles.recipeDescription}>
          {item.description[language]}
        </Text>

        <Divider />

        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Button
              mode="contained-tonal"
              onPress={() => handleFavoritePress(item.recipeId)}
              icon={({}) =>
                isRecipeFavorite(item.recipeId) ? (
                  <Icon name="cards-heart" color="#D2042D" size={24} />
                ) : (
                  <Icon name="cards-heart-outline" color="black" size={24} />
                )
              }
            >
              {displayWords[language].addToFavoritesButton}
            </Button>

            <Button
              mode="outlined"
              onPress={() => handleSharePress(displayWords[language])}
              icon="share"
            >
              {displayWords[language].shareButton}
            </Button>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  measurement: state.measurement,
  favoriteRecipes: state.favoriteRecipes,
});

const mapDispatchToProps = {
  addToFavorites,
  removeFromFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
