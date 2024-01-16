// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice';
import categoriesReducer from './reducers/categoriesSlice';


const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,

  },
});

export default store;
