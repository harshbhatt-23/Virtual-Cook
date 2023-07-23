import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  IconButton,
  MD3Colors,
  Divider,
  Button,
  useTheme,
  Text,
} from "react-native-paper";
import { recipes } from "../../components/data/RecipeData";
import styles from "./styles";
import { connect } from "react-redux";

const Home = ({ navigation, language }) => {
  const [recipeList, setRecipeList] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    setRecipeList(recipes);
  }, []);

  const menuLabels = {
    en: {
      helloUser: "Hello, User",
      descriptionText:"What would you like to cook today?",
      recipeText:"Popular recipes"
    },
    fr: {
      helloUser: "Bonjour, utilisateur",
      descriptionText:"Qu'aimeriez-vous cuisiner aujourd'hui?",
      recipeText:"Recettes populaires"
    },
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeItemContainer}>
      <Image source={{ uri: item.photo_url }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title[language]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>{menuLabels[language].helloUser}</Text>
          <Text style={styles.description}>
          {menuLabels[language].descriptionText}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <IconButton icon="account-circle" color={MD3Colors.primary50}
          size={50} />
        </View>
      </View>
      <Divider />
      <View style={styles.recipeHeadingView}>
        <Text style={styles.recipeHeadingText}>{menuLabels[language].recipeText}</Text>
      </View>
      <FlatList
        data={recipeList}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  veg: state.veg,
});

export default connect(mapStateToProps)(Home);