export const setLanguage = (language) => {
  return {
    type: "SET_LANGUAGE",
    payload: language,
  };
};
export const setMeasurement = (measurement) => {
  return {
    type: "SET_MEASUREMENT",
    payload: measurement,
  };
};
export const addToFavorites = (recipeId) => {
  return {
    type: "ADD_TO_FAVORITES",
    payload: recipeId,
  };
};
export const removeFromFavorites = (recipeId) => {
  return {
    type: "REMOVE_FROM_FAVORITES",
    payload: recipeId,
  };
};
