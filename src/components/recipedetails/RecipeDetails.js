import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  getCategoryName,
  getDirectionById,
  getIngredientById,
} from "../../components/data/RecipeDataAPI";
import { FAB, Appbar } from "react-native-paper";
import styles from "./styles";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import { HeaderBackButton } from "@react-navigation/stack";

const RecipeDetails = ({ route, language, measurement }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const handleBackPress = () => {
    // Navigate back to RecipesScreen
    navigation.goBack();
  };

  const displayWords = {
    en: {
      PrepTime: "Prep Time",
      CookTime: "Cook Time",
      Ingredients: "Ingredients",
      Directions: "Directions",
    },
    fr: {
      PrepTime: "Temps de préparation",
      CookTime: "Temps de cuisson",
      Ingredients: "Ingrédients",
      Directions: "Directions",
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

  return (
    // <SafeAreaView style={styles.container}>
    <ScrollView>
      {/* <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity> */}
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            handleBackPress();
          }}
        />
        <Appbar.Content title={item.title[language]} />
      </Appbar.Header>
      <Image style={styles.image} source={{ uri: item.photo_url }} />
      <View style={styles.content}>
        {/* <Text style={styles.recipeName}>{item.title[language]}</Text> */}

        <Text style={styles.categoryName}>
          {getCategoryName(item.categoryId, language)}
        </Text>

        <Text style={styles.prepTime}>
          {displayWords[language].PrepTime} {item.preptime}
        </Text>

        <Text style={styles.prepTime}>
          {displayWords[language].CookTime} {item.cooktime}
        </Text>

        <Text>{item.description[language]}</Text>

        <HorizontalLine />

        <Text style={styles.recipeName}>
          {displayWords[language].Ingredients}
        </Text>
        {ingredients && (
          <ScrollView>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.bulletPoint}>
                <Text style={styles.bulletPointText}>• {ingredient}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        <HorizontalLine />

        <Text style={styles.recipeName}>
          {displayWords[language].Directions}
        </Text>
        {directions && (
          <ScrollView>
            {directions.map((direc, index) => (
              <View key={index} style={styles.bulletPoint}>
                <Text style={styles.bulletPointText}>• {direc}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        {/* text-to-speech-off */}
        <FAB
          icon="text-to-speech"
          style={styles.fab}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  measurement: state.measurement,
});

export default connect(mapStateToProps)(RecipeDetails);
