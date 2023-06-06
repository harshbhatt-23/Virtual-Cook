import React, { useState } from "react";
import { View, Text, TouchableHighlight, FlatList, Image, TouchableOpacity } from "react-native";
import style from "./styles";
import { Searchbar, Appbar, Button, Menu, Divider, Chip, Checkbox } from 'react-native-paper';
import { recipes } from "../../components/data/RecipeData";
import { getCategoryName, getRecipesByRecipeName, getRecipesByCategoryName } from "../../components/data/RecipeDataAPI";
import { MaterialIcons } from '@expo/vector-icons';

//The code for filtering and sorting recipe by name or cataegory

export default function RecipesScreen({ navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [recipeDataVal, setData] = useState(recipes)
    const [getRecipeCount, setRecipeCount] = useState(recipes.length)


    const MenuItem = ({ label, isSelected, onPress }) => (
        <TouchableOpacity style={style.menuItem} onPress={onPress}>
            <Text>{label}</Text>
            {isSelected && <MaterialIcons name="check" size={20} color="green" />}
        </TouchableOpacity>
    );

    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemPress = (item) => {
        setSelectedItems([item]);
        var recipeArray = getRecipesByCategoryName(item);
        setData(recipeArray);
        setRecipeCount(recipeArray.length)
    };

    const [selectedSortItems, setSelectedSortItems] = useState([]);

    const handleSortItemPress = (item) => {
        setSelectedSortItems([item]);
        if (item == "AtoZ") {
            setData(recipes.sort((a, b) => a.title.localeCompare(b.title)));
        }
        
        else if (item == "ZtoA") {
            setData(recipes.sort((a, b) => b.title.localeCompare(a.title)));
        }
    };

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

            {/* <View style={style.buttonMainContainer}>
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
      </View> */}

            <View style={style.buttonMainContainer}>
                <View style={style.buttonContainer}>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Button icon="filter-outline" mode="contained" onPress={openMenu}>Filter</Button>}>
                        <MenuItem
                            label="Breakfast"
                            isSelected={selectedItems == 'Breakfast'}
                            onPress={() => handleItemPress('Breakfast')}
                        />
                        <MenuItem
                            label="Lunch"
                            isSelected={selectedItems == 'Lunch'}
                            onPress={() => handleItemPress('Lunch')}
                        />
                        <MenuItem
                            label="Dinner"
                            isSelected={selectedItems == 'Dinner'}
                            onPress={() => handleItemPress('Dinner')}
                        />
                        <MenuItem
                            label="Dessert"
                            isSelected={selectedItems == 'Dessert'}
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
