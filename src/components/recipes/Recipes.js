import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Checkbox } from "react-native";
import style from "./styles";
import { Searchbar, Appbar, Button, Menu, Divider, PaperProvider, MenuOptions, MenuOption } from 'react-native-paper';

export default function RecipesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const [checkboxVal, setCheckboxVal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [visibleSort, setVisibleSort] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const openSortMenu = () => setVisibleSort(true);
  const closeSortMenu = () => setVisibleSort(false);

  return (
    <PaperProvider>
      <View>
        {/* 
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="Title" />
        <Appbar.Action style={style.settingHeaderIcon} icon="dots-vertical" onPress={() => { }} />
      </Appbar.Header> */}
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
                <Checkbox
                  name="filter1"
                //checked={filterState.filter1}
                //onChange={handleChange}
                />
              </Menu.Item>
              <Divider />
              <Menu.Item onPress={() => { }} title="Lunch" />
              <Divider />
              <Menu.Item onPress={() => { }} title="Dinner" />
              <Divider />
              <Menu.Item onPress={() => { }} title="Desert" />

            </Menu>


            {/* <Button icon="filter-outline" mode="contained" onPress={() => console.log('Pressed Filter')}>
            Filter
          </Button> */}
          </View>
          <View style={style.buttonContainer}>
            {/* <Button icon="sort-variant" mode="contained" onPress={() => console.log('Pressed Sort')}>
              Sort
            </Button> */}
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



      </View>
    </PaperProvider>
  );
}
