import React, { useState, useEffect } from "react";
import { View, Text, TouchableHighlight, FlatList, Image } from "react-native";
import style from "./styles";
import { Searchbar, Button, IconButton } from "react-native-paper";
import { recipes } from "../../components/data/RecipeData";
import { getCategoryName } from "../../components/data/RecipeDataAPI";
import { connect } from "react-redux";
import FilterDialog from "../FilterDialogBox/FilterDialog";
import SortDialog from "../SortDialogBox/SortDialog";

//The code for filtering and sorting recipe by name or cataegory
const RecipesScreen = ({ language, navigation }) => {
  const handleRecipePress = (item) => {
    navigation.navigate("RecipeDetails", { item, sourceScreen: "Recipes" });
  };

  const menuLabels = {
    en: {
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      dessert: "Dessert",
      searchFood: "Search food",
      recipeFound: "Recipe(s) Found",
      filter: "Filter",
      sort: "Sort",
      AtoZ: "AtoZ",
      ZtoA: "ZtoA",
    },
    fr: {
      breakfast: "Petit-déjeuner",
      lunch: "Déjeunere",
      dinner: "Dîner",
      dessert: "Dessert",
      searchFood: "chercher de la nourriture",
      recipeFound: "Recette(s) trouvée(s)",
      filter: "Filtre",
      sort: "Trier",
      AtoZ: "De A à Z",
      ZtoA: "z à un",
    },
  };

  //Search query
  const [searchQuery, setSearchQuery] = useState("");

  const [getRecipeCount, setRecipeCount] = useState(recipes.length);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [sortDialogVisible, setSortDialogVisible] = useState(false);
  const [selectedFilterCategories, setSelectedFilterCategories] = useState([]);
  const [filteredRecipeData, setFilteredRecipeData] = useState([]);
  const [sortOption, setSortOption] = useState("asc");

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const showSortDialog = () => {
    setSortDialogVisible(true);
  };

  const hideSortDialog = () => {
    setSortDialogVisible(false);
  };

  const handleSelectCategories = (categories) => {
    setSelectedFilterCategories(categories);
  };

  const handleSorting = (sort) => {
    setSortOption(sort);
  };

  const handleCancelButton = () => {
    setSortDialogVisible(false);
  };

  //Search box value
  const onChangeSearch = (text) => {
    setSearchQuery(text);
  };

  const renderRecipes = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,0.2)"
        onPress={() => handleRecipePress(item)}
      >
        <>
          <View style={style.recipeContainer}>
            <Image style={style.photo} source={{ uri: item.photo_url }} />
            <Text style={style.title} icon="volume-high">
              {item.title[language]}
            </Text>
            <Text style={style.category}>
              {getCategoryName(item.categoryId, language)}
            </Text>
          </View>
        </>
      </TouchableHighlight>
    );
  };

  useEffect(() => {
    // Filter recipes when selectedFilterCategories or searchQuery changes
    filterRecipes();
  }, [selectedFilterCategories, searchQuery, sortOption]);

  const filterRecipes = () => {
    //let filteredRecipes = recipes;
    let filteredRecipes = [...recipes];

    // Apply category filter
    if (selectedFilterCategories.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        selectedFilterCategories.includes(
          getCategoryName(recipe.categoryId, language) //.toLowerCase()
        )
      );
    }

    // Apply search query filter
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.title[language].toLowerCase().includes(lowercaseQuery)
      );
    }

    // Apply sorting
    if (sortOption === "asc") {
      filteredRecipes.sort((a, b) =>
        a.title[language].localeCompare(b.title[language])
      );
    } else if (sortOption === "desc") {
      filteredRecipes.sort((a, b) =>
        b.title[language].localeCompare(a.title[language])
      );
    }

    setRecipeCount(filteredRecipes.length);
    setFilteredRecipeData(filteredRecipes);
  };

  return (
    <View>
      <View style={style.searchConatiner}>
        <Searchbar
          placeholder={menuLabels[language].searchFood}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>

      <FilterDialog
        visible={dialogVisible}
        onDismiss={hideDialog}
        onSelectCategories={handleSelectCategories}
        language={language}
      />

      <SortDialog
        visible={sortDialogVisible}
        onDismiss={hideSortDialog}
        onSelectSortOption={handleSorting}
        language={language}
      />

      <View style={style.buttonMainContainer}>
        <View style={style.buttonContainer}>
          <Button icon="filter-outline" mode="contained" onPress={showDialog}>
            {menuLabels[language].filter}
          </Button>
        </View>

        <View style={style.buttonContainer}>
          <Button
            icon="sort-alphabetical-variant"
            mode="contained"
            onPress={showSortDialog}
          >
            {menuLabels[language].sort}
          </Button>
        </View>
      </View>

      <View style={style.recipeCount}>
        <Text>
          {getRecipeCount} {menuLabels[language].recipeFound}
        </Text>
      </View>

      <View style={style.dataBottomMargin}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={filteredRecipeData}
          renderItem={renderRecipes}
          keyExtractor={(item) => `${item.recipeId}`}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(RecipesScreen);