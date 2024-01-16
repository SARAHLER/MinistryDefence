import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_BASE_URL from '../apiConfig';
import axios from 'axios';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { name, category } = action.payload;

      const existingProduct = state.products.find((product) => product.name === name);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({
          name,
          category,
          quantity: 1,
        });
      }
    },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
