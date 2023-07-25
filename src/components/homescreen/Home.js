import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Vibration,
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
import { Accelerometer } from 'expo-sensors';
import { getRecipeById } from "../data/RecipeDataAPI";
import { ScrollView } from "react-native-gesture-handler";


const Home = ({ navigation, language }) => {
    const [recipeList, setRecipeList] = useState([]);
    const [randomIndex, setRandomIndex] = useState([]);
    const theme = useTheme();
    const [shakeDetected, setShakeDetected] = useState(false);

    useEffect(() => {
        let shakeTimer;
        const sensitivity = 2.5;

        const randomRecipes = [];
        const getRandomRecipe = () => {
            for (let i = 0; i < 1; i++) {
                const randomRecipeId = Math.floor(Math.random() * 18) + 1;
                randomRecipes.push(getRecipeById(randomRecipeId));
            }
            return randomRecipes;
        };

        const handleShake = accelerometerData => {
            const { x, y, z } = accelerometerData;
            const acceleration = Math.sqrt(x * x + y * y + z * z);

            if (acceleration > sensitivity) {
                setShakeDetected(true);

                if (shakeTimer) {
                    clearTimeout(shakeTimer);
                }
                shakeTimer = setTimeout(() => {
                    const randomRecipes = [];

                    for (let i = 0; i < 1; i++) {
                        const randomRecipeId = Math.floor(Math.random() * 18) + 1;
                        randomRecipes.push(getRecipeById(randomRecipeId));
                    }

                    setRandomIndex(randomRecipes);
                    setShakeDetected(false);
                    Vibration.vibrate(1000);
                }, 250);
            }
        };

        const subscription = Accelerometer.addListener(handleShake);

        return () => {
            subscription.remove();
            if (shakeTimer) {
                clearTimeout(shakeTimer);
            }
        };
    }, []);

    useEffect(() => {
        const defaultRecipeId = Math.floor(Math.random() * 18) + 1;
        const defaultRecipe = getRecipeById(defaultRecipeId);
        setRandomIndex([defaultRecipe]);
    }, []);

    useEffect(() => {
        setRecipeList(recipes);;
    }, []);

    useEffect(() => {
    }, [randomIndex]);

    const menuLabels = {
        en: {
            helloUser: "Hello",
            descriptionText: "What would you like to cook today?",
            recipeText: "Popular recipes",
            randomText: "Random recipe",
            randomTextDescription: "Shake your phone to get a random recipe",
        },
        fr: {
            helloUser: "Bonjour",
            descriptionText: "Qu'aimeriez-vous cuisiner aujourd'hui?",
            recipeText: "Recettes populaires",
            randomText: "Recette aléatoire",
            randomTextDescription: "Secouez votre téléphone pour obtenir une recette aléatoire",
        },
    };

    const handleRecipePress = (item) => {
        navigation.navigate("RecipeDetails", { item, sourceScreen: "Home" });
    };

    const renderRecipeItem = ({ item }) => (
        <TouchableOpacity style={styles.recipeItemContainer} onPress={() => handleRecipePress(item)}>
            <Image source={{ uri: item.photo_url }} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{item.title[language]}</Text>
        </TouchableOpacity>
    );

    const renderRandomRecipeItem = ({ item }) => (
        <TouchableOpacity
            style={styles.recipeItemContainer}
            onPress={() => handleRecipePress(item)}
        >
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
            
            <FlatList
                ListHeaderComponent={() => (
                    <View style={styles.recipeHeadingView}>
                        <Text style={styles.recipeHeadingText}>
                            {menuLabels[language].randomText}
                        </Text>
                        <Text style={styles.recipeHeadingTextDescription}>
                            {menuLabels[language].randomTextDescription}
                        </Text>
                    </View>
                )}
                data={randomIndex}
                renderItem={renderRandomRecipeItem}
                keyExtractor={(item) => `${item.recipeId}`}
                ListFooterComponent={() => (
                    <>
                        <View style={styles.recipeHeadingView}>
                            <Text style={styles.recipeHeadingText}>
                                {menuLabels[language].recipeText}
                            </Text>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={recipeList}
                            renderItem={renderRecipeItem}
                            keyExtractor={(item) => `${item.recipeId}`}
                        />
                    </>
                )}
            />
        </View>
    );
};

const mapStateToProps = (state) => ({
    language: state.language,
    veg: state.veg,
});

export default connect(mapStateToProps)(Home);