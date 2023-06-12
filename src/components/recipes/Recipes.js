import React, { useState } from "react";
import { View, Text, TouchableHighlight, FlatList, Image, TouchableOpacity } from "react-native";
import style from "./styles";
import { Searchbar, Appbar, Button, Menu, Divider, Chip, Checkbox } from 'react-native-paper';
import { recipes } from "../../components/data/RecipeData";
import { getCategoryName, getRecipesByRecipeName, getRecipesByCategoryName, searchRecipesByCategoryNRecipeName } from "../../components/data/RecipeDataAPI";
import { MaterialIcons } from '@expo/vector-icons';

//The code for filtering and sorting recipe by name or cataegory

export default function RecipesScreen({ navigation }) {

    //Search query
    const [searchQuery, setSearchQuery] = useState('');

    //Main recipe data
    const [recipeDataVal, setData] = useState(recipes)
    
    const [getRecipeCount, setRecipeCount] = useState(recipes.length)

    //Filter data
    const [selectedItems, setSelectedItems] = useState([]);
    const [oldArray, setOldArray] = useState([]);

    const MenuItem = ({ label, isSelected, onPress }) => (
        <TouchableOpacity style={style.menuItem} onPress={onPress}>
            <Text>{label}</Text>
            {isSelected && <MaterialIcons name="check" size={20} color="green" />}
        </TouchableOpacity>
    );

    const handleItemPress = (item) => {
        var itemVal;

        if (selectedItems.includes(item)) {
            if (item == 'Breakfast') {
                itemVal = 1
            }
            else if (item == 'Lunch') {
                itemVal = 2
            }
            else if (item == 'Dinner') {
                itemVal = 3
            }
            else if (item == 'Dessert') {
                itemVal = 4
            }

            var uncheckItemCount = selectedItems.filter((selectedItem) => selectedItem !== item).length;
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));

            if (uncheckItemCount == 0) {
                setData(recipes);
                setRecipeCount(recipes.length)
                setOldArray([]);
            }
            else {
                const updatedArray = oldArray.filter(item => item.categoryId !== itemVal);
                setOldArray(updatedArray);
                setData(updatedArray);
                setRecipeCount(updatedArray.length)
            }

        } else {
            // Item is not selected, so add it to the selectedItems array 
            setSelectedItems([...selectedItems, item]);

            var recipeArray = getRecipesByCategoryName(item);
            const updatedArray = [...oldArray, ...recipeArray];

            if(selectedSortItems.length > 0)
            {
                if (selectedSortItems == "AtoZ") {
                    setData(updatedArray.sort((a, b) => a.title.localeCompare(b.title)));
                }
                else if (selectedSortItems == "ZtoA") {
                    setData(updatedArray.sort((a, b) => b.title.localeCompare(a.title)));
                }
            }
            else
            {
                setOldArray(updatedArray)
                setData(updatedArray);
                setRecipeCount(updatedArray.length)
            }
            
            setOldArray(updatedArray)
            setRecipeCount(updatedArray.length)
        }
    };

    //Code for sort recipe ascending or descending..
    //Sort data
    const [selectedSortItems, setSelectedSortItems] = useState([]);
    const handleSortItemPress = (item) => {

        if (selectedSortItems.includes(item)) {
            setSelectedSortItems(selectedSortItems.filter((selectedItem) => selectedItem !== item));
            var uncheckItemCount = selectedSortItems.filter((selectedItem) => selectedItem !== item).length;

            if (uncheckItemCount == 0) {
                if (selectedItems.length > 0) {
                    setData(oldArray.sort((a, b) => a.title.localeCompare(b.title)));
                }
                else {
                    setData(recipes.sort((a, b) => a.title.localeCompare(b.title)));
                }
            }
        }
        else {
            setSelectedSortItems([item]);
            if (selectedItems.length > 0) {
                if (item == "AtoZ") {
                    setData(oldArray.sort((a, b) => a.title.localeCompare(b.title)));
                }
                else if (item == "ZtoA") {
                    setData(oldArray.sort((a, b) => b.title.localeCompare(a.title)));
                }
            }
            else {
                if (item == "AtoZ") {
                    setData(recipes.sort((a, b) => a.title.localeCompare(b.title)));
                }
                else if (item == "ZtoA") {
                    setData(recipes.sort((a, b) => b.title.localeCompare(a.title)));
                }
            }
        }
    };

    //Search box value
    const onChangeSearch = (text) => {
        setSearchQuery(text);

        if (selectedItems.length > 0) {
            if (text == "") {
                setRecipeCount(oldArray.length)
                setData(oldArray);
            }
            else {
                var searchResult = searchRecipesByCategoryNRecipeName(selectedItems, text)
                setData(searchResult);
                setRecipeCount(searchResult.length)
            }
        }
        else {
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
                        <MenuItem
                            label="Breakfast"
                            isSelected={selectedItems.includes('Breakfast')}
                            onPress={() => handleItemPress('Breakfast')}
                        />
                        <MenuItem
                            label="Lunch"
                            isSelected={selectedItems.includes('Lunch')}
                            onPress={() => handleItemPress('Lunch')}
                        />
                        <MenuItem
                            label="Dinner"
                            isSelected={selectedItems.includes('Dinner')}
                            onPress={() => handleItemPress('Dinner')}
                        />
                        <MenuItem
                            label="Dessert"
                            isSelected={selectedItems.includes('Dessert')}
                            onPress={() => handleItemPress('Dessert')}
                        />
                    </Menu>
                </View>

                <View style={style.buttonContainer}>
                    <Menu
                        visible={visibleSort}
                        onDismiss={closeSortMenu}
                        anchor={<Button icon="filter-outline" mode="contained" onPress={openSortMenu}>Sort</Button>}>
                        <MenuItem
                            label="AtoZ"
                            isSelected={selectedSortItems == 'AtoZ'}
                            onPress={() => handleSortItemPress('AtoZ')}
                        />
                        <MenuItem
                            label="ZtoA"
                            isSelected={selectedSortItems == 'ZtoA'}
                            onPress={() => handleSortItemPress('ZtoA')}
                        />
                    </Menu>
                </View>
            </View>

            <View style={style.recipeCount}>
                <Text>{getRecipeCount} Recipe(s) Found</Text>
            </View>

            <View style={style.dataBottomMargin}>
                <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipeDataVal} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
            </View>
        </View>
    );
}