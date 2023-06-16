import React, { useState } from "react";
import { View, Text, TouchableHighlight, FlatList, Image, TouchableOpacity } from "react-native";
import style from "./styles";
import { Searchbar, Appbar, Button, Menu, Divider, Chip, Checkbox } from 'react-native-paper';
import { recipes } from "../../components/data/RecipeData";
import { getCategoryName, getRecipesByRecipeName, getRecipesByCategoryName, searchRecipesByCategoryNRecipeName } from "../../components/data/RecipeDataAPI";
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/FontAwesome';

//The code for filtering and sorting recipe by name or cataegory

const RecipesScreen = ({language }) => {

    const menuLabels = {
        en: {
            breakfast: 'Breakfast',
            lunch: 'Lunch',
            dinner: 'Dinner',
            dessert: 'Dessert',
            searchFood: 'Search food',
            recipeFound: 'Recipe(s) Found',
            filter: 'Filter',
            sort: 'Sort',
            AtoZ: 'AtoZ',
            ZtoA: 'ZtoA'
        },
        fr: {
            breakfast: 'Petit-déjeuner',
            lunch: 'Déjeunere',
            dinner: 'Dîner',
            dessert: 'Dessert',
            searchFood: 'chercher de la nourriture',
            recipeFound: 'Recette(s) trouvée(s)',
            filter: 'Filtre',
            sort: 'Trier',
            AtoZ: 'De A à Z',
            ZtoA: 'z à un'

        },
    };

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
            if (item == menuLabels[language].breakfast) {
                itemVal = 1
            }
            else if (item == menuLabels[language].lunch) {
                itemVal = 2
            }
            else if (item == menuLabels[language].dinner) {
                itemVal = 3
            }
            else if (item == menuLabels[language].dessert) {
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

            var recipeArray = getRecipesByCategoryName(item, language);
            const updatedArray = [...oldArray, ...recipeArray];

            if (selectedSortItems.length > 0) {
                if (selectedSortItems == menuLabels[language].AtoZ) {
                    setData(updatedArray.sort((a, b) => a.title[language].localeCompare(b.title[language])));
                }
                else if (selectedSortItems == menuLabels[language].ZtoA) {
                    setData(updatedArray.sort((a, b) => b.title[language].localeCompare(a.title[language])));
                }
            }
            else {
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
                    setData(oldArray.sort((a, b) => a.title[language].localeCompare(b.title[language])));
                }
                else {
                    setData(recipes.sort((a, b) => a.title[language].localeCompare(b.title[language])));
                }
            }
        }
        else {
            setSelectedSortItems([item]);
            if (selectedItems.length > 0) {
                if (item === menuLabels[language].AtoZ) {
                    setData(oldArray.sort((a, b) => a.title[language].localeCompare(b.title[language])));
                }
                else if (item === menuLabels[language].ZtoA) {
                    setData(oldArray.sort((a, b) => b.title[language].localeCompare(a.title[language])));
                }
            }
            else {
                if (item === menuLabels[language].AtoZ) {
                    setData(recipes.sort((a, b) => a.title[language].localeCompare(b.title[language])));
                }
                else if (item === menuLabels[language].ZtoA) {
                    setData(recipes.sort((a, b) => b.title[language].localeCompare(a.title[language])));
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
                var searchResult = searchRecipesByCategoryNRecipeName(selectedItems, text,language)
                setData(searchResult);
                setRecipeCount(searchResult.length)
            }
        }
        else {
            var recipeArray1 = getRecipesByRecipeName(text,language);
            var recipeArray2 = getRecipesByCategoryName(text, language);
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

    const speakTitle  = (title) => {
        say = `The title of the recipe is ${title}`;
        options = {};
        Speech.speak(say, options);
    };

    const [visible, setVisible] = useState(false);
    const [visibleSort, setVisibleSort] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const openSortMenu = () => setVisibleSort(true);
    const closeSortMenu = () => setVisibleSort(false);

    const renderRecipes = ({ item }) => (
        <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={() => console.log('Onpress click for recipe')}>
            <>
            <View style={style.recipeContainer}>
                <Image style={style.photo} source={{ uri: item.photo_url }} />
                <Text style={style.title} icon="volume-high">{item.title[language]}</Text>
                <Text style={style.category}>{getCategoryName(item.categoryId, language)}</Text>
            </View>
            <View style={style.speakTitle}>
                <Icon name="microphone" size={30} color="#000" onPress={() => speakTitle(item.title[language])}/>
            </View>
            </>
        </TouchableHighlight>
    );

    return (
        <View>
            <View style={style.searchConatiner}>
                <Searchbar
                    placeholder={menuLabels[language].searchFood}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>

            <View style={style.buttonMainContainer}>
                <View style={style.buttonContainer}>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Button icon="filter-outline" mode="contained" onPress={openMenu}>{menuLabels[language].filter}</Button>}>
                        <MenuItem
                            label={menuLabels[language].breakfast}
                            isSelected={selectedItems.includes(menuLabels[language].breakfast)}
                            onPress={() => handleItemPress(menuLabels[language].breakfast)}
                        />
                        <MenuItem
                            label={menuLabels[language].lunch}
                            isSelected={selectedItems.includes(menuLabels[language].lunch)}
                            onPress={() => handleItemPress(menuLabels[language].lunch)}
                        />
                        <MenuItem
                            label={menuLabels[language].dinner}
                            isSelected={selectedItems.includes(menuLabels[language].dinner)}
                            onPress={() => handleItemPress(menuLabels[language].dinner)}
                        />
                        <MenuItem
                            label={menuLabels[language].dessert}
                            isSelected={selectedItems.includes(menuLabels[language].dessert)}
                            onPress={() => handleItemPress(menuLabels[language].dessert)}
                        />
                    </Menu>
                </View>

                <View style={style.buttonContainer}>
                    <Menu
                        visible={visibleSort}
                        onDismiss={closeSortMenu}
                        anchor={<Button icon="filter-outline" mode="contained" onPress={openSortMenu}>{menuLabels[language].sort}</Button>}>
                        <MenuItem
                            label={menuLabels[language].AtoZ}
                            isSelected={selectedSortItems == menuLabels[language].AtoZ}
                            onPress={() => handleSortItemPress(menuLabels[language].AtoZ)}
                        />
                        <MenuItem
                            label={menuLabels[language].ZtoA}
                            isSelected={selectedSortItems == menuLabels[language].ZtoA}
                            onPress={() => handleSortItemPress(menuLabels[language].ZtoA)}
                        />
                    </Menu>
                </View>
            </View>

            <View style={style.recipeCount}>
                <Text>{getRecipeCount} {menuLabels[language].recipeFound}</Text>
            </View>

            <View style={style.dataBottomMargin}>
                <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipeDataVal} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
            </View>
        </View>
    );

}

const mapStateToProps = (state) => ({
    language: state.language,
});

export default connect(mapStateToProps)(RecipesScreen);