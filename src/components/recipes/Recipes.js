import React, { useState, useEffect } from "react";
import {
  View,
  TouchableHighlight,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import style from "./styles";
import { Searchbar, Button, useTheme, Text } from "react-native-paper";
import { recipes } from "../../components/data/RecipeData";
import { getCategoryName } from "../../components/data/RecipeDataAPI";
import { connect } from "react-redux";
import FilterDialog from "../FilterDialogBox/FilterDialog";
import SortDialog from "../SortDialogBox/SortDialog";
import nonVegImage from "../../../assets/non-veg-48.png";
import vegImage from "../../../assets/veg-48.png";
import { useColorScheme } from "react-native";

//The code for filtering and sorting recipe by name or cataegory
const RecipesScreen = ({ language, navigation, veg }) => {
  const theme = useTheme();

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

  //Search box value
  const onChangeSearch = (text) => {
    setSearchQuery(text);
  };

  // //statusbar Testing
  // const getStatusBarHeight = () => {
  //   return Platform.OS === "android" ? StatusBar.currentHeight : 0;
  // };
  // const statusBarHeight = getStatusBarHeight();
  // //testing done

  const renderRecipes = ({ item }) => {
    return (
      <TouchableOpacity
        underlayColor={theme.colors.surface}
        onPress={() => handleRecipePress(item)}
      >
        <>
          <View style={style.recipeContainer}>
            <Image style={style.photo} source={{ uri: item.photo_url }} />
            <Text style={style.title} icon="volume-high">
              {item.title[language]}
            </Text>
            <View style={style.typeWithIcon}>
              <Text style={style.category}>
                {getCategoryName(item.categoryId, language)}
              </Text>
              <Image
                source={item.isVeg ? vegImage : nonVegImage}
                style={style.dietImage}
              />
            </View>
          </View>
        </>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    // Filter recipes when selectedFilterCategories or searchQuery changes
    filterRecipes();
  }, [selectedFilterCategories, searchQuery, sortOption, veg]);

  const filterRecipes = () => {
    let filteredRecipes = [...recipes];

    // Apply veg filter
    if (veg === true) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.isVeg === veg
      );
    }

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

  const isDarkTheme = theme.dark;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={!isDarkTheme ? "dark-content" : "light-content"}
        backgroundColor={theme.colors.background}
      />
      <View style={[{ backgroundColor: theme.colors.background, flex: 1 }]}>
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
          initialSelectedCategories={selectedFilterCategories}
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

        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 25,
            }}
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={filteredRecipeData}
            renderItem={renderRecipes}
            keyExtractor={(item) => `${item.recipeId}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  veg: state.veg,
});

export default connect(mapStateToProps)(RecipesScreen);
