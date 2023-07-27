import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { Button, IconButton, useTheme } from "react-native-paper";
import { recipes } from "../../components/data/RecipeData";
import { getCategoryName } from "../../components/data/RecipeDataAPI";
import { removeFromFavorites } from "../redux/actions";
import styles from "./styles";
import emptyListImage from "../../../assets/empty-list-image.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FavoriteScreen = ({
  language,
  favoriteRecipes,
  removeFromFavorites,
  navigation,
}) => {
  const theme = useTheme();
  const [filteredRecipeData, setFilteredRecipeData] = useState([]);
  const [sourceScreen, setSourceScreen] = useState("");

  const menuLabels = {
    en: {
      remove: "Remove",
      emptyList: "Your favorites list is empty.",
      emptyListSub:
        "Explore recipes and add them to favourtits to show them here!",
    },
    fr: {
      remove: "Retirer",
      emptyList: "Votre liste de favoris est vide.",
      emptyListSub:
        "Explorez des recettes et ajoutez-les à vos favoris pour les afficher ici.",
    },
  };

  useEffect(() => {
    filterRecipes();
  }, [favoriteRecipes]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSourceScreen("");
    });

    return unsubscribe;
  }, [navigation]);

  const filterRecipes = () => {
    let filteredRecipes = recipes.filter((recipe) =>
      favoriteRecipes.includes(recipe.recipeId)
    );
    setFilteredRecipeData(filteredRecipes);
  };

  const handleRecipePress = (item) => {
    navigation.navigate("RecipeDetails", { item, sourceScreen: "favourite" });
  };

  const handleRemoveFavorite = (recipeId) => {
    removeFromFavorites(recipeId);
  };

  const renderRecipes = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleRecipePress(item)}
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.photo_url }} />
          </View>
          <View style={styles.cardTextContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title[language]}</Text>
              <Text style={styles.category}>
                {getCategoryName(item.categoryId, language)}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleRemoveFavorite(item.recipeId)}
              >
                <Icon name="close-circle-outline" size={40} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyListContainer}>
      <Image source={emptyListImage} style={styles.emptyListImage} />
      <Text style={styles.emptyListText}>{menuLabels[language].emptyList}</Text>
      <Text style={styles.emptyListTextSub}>
        {menuLabels[language].emptyListSub}
      </Text>
    </View>
  );

  const isDarkTheme = theme.dark;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={!isDarkTheme ? "dark-content" : "light-content"} // Set the status bar text color to light
        backgroundColor={theme.colors.surface} // Replace with your desired status bar color
      />
      <View style={styles.container}>
        {filteredRecipeData.length > 0 ? (
          <FlatList
            data={filteredRecipeData}
            renderItem={renderRecipes}
            keyExtractor={(item) => item.recipeId.toString()}
          />
        ) : (
          renderEmptyList()
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  favoriteRecipes: state.favoriteRecipes,
});

const mapDispatchToProps = {
  removeFromFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);
