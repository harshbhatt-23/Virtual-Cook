import React, { useState } from "react";
import { View, Text, TouchableHighlight, FlatList, Image } from "react-native";
import style from "./styles";
import { Searchbar, Appbar, Button, Menu, Divider, Chip, Checkbox } from 'react-native-paper';
import { recipes } from "../../components/data/RecipeData";
import { getCategoryName, getRecipesByRecipeName, getRecipesByCategoryName } from "../../components/data/RecipeDataAPI";

//The code for filtering and sorting recipe by name or cataegory
export default function RecipesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipeDataVal, setData] = useState(recipes)
  const [getRecipeCount, setRecipeCount] = useState(recipes.length)

  const onChangeSearch = (text) => {
    setSearchQuery(text);
    var recipeArray1 = getRecipesByRecipeName(text);
    var recipeArray2 = getRecipesByCategoryName(text);
    var aux = recipeArray1.concat(recipeArray2);
    var recipeArray = [...new Set(aux)];

    if (text == "") {
      setRecipeCount(recipes.length)
      setData(recipes);
    } else {
      setRecipeCount(recipeArray.length)
      setData(recipeArray);
    }
  };

  const [visible, setVisible] = useState(false);
  const [visibleSort, setVisibleSort] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const openSortMenu = () => setVisibleSort(true);
  const closeSortMenu = () => setVisibleSort(false);

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={() => console.log('Onpress click for recipe')}>
      <View style={style.recipeContainer}>
        <Image style={style.photo} source={{ uri: item.photo_url }} />
        <Text style={style.title}>{item.title}</Text>
        <Text style={style.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <View style={style.searchConatiner}>
        <Searchbar
          placeholder="Search food"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>

      <View style={style.buttonMainContainer}>
        <View style={style.buttonContainer}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button icon="filter-outline" mode="contained" onPress={openMenu}>Filter</Button>}>
            <Menu.Item onPress={() => console.log('Item one Pressed')} title="Breakfast">
            </Menu.Item>
            <Divider />
            <Menu.Item onPress={() => { }} title="Lunch" />
            <Divider />
            <Menu.Item onPress={() => { }} title="Dinner" />
            <Divider />
            <Menu.Item onPress={() => { }} title="Dessert" />

          </Menu>
        </View>
        <View style={style.buttonContainer}>
          <Menu
            visible={visibleSort}
            onDismiss={closeSortMenu}
            anchor={<Button icon="sort-variant" mode="contained" onPress={openSortMenu}>Sort</Button>}>

            <Menu.Item onPress={() => console.log('Sort one Pressed')} title="AtoZ" />
            <Divider />
            <Menu.Item onPress={() => { }} title="ZtoA" />
          </Menu>
        </View>
      </View>

      <View style={style.recipeCount}>
        <Text>{getRecipeCount} Recipe(s) Found</Text>
      </View>

      <View style={style.selectedFilter}>
        {/* <Chip icon="information" onPress={() => console.log('Pressed')}>Breakfast</Chip> */}
      </View>

      <View>
        <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipeDataVal} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
      </View>
    </View>
  );
}
