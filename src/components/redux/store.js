import { configureStore } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  language: 'en',
  measurement:'us_imperial'
};

// Define reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'SET_MEASUREMENT':
      return {
        ...state,
        measurement: action.payload,
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
