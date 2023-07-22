import { configureStore } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  language: "en",
  measurement: "us_imperial",
  favoriteRecipes: [],
  veg: false,
  theme: "light",
  appColor: "#663399",
};

// Define reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    case "SET_MEASUREMENT":
      return {
        ...state,
        measurement: action.payload,
      };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favoriteRecipes: [...state.favoriteRecipes, action.payload],
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favoriteRecipes: state.favoriteRecipes.filter(
          (recipeId) => recipeId !== action.payload
        ),
      };
    case "SET_VEG":
      return {
        ...state,
        veg: action.payload,
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "SET_APP_COLOR":
      return {
        ...state,
        appColor: action.payload,
      };

    default:
      return state;
  }
};

// Create the Redux store
const store = configureStore({
  reducer,
});

export default store;
