export const setLanguage = (language) => {
  return {
    type: "SET_LANGUAGE",
    payload: language,
  };
};
export const setMeasurement = (measurement) => {
  console.log("measurement ??????", measurement);
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
export const setVeg = (veg) => {
  return {
    type: "SET_VEG",
    payload: veg,
  };
};
export const setTheme = (theme) => {
  return {
    type: "SET_THEME",
    payload: theme,
  };
};
export const setAppColor = (color) => {
  return {
    type: "SET_APP_COLOR",
    payload: color,
  };
};